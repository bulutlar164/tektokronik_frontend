<template>
  <div>
    <h2 class="section-title">Active Alerts</h2>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>Alert ID</th>
        <th>Type</th>
        <th>Status</th>
        <th>Team ID</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="alert in alerts" :key="alert.alert_id">
        <td>{{ alert.alert_id }}</td>
        <td>{{ alert.alert_type }}</td>
        <td>
            <span
                :class="{
                'badge bg-warning text-dark': alert.status === 'yeni',
                'badge bg-success': alert.status === 'tamamlandı',
              }"
            >
              {{ alert.status }}
            </span>
        </td>
        <td>{{ alert.team_id }}</td>
        <td>{{ alert.alert_date }}</td>
        <td>
          <button @click="acknowledgeAlert(alert)" class="btn btn-sm btn-info">Acknowledge</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Alerts',
  data() {
    return {
      alerts: [
        {alert_id: 1, alert_type: 'hasar', status: 'yeni', team_id: 1, alert_date: '2023-01-01'},
      ],
    };
  },
  methods: {
    acknowledgeAlert(alert) {
      // Handle alert acknowledgment
    },
  },
};
</script>

<style scoped>
.section-title {
  font-weight: bold;
  color: #343a40;
  margin-bottom: 20px;
}

.badge {
  padding: 0.5em;
  font-size: 0.85em;
}
</style>
