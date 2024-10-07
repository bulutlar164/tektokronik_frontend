<template>
  <div class="card p-4 card-elevated main-card">
    <div class="card-header bg-primary text-white text-center gradient-header">
      <h5 class="card-title mb-0">Ekipler</h5>
    </div>
    <div class="teams-container">
      <div class="teams-grid">
        <div class="team-card" v-for="team in teams" :key="team.id">
          <div
            class="card team-card-content"
            :class="{
              'available-card': team.status === 'uygun',
              'busy-card':
                team.status === 'meşgul' || team.status === 'müsait değil'
            }"
          >
            <div class="card-body">
              <h6 class="card-title team-name">
                <i class="fas fa-users mr-2" style="color: #007bff;"></i>
                {{ team.teamName }}
                <span v-if="team.status === 'uygun'" class="available-icon">
                  <i
                    class="fas fa-check-circle available-icon-inner"
                    style="color: green; margin-left: 8px;"
                  ></i>
                </span>
              </h6>
              <p class="card-text">
                <span class="label">Görev Yeri:</span> {{ team.assignedRegion }}<br />
                <span class="label">Toplam Kapasite:</span> {{ team.capacity }}<br />
                <span class="label">Uygunluk:</span> {{ team.status }}
              </p>
            </div>
            <div class="card-footer">
              <button
                class="btn btn-outline-primary btn-block"
                @click="showTeamLocation(team)"
              >
                Konumu Görüntüle
              </button>
              <button
                class="btn btn-outline-success btn-block mt-2"
                @click="assignTeam(team)"
              >
                Yönlendir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import eventBus from '@/eventBus';

export default {
  name: 'TeamsList',
  data() {
    return {
      teams: [],
    };
  },
  mounted() {
    this.fetchTeams();
  },
  methods: {
    fetchTeams() {
      axios
        .get('http://localhost:8080/api/emergency-teams')
        .then((response) => {
          this.teams = response.data.map((team) => ({
            id: team.teamId,
            teamName: team.teamName,
            capacity: team.capacity,
            status: team.status,
            assignedRegion: team.assignedRegion,
            currentLocation: [
              team.currentLocation.latitude,
              team.currentLocation.longitude,
            ],
          }));
        })
        .catch((error) => {
          console.error('Ekipler yüklenirken bir hata oluştu:', error);
        });
    },
    showTeamLocation(team) {
      eventBus.emit('highlight-team-location', {
        coordinates: team.currentLocation,
        teamName: team.teamName,
      });
    },
    assignTeam(team) {
      alert(`${team.teamName} ekibi yönlendirildi!`);
    },
  },
};
</script>

<style scoped>
.main-card {
  max-height: 80vh;
}

.teams-container {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  height: 32vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #007bff #e0e0e0;
}

.teams-grid {
  display: flex;
  flex-wrap: wrap;
  height: auto; /* Change to auto for responsiveness */
  gap: 15px;
}

.team-card {
  flex: 1 0 calc(33.333% - 10px); /* Default: 3 columns */
  max-width: calc(33.333% - 10px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.team-card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.team-card-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.available-card {
  box-shadow: 0 0 10px rgba(47, 166, 30, 0.56);
}

.busy-card {
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}

.card-body {
  padding: 15px;
}

.team-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.card-text {
  font-size: 0.9rem;
  color: #555;
}

.label {
  font-weight: bold;
  color: #007bff;
}

.card-footer {
  padding: 10px 15px;
  margin-top: auto;
}

.card-footer button {
  width: 100%;
}

.btn-block {
  width: 100%;
}

.btn-outline-primary,
.btn-outline-success {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid;
  border-radius: 4px;
  background-color: transparent;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.btn-outline-success:hover {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

.available-icon {
  display: inline-grid;
  align-items: center;
  margin-left: 8px;
}

.available-icon-inner {
  display: inline-block;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .team-card {
    flex: 1 0 calc(50% - 10px); /* 2 columns for medium screens */
    max-width: calc(50% - 10px);
  }
}

@media (max-width: 768px) {
  .team-card {
    flex: 1 0 calc(100% - 10px); /* 1 column for small screens */
    max-width: calc(100% - 10px);
  }
}

/* Scrollbar style */
.teams-container::-webkit-scrollbar {
  width: 6px;
}

.teams-container::-webkit-scrollbar-thumb {
  background-color: #007bff;
  border-radius: 10px;
}

.teams-container::-webkit-scrollbar-track {
  background-color: #e0e0e0;
}

/* Header style */
.gradient-header {
  background: linear-gradient(90deg, #4e73df, #224abe);
  padding: 15px;
  font-size: 1.25rem;
  color: white;
  border-radius: 8px 8px 0 0;
}
</style>
