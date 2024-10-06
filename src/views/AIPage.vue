<template>
    <div id="app">
      <h1>Birden Fazla Resim Yükleyin</h1>
      <input type="file" @change="onFileChange" multiple accept=".jpg,.jpeg,.png"/>
      <button @click="uploadImages">Yükle</button>
  
      <div class="image-preview">
        <h2>Yüklenen Resimler:</h2>
        <div v-if="imagePreviews.length">
          <img v-for="(image, index) in imagePreviews" :key="index" :src="image" alt="Preview" />
        </div>
        <div v-else>
          <p>Henüz resim yüklenmedi.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedFiles: [],
        imagePreviews: [],  // Yüklenen resimlerin önizlemeleri için dizi
      };
    },
    methods: {
      onFileChange(event) {
        this.selectedFiles = Array.from(event.target.files);
        this.imagePreviews = this.selectedFiles.map(file => URL.createObjectURL(file)); // Resim önizlemeleri oluştur
      },
      async uploadImages() {
        const formData = new FormData();
  
        this.selectedFiles.forEach(file => {
          formData.append('files', file); // Her resmi FormData'ya ekle
        });
  
        try {
          const res = await fetch('http://localhost:5000/upload-images/', {
            method: 'POST',
            body: formData,
          });
  
          const responseData = await res.json();
  
          // API yanıtını konsola yazdır
          console.log("API Yanıtı:", responseData);
          
          // Başarı durumunda alert göster
          alert(`Resimler başarıyla yüklendi!`);
        } catch (error) {
          console.error('Error:', error);
        }
      },
    },
  };
  </script>
  
  <style>
  /* Basit stil ayarları */
  #app {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
  }
  
  input[type="file"] {
    margin-bottom: 20px;
  }
  
  .image-preview {
    margin-top: 20px;
  }
  
  .image-preview img {
    max-width: 100px; /* Resim boyutunu ayarlama */
    margin: 5px;
  }
  </style>
  