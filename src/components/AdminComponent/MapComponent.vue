<template>
  <div id="map" class="map-container"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: "MapComponent",
  data() {
    return {
      markersData: [
        { color: 'red', coords: [39.9334, 32.8597], info: 'Kırmızı Bina Bilgisi' },
        { color: 'yellow', coords: [39.9345, 32.8605], info: 'Sarı Bina Bilgisi' },
        { color: 'green', coords: [39.9355, 32.8615], info: 'Yeşil Bina Bilgisi' },
        { color: 'blue', coords: [39.9325, 32.8585], info: 'Mavi Bina Bilgisi' },
        { color: 'red', coords: [39.9315, 32.8575], info: 'Kırmızı Bina Bilgisi' },
        { color: 'yellow', coords: [39.9365, 32.8625], info: 'Sarı Bina Bilgisi' }
      ],
      buildingImages: [
        'https://picsum.photos/150/150?random=1',
        'https://picsum.photos/150/150?random=2',
        'https://picsum.photos/150/150?random=3',
        'https://picsum.photos/150/150?random=4',
        'https://picsum.photos/150/150?random=5',
        'https://picsum.photos/150/150?random=6'
      ]
    };
  },
  methods: {
    getRandomBuildingImage() {
      return this.buildingImages[Math.floor(Math.random() * this.buildingImages.length)];
    },
    initMap() {
      const map = L.map('map').setView([39.9334, 32.8597], 15);

      L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(map);

      this.markersData.forEach((data) => {
        const markerIcon = L.divIcon({
          className: `animated-marker ${data.color}`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const marker = L.marker(data.coords, { icon: markerIcon }).addTo(map);

        marker.bindPopup(`
          <b>${data.info}</b><br>
          Adres: Ankara, Türkiye<br>
          Yükseklik: ${Math.floor(Math.random() * 50) + 10}m<br>
          Durum: ${Math.random() > 0.5 ? 'Riskli' : 'Güvenli'}<br>
          <img src="${this.getRandomBuildingImage()}" alt="Bina Resmi" style="width:150px;height:150px;"/>
        `);

        marker.on('click', () => {
          marker.openPopup();
        });
      });
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style scoped>
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

:deep(.animated-marker) {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
  position: relative;
}

:deep(.animated-marker::before) {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: inherit;
  animation: pulse 1.5s infinite ease-out;
  transform: translate(-50%, -50%);
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0.7;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}

:deep(.animated-marker.red) {
  background-color: rgba(255, 0, 0, 0.9);
}

:deep(.animated-marker.yellow) {
  background-color: rgba(255, 215, 0, 0.9);
}

:deep(.animated-marker.green) {
  background-color: rgba(0, 255, 0, 0.9);
}

:deep(.animated-marker.blue) {
  background-color: rgba(0, 0, 255, 0.9);
}
</style>