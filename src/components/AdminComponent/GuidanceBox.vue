<template>
  <div class="col-lg-12 col-md-12 mb-4">
    <div class="card h-100 p-4 card-elevated">
      <div class="card-header bg-primary text-white text-center gradient-header">
        <h5 class="card-title mb-0">Anlık Yönlendirnlendirme Durumları</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive stylish-table">
          <table class="table table-hover table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>Nereye Yönlendirildi</th>
                <th>Nereden Yönlendirildi</th>
                <th>Mevcut Kişi Sayısı</th>
                <th>Tahmini Yönlendirilen Kişi Sayısı</th>
                <th>Durum</th>
                <th>Yönlendirilme Zamanı</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="guidance in regionalGuidance"
                :key="guidance.guidanceId"
                :class="getStatusClass(guidance.status)"
              >
                <td>{{ guidance.assemblyPoint.name }}</td>
                <td>
                  {{ guidance.crowdDetection && guidance.crowdDetection.location
                    ? guidance.crowdDetection.location.address
                    : 'Veri Yok' }}
                </td>
                <td>
                  {{ guidance.crowdDetection ? guidance.crowdDetection.estimatedCount : 'Veri Yok' }}
                </td>
                <td>
                  {{ guidance.crowdDetection ? guidance.crowdDetection.estimatedCount : 'Veri Yok' }}
                </td>
                <td>{{ guidance.status }}</td>
                <td>{{ guidance.assignedAt }}</td>
                <td>
                  <button
                    class="btn btn-info btn-sm animated-button"
                    @click="viewGuidanceDetails(guidance)"
                  >
                    Detayları Gör
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      regionalGuidance: []
    };
  },
  created() {
    this.fetchRegionalGuidance();
  },
  methods: {
    fetchRegionalGuidance() {
      axios
        .get('http://localhost:8080/regional-guidances')
        .then(response => {
          this.regionalGuidance = response.data;
        })
        .catch(error => {
          console.error('Error fetching regional guidance data: ', error);
        });
    },
    viewGuidanceDetails(guidance) {
      const crowdDetectionDetails =
        guidance.crowdDetection
          ? `<strong>Crowd Detection ID:</strong> ${guidance.crowdDetection.crowdDetectionId}<br><strong>Lokasyon:</strong> ${guidance.crowdDetection.location ? guidance.crowdDetection.location.address + ' - ' + guidance.crowdDetection.location.region : 'Veri Yok'}<br><strong>Tahmini Kişi Sayısı:</strong> ${guidance.crowdDetection.estimatedCount}`
          : 'Crowd Detection Bilgisi Mevcut Değil';
      Swal.fire({
        title: 'Yönlendirme Detayları',
        html: `<strong>Guidance ID:</strong> ${guidance.guidanceId}<br>${crowdDetectionDetails}<br><strong>Durum:</strong> ${guidance.status}<br><strong>Atama Zamanı:</strong> ${guidance.assignedAt}`,
        icon: 'info',
        confirmButtonText: 'Tamam'
      });
    },
    getStatusClass(status) {
      switch (status) {
        case 'beklemede':
          return 'table-warning';
        case 'uygulandı':
          return 'table-success';
        case 'iptal edildi':
          return 'table-danger';
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  overflow: hidden;
  background-image: linear-gradient(145deg, #f3f4f7, #ffffff);
}

.card-elevated {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-elevated:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.gradient-header {
  background: linear-gradient(90deg, #4e73df, #224abe);
  padding: 15px;
  font-size: 1.25rem;
}

.stylish-table {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-responsive {
  max-height: 400px; /* Ensure the table can scroll if needed */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: auto; /* Enable horizontal scrolling */
}

.table {
  margin-top: 20px;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

.table th,
.table td {
  vertical-align: middle;
  text-align: center;
  padding: 10px; /* Reduced padding for better fit */
  border: 1px solid #dee2e6;
  white-space: nowrap;
  font-size: 0.9rem; /* Base font size */
}

.table-hover tbody tr:hover {
  background-color: #e9ecef;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f8f9fc;
}

.table-warning {
  background-color: #fff3cd;
}

.table-success {
  background-color: #d4edda;
}

.table-danger {
  background-color: #f8d7da;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  padding: 6px 12px;
  border-radius: 20px;
}

.btn-info:hover {
  background-color: #138496;
  border-color: #117a8b;
}

.animated-button {
  transition: transform 0.2s;
}

.animated-button:hover {
  transform: scale(1.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .table th,
  .table td {
    font-size: 0.8rem; /* Smaller font size on smaller screens */
    padding: 6px; /* Reduced padding for better fit */
    white-space: normal; /* Allow wrapping of text */
  }

  .card-header h5 {
    font-size: 1rem; /* Adjust card title size */
  }
}
</style>
