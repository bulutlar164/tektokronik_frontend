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
        { id: 1, color: 'red', coords: [39.9334, 32.8597], info: 'Kırmızı Bina Bilgisi', requestSent: false },
        { id: 2, color: 'yellow', coords: [39.9345, 32.8605], info: 'Sarı Bina Bilgisi', requestSent: false },
        { id: 3, color: 'green', coords: [39.9355, 32.8615], info: 'Yeşil Bina Bilgisi', requestSent: false },
        { id: 4, color: 'blue', coords: [39.9325, 32.8585], info: 'Mavi Bina Bilgisi', requestSent: false },
        { id: 5, color: 'red', coords: [39.9315, 32.8575], info: 'Kırmızı Bina Bilgisi', requestSent: false },
        { id: 6, color: 'yellow', coords: [39.9365, 32.8625], info: 'Sarı Bina Bilgisi', requestSent: false }
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
    handleButtonClick(event, markerId) {
      // İlgili markerın requestSent durumunu true yapıyoruz
      const marker = this.markersData.find(m => m.id === markerId);
      if (marker) {
        marker.requestSent = true;
      }

      // Butonun metnini ve rengini değiştiriyoruz
      const button = event.target;
      button.textContent = 'İstek Gönderildi'; // Butonun yazısını değiştir
      button.style.backgroundColor = 'green';  // Butonun rengini yeşil yap
      button.disabled = true;  // Butonu devre dışı bırak
    },
    applyButtonClickListeners(markerId) {
      const marker = this.markersData.find(m => m.id === markerId);
      if (marker && marker.requestSent) {
        // Eğer istek zaten gönderildiyse, butonun durumunu koruyoruz
        const button = document.querySelector('.request-button');
        if (button) {
          button.textContent = 'İstek Gönderildi';
          button.style.backgroundColor = 'green';
          button.disabled = true;
        }
      } else {
        // Eğer istek gönderilmediyse, normal olay dinleyiciyi ekliyoruz
        const button = document.querySelector('.request-button');
        if (button) {
          button.addEventListener('click', (event) => this.handleButtonClick(event, markerId));
        }
      }
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

        // Buton içeren popup'ı tanımlıyoruz
        const popupContent = `
          <b>${data.info}</b><br>
          Adres: Ankara, Türkiye<br>
          Yükseklik: ${Math.floor(Math.random() * 50) + 10}m<br>
          Durum: ${Math.random() > 0.5 ? 'Riskli' : 'Güvenli'}<br>
          <img src="${this.getRandomBuildingImage()}" alt="Bina Resmi" style="width:150px;height:150px;"/><br>
          <div style="text-align: center; margin-top: 10px;">
            <button class="request-button" style="padding: 10px 20px; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer; text-align: center; font-size: 14px;">
              İstek Gönder
            </button>
          </div>
        `;

        marker.bindPopup(popupContent);

        // Popup açıldığında butonları bul ve olay dinleyicilerini ekle
        marker.on('popupopen', () => {
          setTimeout(() => this.applyButtonClickListeners(data.id), 10); // Pop-up açıldıktan sonra butonlara tıklama olaylarını ekle
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
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

#map {
  height: 100%;
  width: 100%;
}

.map-container {
  height: 100%;
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

.request-button:disabled {
  cursor: not-allowed;
}
</style>
