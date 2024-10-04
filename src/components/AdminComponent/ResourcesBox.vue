<template>
  <div class="col-lg-6 col-md-12 mb-4">
    <div class="card h-100 p-4">
      <div class="card-body">
        <h5 class="card-title text-center">Mevcut Kaynaklar</h5>
        <table class="table table-bordered table-striped">
          <thead class="thead-dark">
          <tr>
            <th>Kaynak Tipi</th>
            <th>Mevcut Miktar</th>
            <th>İşlem</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="resource in resources" :key="resource.resource_id">
            <td>{{ resource.type }}</td>
            <td>{{ resource.quantity }}</td>
            <td>
              <button class="btn btn-primary btn-sm" @click="allocateResource(resource)">
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
      resources: [
        { resource_id: 1, type: "Gıda", quantity: 120 },
        { resource_id: 2, type: "Battaniye", quantity: 75 },
        { resource_id: 3, type: "İlaç", quantity: 50 }
      ]
    };
  },
  methods: {
    allocateResource(resource) {
      resource.quantity -= 10; // Decrease resource quantity
      alert(`${resource.type} kaynağı yönlendirildi!`);
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
