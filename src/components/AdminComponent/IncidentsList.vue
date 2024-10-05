<template>
  <div class="incidents-section mb-4">
    <h5 class="section-title">Olaylar</h5>
    <div class="incidents-box">
      <div class="timeline">
        <div
            class="timeline-item"
            v-for="incident in incidents"
            :key="incident.id"
        >
          <div class="timeline-marker"></div>
          <div class="timeline-content-wrapper">
            <div
                class="timeline-content"
                @click="toggleDetails(incident.id)"
            >
              <span class="incident-time">{{ incident.timeAgo }}</span>
              <p class="incident-description">{{ incident.description }}</p>
            </div>
            <button
                class="intervene-button"
                @click.stop="intervene(incident.id)"
            >
              Müdahale Et
            </button>
          </div>
          <transition name="slide">
            <div
                class="incident-details"
                v-if="activeIncident === incident.id"
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
export default {
  name: "IncidentsList",
  data() {
    return {
      activeIncident: null,
      incidents: [
        {
          id: 1,
          description: "23. Sokakta bina çökmesi",
          timeAgo: "4 saat önce",
          details:
              "Bina ani bir şekilde çöktü ve kurtarma çalışmaları devam ediyor.",
        },
        {
          id: 2,
          description: "5. Cadde'de gaz kaçağı",
          timeAgo: "6 saat önce",
          details: "Bölgedeki gaz kaçağı nedeniyle evler tahliye ediliyor.",
        },
        {
          id: 3,
          description: "7. Sokakta yol kapandı",
          timeAgo: "12 saat önce",
          details:
              "Ana yol üzerindeki çalışma nedeniyle trafik başka güzergahlara yönlendirildi.",
        },
        {
          id: 4,
          description: "10. Sokakta su baskını",
          timeAgo: "1 gün önce",
          details: "Yoğun yağışlar sonucu su baskınları meydana geldi.",
        },
        {
          id: 5,
          description: "Park alanında yangın",
          timeAgo: "2 gün önce",
          details: "Araç park alanında çıkan yangın kontrol altına alındı.",
        },
      ],
    };
  },
  methods: {
    toggleDetails(id) {
      this.activeIncident = this.activeIncident === id ? null : id;
    },
    intervene(id) {
      // Müdahale et butonuna tıklandığında yapılacak işlemler
      alert(`Olay ID ${id} için müdahale ediliyor.`);
    },
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
