<template>
    <h5 class="section-title ">Ekipler</h5>
  <div class="teams-container">
    <div class="teams-grid">
      <div class="team-card" v-for="team in teams" :key="team.id">
        <div class="card team-card-content">
          <div class="card-body">
            <h6 class="card-title">
              <i class="fas fa-users mr-2" style="color: #007bff;"></i>{{ team.name }}
            </h6>
            <p class="card-text">Üye Sayısı: {{ team.members }}</p>
            <button class="btn btn-outline-primary btn-sm" @click="assignTeam(team)">Yönlendir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamsList",
  data() {
    return {
      teams: [
        { id: 1, name: "Arama & Kurtarma", members: 2 },
        { id: 2, name: "Tıbbi", members: 4 },
        { id: 3, name: "Hazmat", members: 1 },
        { id: 4, name: "K9 Birimi", members: 3 },
        { id: 5, name: "Psikolojik Destek", members: 2 },
        { id: 6, name: "Lojistik", members: 5 }
      ]
    };
  },
  methods: {
    assignTeam(team) {
      alert(`${team.name} ekibi yönlendirildi!`);
    }
  }
};
</script>

<style scoped>
.teams-container {
  max-height: 31vh;
  overflow-y: auto;
  padding:10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.teams-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.team-card {
  flex: 1 0 calc(50% - 10px);
  box-sizing: border-box;
}

.team-card-content {
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.team-card-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: #fff;
}
</style>
