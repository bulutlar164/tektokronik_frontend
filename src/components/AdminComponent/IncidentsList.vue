<template>
  <div class="incidents-section mb-4">
    <h5 class="section-title">Olaylar</h5>
    <div class="incidents-box">
      <div class="timeline">
        <div
            class="timeline-item"
            v-for="incident in incidents"
            :key="incident.reportId"
        >
          <div class="timeline-marker"></div>
          <div class="timeline-content-wrapper">
            <div
                class="timeline-content"
                @click="toggleDetails(incident.reportId)"
            >
              <span class="incident-time">{{ incident.timeAgo }}</span>
              <p class="incident-description">{{ incident.description }}</p>
            </div>
            <button
                class="intervene-button"
                @click.stop="intervene(incident.reportId)"
            >
              Müdahale Et
            </button>
          </div>
          <transition name="slide">
            <div
                class="incident-details"
                v-if="activeIncident === incident.reportId"
            >
              {{ incident.details }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "IncidentsList",
  data() {
    return {
      activeIncident: null,
      incidents: [], // Olaylar buraya backend'den yüklenecek
    };
  },
  mounted() {
    this.fetchIncidents(); // Olayları sayfa yüklendiğinde backend'den çek
  },
  methods: {
    toggleDetails(id) {
      this.activeIncident = this.activeIncident === id ? null : id;
    },
    intervene(id) {
      // Backend'e müdahale isteği gönder
      axios.post(`http://localhost:8080/reports/${id}`, { reportStatus: 'işlemde' })
          .then(response => {
            alert(`Olay ID ${id} için müdahale başlatıldı.`);
            this.fetchIncidents(); // Müdahaleden sonra olay listesini güncelle
          })
          .catch(error => {
            console.error('Müdahale işlemi başarısız:', error);
            alert('Müdahale sırasında bir hata oluştu.');
          });
    },
    fetchIncidents() {
      // Olayları backend'den al
      axios.get('http://localhost:8080/reports')
          .then(response => {
            console.log('Olaylar yüklendi:', response.data);
            this.incidents = response.data.map(report => ({
              reportId: report.reportId,
              description: `${report.location.locationType} - ${report.buildingStatus}`,
              timeAgo: this.calculateTimeAgo(report.updatedAt),
              details: report.notes,
            }));
          })
          .catch(error => {
            console.error('Olaylar yüklenirken bir hata oluştu:', error);
          });
    },
    calculateTimeAgo(updatedAt) {
      // Olayın oluşma zamanına göre bir zaman farkı hesaplayıcı
      const updatedDate = new Date(updatedAt);
      const now = new Date();
      const differenceInHours = Math.floor((now - updatedDate) / 36e5);
      if (differenceInHours < 24) {
        return `${differenceInHours} saat önce`;
      } else {
        const days = Math.floor(differenceInHours / 24);
        return `${days} gün önce`;
      }
    }
  },
};
</script>

<style>
.incidents-section {
  margin-top: 20px;
}

.section-title {
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.incidents-box {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  max-height: 28vh;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
}

.timeline {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 20px;
  width: 2px;
  height: 100%;
  background: #d3d3d3;
}

.timeline-item {
  position: relative;
  margin-bottom: 20px;
  padding-left: 40px;
}

.timeline-marker {
  position: absolute;
  left: 14px;
  width: 12px;
  height: 12px;
  background: #ff6b6b;
  border-radius: 50%;
}

.timeline-content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timeline-content {
  padding: 5px 0;
  cursor: pointer;
}

.timeline-content:hover {
  background-color: #f9f9f9;
}

.incident-time {
  font-size: 12px;
  color: #999;
  margin-bottom: 2px;
}

.incident-description {
  font-size: 14px;
  color: #555;
  margin: 0;
}

.intervene-button {
  background-color: #ffcc00;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.intervene-button:hover {
  background-color: #ffdb4d;
}

.incident-details {
  padding: 10px 15px;
  margin-top: 5px;
  background-color: #f7f7f7;
  border-left: 2px solid #ff6b6b;
  border-radius: 4px;
  font-size: 13px;
  color: #444;
}

/* Geçiş animasyonu */
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
</style>
