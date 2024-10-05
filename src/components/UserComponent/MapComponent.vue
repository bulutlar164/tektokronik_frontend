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
        { color: 'red', coords: [39.9334, 32.8597], info: 'Kırmızı Bina Bilgisi', isRequestSent: false },
        { color: 'yellow', coords: [39.9345, 32.8605], info: 'Sarı Bina Bilgisi', isRequestSent: false },
        { color: 'green', coords: [39.9355, 32.8615], info: 'Yeşil Bina Bilgisi', isRequestSent: false },
        { color: 'blue', coords: [39.9325, 32.8585], info: 'Mavi Bina Bilgisi', isRequestSent: false },
        { color: 'red', coords: [39.9315, 32.8575], info: 'Kırmızı Bina Bilgisi', isRequestSent: false },
        { color: 'yellow', coords: [39.9365, 32.8625], info: 'Sarı Bina Bilgisi', isRequestSent: false }
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

      this.markersData.forEach((data, index) => {
        const circleMarker = L.circleMarker(data.coords, {
          radius: 6,
          color: data.color,
          fillColor: data.color,
          fillOpacity: 1,
          className: 'custom-marker pulse-animation'
        }).addTo(map);

        // Popup ile bina bilgilerini gösterme ve butonu ortalama
        const popupContent = `
          <div style="text-align: center;">
            <b>${data.info}</b><br>
            Adres: Ankara, Türkiye<br>
            Yükseklik: ${Math.floor(Math.random() * 50) + 10}m<br>
            Durum: ${Math.random() > 0.5 ? 'Riskli' : 'Güvenli'}<br>
            <img src="${this.getRandomBuildingImage()}" alt="Bina Resmi" style="width:150px;height:150px;"/><br><br>
            <button id="request-btn-${index}" class="request-btn">${data.isRequestSent ? 'İstek Gönderildi' : 'İstek Gönder'}</button>
          </div>
        `;

        circleMarker.bindPopup(popupContent);

        circleMarker.on('click', () => {
          circleMarker.openPopup();

          this.$nextTick(() => {
            const requestButton = document.getElementById(`request-btn-${index}`);

            // Her popup açıldığında butonun state'ini güncelle
            if (data.isRequestSent) {
              requestButton.innerText = 'İstek Gönderildi';
              requestButton.style.backgroundColor = 'green';
            }

            // Buton tıklaması ile state güncelleme
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
    }
  },
  mounted() {
    this.initMap();
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
    stroke-width: 13;
    r: 6;
  }
  30% {
    stroke-opacity: 0.6;
    stroke-width: 15;
    r: 8;
  }
  50% {
    stroke-opacity: 0.3;
    stroke-width: 20;
    r: 9;
  }
  70% {
    stroke-opacity: 0.1;
    stroke-width: 23;
    r: 10;
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
