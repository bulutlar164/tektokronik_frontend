<template>
  <div id="map" class="map-container"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';  // Veri çekmek için axios kullanılıyor
import eventBus from '@/eventBus'; // EventBus'ı import ediyoruz

export default {
  name: "MapComponent",
  data() {
    return {
      map: null, // Harita referansı
      markersData: [], // Dinamik olarak doldurulacak
      teamMarkers: [], // Ekip işaretçilerini tutmak için
      buildingImages: [
        'https://picsum.photos/150/150?random=1',
        'https://picsum.photos/150/150?random=2',
        'https://picsum.photos/150/150?random=3',
        'https://picsum.photos/150/150?random=4',
        'https://picsum.photos/150/150?random=5',
        'https://picsum.photos/150/150?random=6'
      ],
      circleMarkers: [] // Tüm circle marker'ları tutmak için dizi
    };
  },
  methods: {
    getRandomBuildingImage() {
      return this.buildingImages[Math.floor(Math.random() * this.buildingImages.length)];
    },
    async fetchMarkersData() {
      try {
        const response = await axios.get('http://localhost:8080/api/locations'); // API endpoint'i düzenleyin
        this.markersData = response.data.map(location => ({
          coords: [location.latitude, location.longitude],
          info: location.address || 'Adres Bilgisi Yok',
          color: this.getLocationColor(location.locationType), // locationType'a göre renk belirleme
          isRequestSent: false // İstek durumu
        }));
        this.initMap();
      } catch (error) {
        console.error('Lokasyon verileri çekilirken hata oluştu:', error);
      }
    },
    getLocationColor(locationType) {
      const colorMap = {
        hasar: 'red',
        insan_yogunlugu: 'yellow',
        toplanma_alani: 'green',
        kaynak: 'blue',
        genel: 'purple'
      };
      return colorMap[locationType] || 'orange'; // Tanımlanmayan tipler için varsayılan renk
    },
    initMap() {
      // Haritayı başlatıyoruz
      this.map = L.map('map').setView([39.9334, 32.8597], 15);

      L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(this.map);

      this.addMarkers();

      // EventBus ile gelen konum verilerini dinliyoruz
      eventBus.on('highlight-team-location', this.addTeamMarker);
    },
    addMarkers() {
      // Lokasyonlara marker ekliyoruz
      this.markersData.forEach((data, index) => {
        const circleMarker = L.circleMarker(data.coords, {
          radius: 6,
          color: data.color,
          fillColor: data.color,
          fillOpacity: 1,
          className: 'custom-marker pulse-animation'
        }).addTo(this.map);

        this.circleMarkers.push(circleMarker);

        circleMarker.bindPopup(`
          <div style="text-align: center;">
            <b>${data.info}</b><br>
            Adres: ${data.info}<br>
            Yükseklik: ${Math.floor(Math.random() * 50) + 10}m<br>
            Durum: ${Math.random() > 0.5 ? 'Riskli' : 'Güvenli'}<br>
            <img src="${this.getRandomBuildingImage()}" alt="Bina Resmi" style="width:150px;height:150px;"/><br><br>
            <button id="request-btn-${index}" class="request-btn">${data.isRequestSent ? 'İstek Gönderildi' : 'İstek Gönder'}</button>
          </div>
        `);

        // Marker'a tıklandığında animasyonlu yakınlaştırma
        circleMarker.on('click', () => {
          const currentZoom = this.map.getZoom();
          const targetZoom = 18; // Yakınlaştırmak istediğiniz seviye

          if (currentZoom < targetZoom) {
            this.map.flyTo(data.coords, targetZoom, {
              animate: true,
              duration: 1.5 // Animasyonun süresi (saniye cinsinden)
            });
          } else {
            this.map.flyTo(data.coords, currentZoom, {
              animate: true,
              duration: 1.0
            });
          }

          circleMarker.openPopup();

          // Butonun state'ini güncelleme ve tıklama işlemi
          this.$nextTick(() => {
            const requestButton = document.getElementById(`request-btn-${index}`);
            if (data.isRequestSent) {
              requestButton.innerText = 'İstek Gönderildi';
              requestButton.style.backgroundColor = 'green';
            }

            requestButton.addEventListener('click', () => {
              if (!data.isRequestSent) {
                data.isRequestSent = true;
                requestButton.innerText = 'İstek Gönderildi';
                requestButton.style.backgroundColor = 'green';
              }
            });
          });
        });
      });
    },
    addTeamMarker({coordinates, teamName}) {
      if (!coordinates || coordinates.length !== 2) {
        console.error('Geçersiz koordinatlar:', coordinates);
        return;
      }

      // Önceki ekip marker'ları temizle
      this.teamMarkers.forEach(marker => this.map.removeLayer(marker));
      this.teamMarkers = [];

      // Yeni ekip konumu için marker ekleyelim
      const marker = L.marker(coordinates).addTo(this.map)
          .bindPopup(`<b>${teamName}</b>`)
          .openPopup();

      this.teamMarkers.push(marker);

      // Haritayı bu konuma odaklıyoruz
      this.map.setView(coordinates, 15, {animate: true});
    }
  },
  async mounted() {
    await this.fetchMarkersData(); // Component yüklendiğinde verileri çek
  },
  beforeDestroy() {
    // EventBus dinleyicisini kaldırıyoruz
    eventBus.off('highlight-team-location', this.addTeamMarker);
  }
};
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}

.map-container {
  height: 100vh; /* Tüm görünüm yüksekliğini kaplar */
  width: 100vw; /* Tüm görünüm genişliğini kaplar */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.custom-marker {
  position: relative;
}

.pulse-animation {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    stroke-opacity: 0.9;
    stroke-width: 2;
    r: 6;
  }
  50% {
    stroke-opacity: 0.6;
    stroke-width: 15;
    r: 8;
  }
  100% {
    stroke-opacity: 0;
    stroke-width: 25;
    r: 10;
  }
}

.request-btn {
  padding: 8px 16px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.request-btn:active {
  transform: scale(0.98);
  background-color: darkred;
}
</style>
