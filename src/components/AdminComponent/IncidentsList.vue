<template>
  <div class="incidents-section mb-4">
    <h5 class="section-title">Incidents</h5>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="incident in incidents" :key="incident.id">
        <div class="incident-details">
          <i class="fas fa-map-marker-alt" style="color: #6c757d;"></i> {{ incident.description }}
          <small class="text-muted d-block">{{ incident.timeAgo }}</small>
        </div>
        <i class="fas fa-chevron-right" style="color: #6c757d;"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "IncidentsList",
  data() {
    return {
      incidents: [
        { id: 1, description: "Building collapse at 23rd Street", timeAgo: "4 hours ago" },
        { id: 2, description: "Gas leak at 5th Avenue", timeAgo: "6 hours ago" },
        { id: 3, description: "Road blocked at 7th Street", timeAgo: "12 hours ago" }
      ]
    };
  }
};
</script>

<style scoped>
.incidents-section {
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Light shadow for a modern look */
}

.list-group-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

.incident-details i {
  margin-right: 10px;
}
</style>
