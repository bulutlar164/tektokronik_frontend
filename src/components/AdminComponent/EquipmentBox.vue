<template>
  <div class="col-lg-12 mb-4">
    <div class="card h-100 text-center p-4">
      <div class="card-body">
        <h5 class="card-title">Equipment Status</h5>
        <p class="card-text">Toplam: {{ equipmentTotal }}</p>
        <p class="card-text">Mevcut: {{ availableEquipment }}</p>
        <p class="card-text">Kullanımda: {{ inUseEquipment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      equipmentTotal: 0,
      availableEquipment: 0,
      inUseEquipment: 0
    };
  },
  mounted() {
    this.fetchEquipment();
  },
  methods: {
    fetchEquipment() {
      axios.get('/api/equipment').then(response => {
        this.equipmentTotal = response.data.length;
        this.availableEquipment = response.data.filter(eq => eq.status === 'mevcut').length;
        this.inUseEquipment = response.data.filter(eq => eq.status === 'kullanımda').length;
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
