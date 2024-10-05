<template>
  <div class="confirmation-box">
    <h2>{{ title }}</h2>
    <p v-html="formattedDescription"></p>
    <div class="button-group">
      <button 
        v-if="!isAccepted && !isRejected"
        @mousedown="accept" 
        class="accept-btn"
      >
        Kabul
      </button>
      <button 
        v-if="!isAccepted && !isRejected"
        @mousedown="reject" 
        class="reject-btn"
      >
        Red
      </button>

      <button 
        v-if="isAccepted" 
        class="status-btn accepted"
      >
        Kabul Edildi
      </button>

      <button 
        v-if="isRejected" 
        class="status-btn rejected"
      >
        Reddedildi
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationBox",
  props: {
    title: {
      type: String,
      default: "Görev Bildirimi" // Varsayılan başlık
    },
    description: {
      type: String,
      default: `Adres: Ankara, Türkiye\nNüfus Yoğunluğu: ${Math.random() > 0.5 ? 'Fazla' : 'Az'}\nDurum: ${Math.random() > 0.5 ? 'Riskli' : 'Güvenli'}` // Varsayılan açıklama
    }
  },
  data() {
    return {
      isAccepted: false,
      isRejected: false,
    };
  },
  computed: {
    formattedDescription() {
      return this.description.replace(/\n/g, "<br>");
    }
  },
  methods: {
    accept() {
      if (!this.isAccepted && !this.isRejected) {
        this.isAccepted = true;
        // Diğer butonları devre dışı bırak
        this.$nextTick(() => {
          document.querySelector('.reject-btn').disabled = true;
        });
      }
    },
    reject() {
      if (!this.isAccepted && !this.isRejected) {
        this.isRejected = true;
        // Diğer butonları devre dışı bırak
        this.$nextTick(() => {
          document.querySelector('.accept-btn').disabled = true;
        });
      }
    }
  }
};
</script>

<style scoped>
.confirmation-box {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}

h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
  text-align: center;
}

p {
  font-size: 16px;
  color: #666;
  margin: 10px 0 20px 0;
  line-height: 1.5;
  white-space: pre-line;
}

.button-group {
  display: flex;
  justify-content: space-around;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.accept-btn {
  background-color: #28a745;
  color: white;
}

.reject-btn {
  background-color: #dc3545;
  color: white;
}

.status-btn {
  width: 100%;
  max-width: 200px;
  margin: 20px auto;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: not-allowed;
  opacity: 0.5;
  text-align: center;
  transition: opacity 0.3s ease;
}

.status-btn.accepted {
  background-color: #28a745;
  color: white;
}

.status-btn.rejected {
  background-color: #dc3545;
  color: white;
}

/* Butona tıklanınca onu ortalayıp solduruyoruz */
.button-group button:focus,
.status-btn {
  display: block;
  margin: 0 auto;
  opacity: 0.5;
}
</style>
