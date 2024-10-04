<template>
  <div class="teams-section">
    <h5 class="section-title">Teams</h5>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="team in teams" :key="team.id">
        <div class="team-details">
          <i class="fas fa-users" style="color: #6c757d;"></i> {{ team.name }}
          <small class="text-muted d-block">{{ team.members }} members</small>
        </div>
        <i class="fas fa-chevron-right" style="color: #6c757d;"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TeamsList",
  data() {
    return {
      teams: [
        { id: 1, name: "Search & Rescue", members: 2 },
        { id: 2, name: "Medical", members: 4 },
        { id: 3, name: "Hazmat", members: 1 }
      ]
    };
  }
};
</script>

<style scoped>
.teams-section {
  margin-bottom: 30px;
}

.section-title {
  font-weight: bold;
  color: #000; /* Black text */
  margin-bottom: 15px;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: #fff;
  border: none;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Light shadow */
}

.list-group-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

.team-details i {
  margin-right: 10px;
}
</style>
