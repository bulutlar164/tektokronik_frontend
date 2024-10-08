<template>
  <div id="map" class="map-container"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';  // Veri çekmek için axios kullanılıyor
import eventBus from '@/eventBus'; // EventBus'ı import ediyoruz
import LocationPopupComponent from '@/components/AdminComponent/LocationPopupComponent.vue';
import { createApp, h } from 'vue';

export default {
  name: "MapComponent",
  components: {
    LocationPopupComponent
  },
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
          info: location.address ? location.address : 'Adres Bilgisi Yok', // Check for address property
          color: this.getLocationColor(location.locationType),
          isNew: Math.random() > 0.5
        }));
        if (!location || !location.address) {
          console.warn('Location data is incomplete:', location); // Adres eksikse uyarı mesajı
        }

        this.initMap();
      } catch (error) {
        console.error('Lokasyon verileri çekilirken hata oluştu:', error);
      }
    },
    getLocationColor(locationType) {
      const colorMap = {
        genel: 'orange',
        insan_yogunlugu: 'green',
        toplanma_alani: 'yellow',
        kaynak: 'blue',
      };
      return colorMap[locationType] || 'red'; // Tanımlanmayan tipler için varsayılan renk
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
      this.markersData.forEach((data) => {
        const circleMarker = L.circleMarker(data.coords, {
          radius: 6,
          color: data.color,
          fillColor: data.color,
          fillOpacity: 1,
          className: 'custom-marker pulse-animation'
        }).addTo(this.map);

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
          L.marker(data.coords, {icon: newLabel}).addTo(this.map);
        }

        // Vue bileşenini pop-up içeriği olarak oluşturuyoruz
        const popupContainer = document.createElement('div');

        const app = createApp({
          render: () => h(LocationPopupComponent, {
            address: data.info,
            damageStatus: data.isNew ? 'Riskli' : 'Güvenli',
            estimatedPopulation: Math.floor(Math.random() * 100) + 20,
            equipmentAvailability: Math.random() > 0.5 ? 'Var' : 'Yok',
            gatheringPoint: Math.random() > 0.5 ? 'Belirtilmiş Alan' : 'Yönlendirilmedi',
            buildingImage: this.getRandomBuildingImage(),
            team: Math.random() > 0.5 ? 'Ekip A' : 'Ekip Bilgisi Yok'
          })
        });

        // Pop-up bileşenini DOM'a monte et
        app.mount(popupContainer);

        // Leaflet pop-up'ını ekliyoruz
        circleMarker.bindPopup(popupContainer, {
          minWidth: 600, // Pop-up genişliği
          closeButton: true, // Kapatma butonu
        });

        // Marker'a tıklandığında animasyonlu yakınlaştırma
        circleMarker.on('click', () => {
          const currentZoom = this.map.getZoom();
          const targetZoom = 18; // Yakınlaştırmak istediğiniz seviye

          // Koordinatları hafifçe kaydırıyoruz (örneğin 0.0013 ile)
          const adjustedCoords = [data.coords[0] + 0.0013, data.coords[1]];

          if (currentZoom < targetZoom) {
            this.map.flyTo(adjustedCoords, targetZoom, {
              animate: true,
              duration: 0.7 // Animasyonun süresi (saniye cinsinden)
            });
          } else {
            this.map.flyTo(adjustedCoords, currentZoom, {
              animate: true,
              duration: 1.0
            });
          }

          circleMarker.openPopup();
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
