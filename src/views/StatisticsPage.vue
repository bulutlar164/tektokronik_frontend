<template>
  <div class="statistics-page">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content Container with flexbox -->
    <div class="content-container">
      <h1 class="page-title">İstatistikler Genel Görünümü</h1>

      <!-- Statistics Section for Pie Charts -->
      <div class="statistics-section">
        <div class="statistic-container" v-for="(stat, index) in statistics" :key="index">
          <div class="statistic-info">
            <h3>{{ stat.category }}</h3>
            <p>Sayım: {{ stat.count }}</p>
            <p>Yüzde: {{ stat.percentage }}%</p>
          </div>
          <div class="chart-container">
            <canvas :id="'pieChart' + index" width="100" height="100"></canvas>
          </div>
        </div>
      </div>

      <!-- Bar Charts Section for Last 3 Items -->
      <div class="statistics-section">
        <div class="statistic-container" v-for="(bar, index) in barStatistics" :key="index">
          <div class="statistic-info">
            <h3>{{ bar.category }}</h3>
            <p>Toplam: {{ bar.total }}</p>
          </div>
          <div class="chart-container bar-chart-container">
            <canvas :id="'barChart' + index" width="300" height="200"></canvas> <!-- Daha geniş ve yüksek -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { Pie, Bar } from "vue-chartjs"; // Ensure vue-chartjs is installed
import Chart from 'chart.js/auto'; // Import Chart.js auto to register all components

export default {
  name: "StatisticsPage",
  components: {
    Navbar,
    Pie,
    Bar,
  },
  data() {
    return {
      statistics: [
        { category: "Raporlar", count: 120, percentage: 40 },
        { category: "Aktif Ekipler", count: 75, percentage: 25 },
        { category: "Çözülen Olaylar", count: 100, percentage: 33.33 },
        { category: "Bekleyen Talepler", count: 50, percentage: 16.67 },
        { category: "Kullanılan Ekipman", count: 200, percentage: 66.67 },
        { category: "Kalabalık Tespitleri", count: 30, percentage: 10 },
      ],
      barStatistics: [
        { category: "Ekipman Durumu", total: 150, values: [50, 30, 70] },
        { category: "Kullanıcı Geri Bildirimleri", total: 200, values: [100, 60, 40] },
        { category: "Olay Zamanı Dağılımı", total: 120, values: [20, 50, 50] },
      ],
    };
  },
  mounted() {
    this.renderPieCharts();
    this.renderBarCharts();
  },
  methods: {
    renderPieCharts() {
      this.statistics.forEach((stat, index) => {
        const ctx = document.getElementById(`pieChart${index}`).getContext("2d");
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Yüzde " + stat.percentage, "Diğer"],
            datasets: [{
              data: [stat.percentage, 100 - stat.percentage], // Yüzdeyi kullanarak pastayı oluştur
              backgroundColor: ["#FF6384", "#E0E0E0"],
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return context.label + ": " + context.raw + "%"; // Yüzdeyi göster
                  }
                }
              }
            }
          },
        });
      });
    },
    renderBarCharts() {
      this.barStatistics.forEach((bar, index) => {
        const ctx = document.getElementById(`barChart${index}`).getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Kategori 1", "Kategori 2", "Kategori 3"],
            datasets: [{
              label: bar.category,
              data: bar.values,
              backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: Math.max(...bar.values) + 20, // Y ekseni değerini ayarla
              },
            },
          },
        });
      });
    },
  },
};
</script>

<style scoped>
.statistics-page {
  background-color: #faf8f9; /* Muted beige background color */
  min-height: 100vh;
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  text-align: center;
}

.statistics-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.statistic-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 30%; /* Adjust width to fit 3 columns */
  background-color: #fff;
}

.chart-container {
  width: 100px; /* Fixed width for pie charts */
  height: 100px; /* Fixed height for pie charts */
  margin-top: 10px;
}

.bar-chart-container {
  width: 300px; /* Daha geniş alan */
  height: 200px; /* Daha fazla yükseklik */
  margin-top: 10px;
}

.statistic-info {
  text-align: center;
}
</style>
