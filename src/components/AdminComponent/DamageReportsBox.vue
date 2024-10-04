<template>
  <div class="col-lg-6 col-md-12 mb-4">
    <div class="card h-100 p-4">
      <div class="card-body">
        <h5 class="card-title text-center">Zarar Raporları</h5>
        <table class="table table-bordered table-striped">
          <thead class="thead-dark">
          <tr>
            <th>Zarar Tipi</th>
            <th>Lokasyon</th>
            <th>Şiddet Seviyesi</th>
            <th>İşlem</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="report in damageReports" :key="report.report_id">
            <td>{{ report.type }}</td>
            <td>{{ report.location }}</td>
            <td>{{ report.severity }}</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="viewReportDetails(report)">
                Detayları Gör
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      damageReports: [
        {report_id: 1, type: "Bina", location: "23. Sokak", severity: "Yıkılmış"},
        {report_id: 2, type: "Köprü", location: "Atatürk Caddesi", severity: "Ağır"},
        {report_id: 3, type: "Yol", location: "Bahçelievler", severity: "Orta"}
      ]
    };
  },
  methods: {
    viewReportDetails(report) {
      alert(`Zarar Raporu Detayları: ${report.type}, Lokasyon: ${report.location}, Şiddet: ${report.severity}`);
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table {
  margin-top: 20px;
}
</style>
