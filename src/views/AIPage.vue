<template>
  <div id="app" class="container">
    <!-- Navbar -->
    <Navbar />

    <div class="content-section">
      <div class="left-side">
        <h1 class="title">Resim Yükleyin</h1>
        <p class="description">Resimlerinizi seçin ve analiz sonuçlarını öğrenin.</p>

        <div class="upload-section">
          <input
            type="file"
            @change="onFileChange"
            multiple
            accept=".jpg,.jpeg,.png"
            class="file-input"
            id="file-upload"
          />
          <label for="file-upload" class="custom-file-upload">
            <span>Dosya Seç</span>
          </label>
          <button v-if="!isUploading" @click="uploadImages" class="upload-btn">Resimleri Yükle</button>
          <p v-if="isUploading">Yükleniyor...</p>
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
          <table class="result-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Hasar Durumu</th>
                <th>İnsan Sayısı</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-if="analysisResults.length"
                v-for="(result, index) in analysisResults"
                :key="index"
                @click="highlightAnalysis(index)"
                :class="{ highlighted: highlightedIndex === index }"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ result.severity }}</td>
                <td>{{ result.peopleCount }}</td>
              </tr>
              <tr v-else>
                <td colspan="3">Analiz bekleniyor...</td>
              </tr>
            </tbody>
          </table>
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
        this.analysisResults = responseData.results.map((result) => {
          let severity = "";
          if (result.predicted_class === 0) {
            severity = "Hafif Hasarlı";
          } else if (result.predicted_class === 1) {
            severity = "Orta Hasarlı";
          } else if (result.predicted_class === 2) {
            severity = "Ağır Hasarlı";
          }
          return {
            severity,
            peopleCount: result.PeopleRandom
          };
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
  flex-direction: row; /* İlk başta yan yana yerleştir */
  justify-content: space-between; /* Boşlukları eşit dağıt */
  height: calc(100vh - 60px); /* Navbar'ı hesaba kat */
  gap: 20px; /* Aralarındaki boşluk */
  padding: 20px;
}

/* Sol taraf: Resim yükleme alanı */
.left-side {
  width: 48%; /* Genişlik sınırı */
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
  text-align: center; /* Yazıyı ortala */
}

.upload-section {
  display: flex;
  flex-direction: column; /* Dikey hizala */
  align-items: center; /* Ortala */
  margin-bottom: 20px;
}

.file-input {
  display: none; /* Varsayılan dosya girişi gizlensin */
}

.custom-file-upload {
  margin: 10px;
  display: inline-block;
  padding: 12px 25px;
  cursor: pointer;
  background-color: #ff6f61; /* Arka plan rengi */
  color: white; /* Yazı rengi */
  border-radius: 8px; /* Köşe yuvarlama */
  text-align: center; /* Yazıyı ortala */
  transition: background-color 0.3s ease; /* Geçiş efekti */
}

.custom-file-upload:hover {
  background-color: #ff3d2e; /* Hover efekti */
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

/* Sağ taraf: Analiz sonuçları alanı */
.right-side {
  width: 48%;
  background-color: #fff;
  padding: 30px;
  box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.1);
}

.result-box {
  max-height: 70vh;
  overflow-y: auto; /* Dikey kaydırma */
}

.result-table {
  width: 100%;
  border-collapse: collapse;
}

.result-table th,
.result-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center; /* Hücre içi metni ortala */
}

.result-table th {
  background-color: #ff6f61;
  color: white;
}

/* Media Queries */
@media (max-width: 768px) {
  .content-section {
    flex-direction: column; /* Mobil cihazlar için yan yana yerine alt alta sıralar */
    height: auto; /* Yükseklik ayarı kaldırılır */
  }

  .left-side,
  .right-side {
    width: 100%; /* Her iki bölme de %100 genişlik alır */
    margin-bottom: 20px; /* Altına boşluk ekle */
  }

  .preview-item {
    width: 80px; /* Küçük ekranlarda önizleme öğeleri küçültülür */
    height: 80px;
  }

  .upload-section {
    flex-direction: column; /* Dikey hizalama sağlanır */
  }

  .custom-file-upload,
  .upload-btn {
    width: 100%; /* Butonlar tam genişlikte olur */
    text-align: center;
    margin-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2em; /* Başlık boyutu daha da küçültülür */
  }

  .description {
    font-size: 1em; /* Açıklama yazı boyutu küçültülür */
  }

  .preview-item {
    width: 60px; /* Daha küçük ekranlar için daha da küçültülür */
    height: 60px;
  }

  .result-table th,
  .result-table td {
    padding: 6px; /* Tablo hücrelerinin iç boşlukları daraltılır */
  }

  .custom-file-upload,
  .upload-btn {
    padding: 10px; /* Butonların iç boşlukları küçültülür */
  }
}
</style>
