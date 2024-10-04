<template>
  <div class="col-lg-6 col-md-12 mb-4">
    <div class="card h-100 p-4">
      <div class="card-body">
        <h5 class="card-title text-center">Kalabalık Algılamaları</h5>
        <table class="table table-bordered table-striped">
          <thead class="thead-dark">
          <tr>
            <th>Toplanma Yeri</th>
            <th>Olası İnsan Sayısı</th>
            <th>Yönlendirilen İnsan Sayısı</th>
            <th>İşlem</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="place in gatheringPlaces" :key="place.id">
            <td>{{ place.location }}</td>
            <td>{{ place.estimatedPeople }}</td>
            <td>{{ place.redirectedPeople }}</td>
            <td>
              <button class="btn btn-primary btn-sm" @click="redirectPeople(place)">
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
      gatheringPlaces: [
        { id: 1, location: "Kızılay Meydanı", estimatedPeople: 150, redirectedPeople: 0 },
        { id: 2, location: "Tandoğan Parkı", estimatedPeople: 80, redirectedPeople: 20 },
        { id: 3, location: "Bahçelievler 7. Cadde", estimatedPeople: 120, redirectedPeople: 50 }
      ]
    };
  },
  methods: {
    redirectPeople(place) {
      // Fake update redirected people
      place.redirectedPeople += 10;
      alert(`${place.location} bölgesine yönlendirme yapıldı.`);
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
