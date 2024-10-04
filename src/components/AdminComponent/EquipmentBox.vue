<template>
  <div class="col-lg-6 col-md-12 mb-4">
    <div class="card h-100 p-4">
      <div class="card-body">
        <h5 class="card-title text-center">Ekipman Durumu</h5>
        <table class="table table-bordered table-striped">
          <thead class="thead-dark">
          <tr>
            <th>Ekipman Tipi</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="equipment in equipments" :key="equipment.equipment_id">
            <td>{{ equipment.type }}</td>
            <td>{{ equipment.status }}</td>
            <td>
              <button class="btn btn-info btn-sm" @click="allocateEquipment(equipment)">
                Yönlendir
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
      equipments: [
        { equipment_id: 1, type: "Ambulans", status: "Mevcut" },
        { equipment_id: 2, type: "İtfaiye Aracı", status: "Kullanımda" },
        { equipment_id: 3, type: "Kurtarma Ekipmanı", status: "Mevcut" }
      ]
    };
  },
  methods: {
    allocateEquipment(equipment) {
      alert(`${equipment.type} ekipmanı yönlendirildi!`);
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
