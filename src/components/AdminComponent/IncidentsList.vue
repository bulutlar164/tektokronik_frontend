<template>
  <div class="card p-3 card-elevated main-card mb-2">
    <div class="card-header bg-primary text-white text-center gradient-header">
      <h5 class="card-title mb-0">Olaylar</h5>
    </div>
    <div class="incidents-container incidents-scroll">
      <div class="timeline" v-if="!loading">
        <div class="timeline-item" v-for="incident in incidents" :key="incident.reportId">
          <div class="timeline-marker"></div>
          <div class="timeline-content-wrapper">
            <div class="timeline-content" @click="toggleDetails(incident.reportId)">
              <span class="incident-time">{{ incident.timeAgo }}</span>
              <p class="incident-description">{{ incident.description }}</p>
            </div>
            <button class="intervene-button" @click.stop="handleIntervene(incident.reportId)">
              Müdahale Et
            </button>
          </div>
          <transition name="slide">
            <div class="incident-details" v-if="activeIncident === incident.reportId">
              {{ incident.details }}
            </div>
          </transition>
        </div>
      </div>
      <div v-else class="loading-spinner">Yükleniyor...</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: "IncidentsList",
  data() {
    return {
      loading: true,
      incidents: [],
      activeIncident: null,
    };
  },
  mounted() {
    this.fetchIncidents();
  },
  methods: {
    fetchIncidents() {
      axios.get('http://localhost:8080/reports')
          .then(response => {
            console.log('Olaylar yüklendi:', response.data);
            this.incidents = response.data.map(report => ({
              reportId: report.reportId,
              description: `${report.location.locationType} - ${report.buildingStatus}`,
              timeAgo: this.calculateTimeAgo(report.updatedAt),
              details: report.notes,
            }));
            this.loading = false;
          })
          .catch(error => {
            console.error('Olaylar yüklenirken bir hata oluştu:', error);
            this.loading = false;
          });
    },
    handleIntervene(id) {
      axios.post(`http://localhost:8080/reports/${id}`, { reportStatus: 'işlemde' })
          .then(() => {
            alert(`Olay ID ${id} için müdahale başlatıldı.`);
            this.fetchIncidents();
          })
          .catch(error => {
            console.error('Müdahale işlemi başarısız:', error);
            alert('Müdahale sırasında bir hata oluştu.');
          });
    },
    toggleDetails(id) {
      this.activeIncident = this.activeIncident === id ? null : id;
    },
    calculateTimeAgo(updatedAt) {
      const updatedDate = new Date(updatedAt);
      const now = new Date();
      const differenceInHours = Math.floor((now - updatedDate) / 36e5);
      if (differenceInHours < 24) {
        return `${differenceInHours} saat önce`;
      } else {
        const days = Math.floor(differenceInHours / 24);
        return `${days} gün önce`;
      }
    },
  },
};
</script>
<style scoped>
.main-card {
  max-height: 70vh;
}

.incidents-container {
  background-color: #fff;
  padding: 10px;
  border-radius: 6px;
  height: 24vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #007bff #e0e0e0;
}

.incidents-scroll {
  overflow-y: auto;
}

.incidents-scroll::-webkit-scrollbar {
  width: 6px;
}

.incidents-scroll::-webkit-scrollbar-thumb {
  background-color: #007bff;
  border-radius: 8px;
}

.incidents-scroll::-webkit-scrollbar-track {
  background-color: #e0e0e0;
}

.loading-spinner {
  text-align: center;
  padding: 15px;
  font-size: 14px;
  color: #555;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px; /* Noktalar arasındaki boşluğu artırıyoruz */
  padding-left: 30px;
}

.timeline-marker {
  position: absolute;
  left: 10px;
  width: 10px;
  height: 10px;
  background: #ff6b6b;
  border-radius: 50%;
}

.timeline-marker::before {
  content: '';
  position: absolute;
  top: 0; /* Çizgi, noktanın tam ortasından değil üstünden başlar */
  left: 50%;
  width: 2px;
  height: 100%; /* Çizgi, tam olarak bir olayın yüksekliği kadar olur */
  background-color: #ff6b6b;
  transform: translateX(-50%);
  z-index: -1; /* Çizgiyi noktanın arkasına alıyoruz */
}

.timeline-item:first-child .timeline-marker::before {
  top: 50%; /* İlk olayın üstündeki çizginin yarısını kaldırmak için */
}

.timeline-item:last-child .timeline-marker::before {
  display: none; /* Son olaydan sonra çizgi olmasın */
}

.timeline-content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timeline-content {
  padding: 3px 0;
  cursor: pointer;
}

.timeline-content:hover {
  background-color: #f9f9f9;
}

.incident-time {
  font-size: 11px;
  color: #999;
  margin-bottom: 2px;
}

.incident-description {
  font-size: 13px;
  color: #555;
  margin: 0;
}

.intervene-button {
  background-color: #ffcc00;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 11px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.intervene-button:hover {
  background-color: #ffdb4d;
}

.incident-details {
  padding: 8px 12px;
  margin-top: 4px;
  background-color: #f7f7f7;
  border-left: 2px solid #ff6b6b;
  border-radius: 4px;
  font-size: 12px;
  color: #444;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-enter-to,
.slide-leave-from {
  max-height: 100px;
  opacity: 1;
  transform: translateY(0);
}

/* Scrollbar stili */
.incidents-container::-webkit-scrollbar {
  width: 6px;
}

.incidents-container::-webkit-scrollbar-thumb {
  background-color: #007bff;
  border-radius: 8px;
}

.incidents-container::-webkit-scrollbar-track {
  background-color: #e0e0e0;
}

.gradient-header {
  background: linear-gradient(90deg, #4e73df, #224abe);
  padding: 10px;
  font-size: 1rem;
  color: white;
  border-radius: 6px 6px 0 0;
}
</style>