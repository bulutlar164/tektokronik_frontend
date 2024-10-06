<template>
  <div id="app" class="container">
    <!-- Navbar -->
    <Navbar />

    <div class="content-section">
      <div class="left-side">
        <h1 class="title">Resim Yükleyin</h1>
        <p class="description">Resimlerinizi seçin ve analiz sonuçlarını öğrenin.</p>

        <div class="upload-section">
          <input type="file" @change="onFileChange" multiple accept=".jpg,.jpeg,.png" class="file-input" />
          <button v-if="!isUploading" @click="uploadImages" class="upload-btn">Resimleri Yükle</button>
          <p v-if="isUploading">Yükleniyor...</p> <!-- Yükleme durumu gösterimi -->
        </div>

        <div class="image-preview">
          <h2>Önizlemeler:</h2>
          <div v-if="imagePreviews.length" class="preview-grid">
            <div
              v-for="(image, index) in imagePreviews"
              :key="index"
              class="preview-item"
              @click="highlightImage(index)"
              :class="{ highlighted: highlightedIndex === index }"
            >
              <img :src="image" alt="Preview" />
            </div>
          </div>
          <div v-else>
            <p>Henüz resim yüklenmedi.</p>
          </div>
        </div>
      </div>

      <div class="right-side">
        <h2>Analiz Sonuçları</h2>
        <div class="result-box">
          <div class="result-content">
            <p
              v-if="analysisResults.length"
              v-for="(result, index) in analysisResults"
              :key="index"
              @click="highlightAnalysis(index)"
              :class="{ highlighted: highlightedIndex === index }"
            >
              {{ result }}
            </p>
            <p v-else>Analiz bekleniyor...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      selectedFiles: [],
      imagePreviews: [],
      analysisResults: [],
      highlightedIndex: null, // Resim veya analiz için tıklanan öğeyi takip edecek
      isUploading: false, // Yükleme durumu
    };
  },
  methods: {
    onFileChange(event) {
      this.selectedFiles = Array.from(event.target.files);
      this.imagePreviews = this.selectedFiles.map((file) => URL.createObjectURL(file));
    },
    async uploadImages() {
      this.isUploading = true; // Yükleme başladığında true yap
      const formData = new FormData();
      this.selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      try {
        const res = await fetch("http://localhost:5000/upload-images/", {
          method: "POST",
          body: formData,
        });

        const responseData = await res.json();

        // Gelen JSON'u analiz sonuçlarına uygun şekilde dönüştür
        this.analysisResults = responseData.results.map((result, index) => {
          let severity = "";
          if (result.predicted_class === 0) {
            severity = "Hafif Hasarlı";
          } else if (result.predicted_class === 1) {
            severity = "Orta Hasarlı";
          } else if (result.predicted_class === 2) {
            severity = "Ağır Hasarlı";
          }
          return `${index + 1}- Hasar Durumu: ${severity}, İnsan Sayısı: ${result.PeopleRandom}`;
        });

        alert("Resimler başarıyla yüklendi!");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        this.isUploading = false; // Yükleme tamamlandığında false yap
      }
    },
    highlightAnalysis(index) {
      this.highlightedIndex = index;

      // Bir süre sonra vurgulamayı kaldır
      setTimeout(() => {
        this.highlightedIndex = null;
      }, 1500);
    },
    highlightImage(index) {
      this.highlightAnalysis(index); // Resime tıklayınca analizi de vurgulayalım
    },
  },
};
</script>

<style scoped>
/* Navbar için alan */
.container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  font-family: "Arial", sans-serif;
}

/* Ana içerik alanı */
.content-section {
  display: flex;
  height: calc(100vh - 60px); /* Navbar'ı hesaba kat */
}

/* Sol taraf: Resim yükleme alanı */
.left-side {
  width: 50%;
  background-color: #f4f4f4;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Flex-start ile üstten hizalama */
  overflow-y: auto; /* Dikey kaydırma çubuğu ekle */
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

.description {
  color: #666;
  margin-bottom: 20px;
}

.upload-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.file-input {
  padding: 10px;
  margin-right: 15px;
}

.upload-btn {
  background-color: #ff6f61;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-btn:hover {
  background-color: #ff3d2e;
}

.image-preview {
  margin-top: 30px;
}

.preview-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.preview-item {
  margin: 10px;
  width: 100px; /* Her bir önizleme öğesi için genişlik ayarı */
  height: 100px; /* Her bir önizleme öğesi için yükseklik ayarı */
  overflow: hidden; /* Taşan kısmı gizle */
  border-radius: 8px; /* Köşeleri yuvarlaştır */
  position: relative; /* İçerikleri konumlandırmak için */
}

.preview-item img {
  position: absolute; /* Resmi konumlandırmak için */
  top: 50%; /* Dikey ortalama */
  left: 50%; /* Yatay ortalama */
  width: auto; /* Genişlik otomatik */
  height: 100%; /* Yükseklik %100 */
  transform: translate(-50%, -50%); /* Resmi merkezde konumlandır */
  transition: transform 0.2s; /* Hover efekt geçişi */
}

.preview-item img:hover {
  transform: translate(-50%, -50%) scale(1.1); /* Hover efekti ile büyütme */
}

/* Vurgulama */
.highlighted {
  animation: highlight 0.5s ease-in-out 3; /* Yanıp sönme efekti */
}

@keyframes highlight {
  0%,
  100% {
    background-color: transparent;
  }
  50% {
    background-color: yellow;
  }
}

/* Sağ taraf: Analiz sonuçları */
.right-side {
  width: 50%;
  background-color: #ded260;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Flex-start ile üstten hizalama */
  overflow-y: auto; /* Dikey kaydırma çubuğu ekle */
  box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.1);
}

.right-side h2 {
  font-size: 2.2em;
  color: #333;
  margin-bottom: 20px;
}

.result-box {
  width: 80%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  height: 400px; /* Analiz sonuçları alanı için yükseklik ayarı */
  overflow-y: auto; /* Dikey kaydırma çubuğu ekle */
}

.result-content {
  max-height: 100%; /* İçerik yüksekliği tam alanı kapsasın */
}

.result-content p {
  margin: 10px 0;
  line-height: 1.5; /* Satır yüksekliği arttırılarak daha rahat okunabilirlik sağlandı */
}
</style>
