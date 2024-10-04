<template>
  <div class="col-lg-12 mb-4">
    <div class="card h-100 text-center p-4">
      <div class="card-body">
        <h5 class="card-title">Zarar Raporları</h5>
        <p class="card-text">Toplam Rapor: {{ damageReportCount }}</p>
        <p class="card-text">En Ciddi: {{ mostSevereDamage.type }} - {{ mostSevereDamage.severity }}</p>
        <p class="card-text">Lokasyon: {{ mostSevereDamage.location }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      damageReportCount: 0,
      mostSevereDamage: {}
    };
  },
  mounted() {
    this.fetchDamageReports();
  },
  methods: {
    fetchDamageReports() {
      axios.get('/api/damage_reports').then(response => {
        this.damageReportCount = response.data.length;
        this.mostSevereDamage = response.data.reduce((mostSevere, report) => {
          return report.severity > (mostSevere?.severity || '') ? report : mostSevere;
        }, null);
      });
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
