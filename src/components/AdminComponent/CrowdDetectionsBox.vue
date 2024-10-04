<template>
  <div class="col-lg-12 mb-4">
    <div class="card h-100 text-center p-4">
      <div class="card-body">
        <h5 class="card-title">Kalabalık Algılamaları</h5>
        <p class="card-text">Toplam Algılama: {{ crowdDetectionCount }}</p>
        <p class="card-text">En Yüksek Tahmin: {{ highestCrowd.count }} kişi</p>
        <p class="card-text">Lokasyon: {{ highestCrowd.location }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      crowdDetectionCount: 0,
      highestCrowd: {}
    };
  },
  mounted() {
    this.fetchCrowdDetections();
  },
  methods: {
    fetchCrowdDetections() {
      axios.get('/api/crowd_detections').then(response => {
        this.crowdDetectionCount = response.data.length;
        this.highestCrowd = response.data.reduce((max, detection) => {
          return detection.estimated_count > max.estimated_count ? detection : max;
        }, {estimated_count: 0});
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
