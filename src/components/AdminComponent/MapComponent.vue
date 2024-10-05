<template>
  <div id="map" class="map-container"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';  // Veri çekmek için axios kullanılıyor

export default {
  name: "MapComponent",
  data() {
    return {
      markersData: [], // Dinamik olarak doldurulacak
      buildingImages: [
        'https://picsum.photos/150/150?random=1',
        'https://picsum.photos/150/150?random=2',
        'https://picsum.photos/150/150?random=3',
        'https://picsum.photos/150/150?random=4',
        'https://picsum.photos/150/150?random=5',
        'https://picsum.photos/150/150?random=6'
      ],
      circleMarkers: [], // Tüm circle marker'ları tutmak için dizi
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
          isNew: Math.random() > 0.5 // Örnek amaçlı, gerçek bir alana göre ayarlayın
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
      return colorMap[locationType] || 'gray';
    },
    initMap() {
      const map = L.map('map').setView([39.9334, 32.8597], 15);

      L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(map);

      // Harita olaylarını dinleyiciler ekleyin
      map.on('zoomstart', () => {
        this.circleMarkers.forEach(marker => {
          const el = marker.getElement();
          if (el) {
            el.classList.remove('pulse-animation');
          }
        });
      });

      map.on('zoomend', () => {
        this.circleMarkers.forEach(marker => {
          const el = marker.getElement();
          if (el) {
            el.classList.add('pulse-animation');
          }
        });
      });

      this.markersData.forEach((data) => {
        const circleMarker = L.circleMarker(data.coords, {
          radius: 6,
          color: data.color,
          fillColor: data.color,
          fillOpacity: 1,
          className: 'custom-marker pulse-animation'
        }).addTo(map);

        // Marker'ı diziye ekleyin
        this.circleMarkers.push(circleMarker);

        if (data.isNew) {
          const newLabel = L.divIcon({
            className: 'new-label',
            html: `
              <div class="new-label-wrapper">
                <span class="new-label-text">YENİ</span>
                <div class="pin"></div>
              </div>`,
            iconSize: [50, 50],
            iconAnchor: [25, 50]
          });
          L.marker(data.coords, {icon: newLabel}).addTo(map);
        }

        circleMarker.bindPopup(`
          <b>${data.info}</b><br>
          Adres: ${data.info}<br>
          Yükseklik: ${Math.floor(Math.random() * 50) + 10}m<br>
          Durum: ${Math.random() > 0.5 ? 'Riskli' : 'Güvenli'}<br>
          <img src="${this.getRandomBuildingImage()}" alt="Bina Resmi" style="width:150px;height:150px;"/>
        `);

        // Marker'a tıklandığında animasyonlu yakınlaştırma
        circleMarker.on('click', () => {
          const currentZoom = map.getZoom();
          const targetZoom = 18; // Yakınlaştırmak istediğiniz seviye

          if (currentZoom < targetZoom) {
            // Animasyonlu yakınlaştırma ve haritayı merkeze alma
            map.flyTo(data.coords, targetZoom, {
              animate: true,
              duration: 1.5 // Animasyonun süresi (saniye cinsinden)
            });
          } else {
            // Sadece haritayı merkeze kaydırma
            map.flyTo(data.coords, currentZoom, {
              animate: true,
              duration: 1.0
            });
          }

          circleMarker.openPopup();
        });
      });
    }
  },
  async mounted() {
    await this.fetchMarkersData(); // Component yüklendiğinde verileri çek
  }
};
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}

.map-container {
  height: 400px;
  width: 100%;
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
    stroke-opacity: 0.5;
    stroke-width: 4;
    r: 8;
  }
  100% {
    stroke-opacity: 0;
    stroke-width: 6;
    r: 10;
  }
}

.custom-marker {
  vector-effect: non-scaling-stroke; /* Yakınlaştırma ile marker boyutunu sabit tutar */
}

.new-label-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.new-label-text {
  background-color: #FF4081;
  color: #fff;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  margin-bottom: 4px;
}

.pin {
  width: 2px;
  height: 20px;
  background-color: #FF4081;
  margin-top: -5px;
  border-radius: 2px;
}
</style>
