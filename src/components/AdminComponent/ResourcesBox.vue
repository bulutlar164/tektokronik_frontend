<template>
  <div class="col-lg-12 mb-4">
    <div class="card h-100 text-center p-4">
      <div class="card-body">
        <h5 class="card-title">Mevcut Kaynaklar</h5>
        <ul class="list-unstyled">
          <li v-for="resource in resources" :key="resource.resource_id">
            {{ resource.type }}: {{ resource.quantity }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resources: []
    };
  },
  mounted() {
    this.fetchResources();
  },
  methods: {
    fetchResources() {
      axios.get('/api/resources').then(response => {
        this.resources = response.data;
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
