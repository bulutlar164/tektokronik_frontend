<template>
  <div>
    <h2>Damage Reports & Crowd Detection</h2>
    <div class="row">
      <div class="col-md-6">
        <h3>Damage Reports</h3>
        <ul>
          <li v-for="report in damageReports" :key="report.report_id">
            {{ report.damage_type }} ({{ report.severity }}) - {{ report.report_date }}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <h3>Crowd Detection</h3>
        <ul>
          <li v-for="detection in crowdDetections" :key="detection.crowd_detection_id">
            Estimated crowd: {{ detection.estimated_count }} - {{ detection.detection_date }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DamageReports',
  data() {
    return {
      damageReports: [],
      crowdDetections: []
    };
  },
  mounted() {
    this.fetchReports();
  },
  methods: {
    fetchReports() {
      // Fetch damage reports and crowd detection data from the tektokronik-backend
    }
  }
};
</script>
