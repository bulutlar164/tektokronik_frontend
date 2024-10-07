<template>
  <div class="card mb-3" style="max-width: 800px;">
    <div class="d-flex flex-row">
      <!-- Image Section -->
      <div class="col-md-6 p-2">
        <img
            v-if="buildingImage"
            :src="buildingImage"
            alt="Building Image"
            class="card-img"
            style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">
      </div>

      <!-- Details Section -->
      <div class="col-md-6 p-4 d-flex flex-column justify-content-between bordered-section">
        <div class="card-header text-white text-center custom-header">
          <h5 class="card-title mb-0 text-white">{{ address }}</h5>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <div class="info-label-container">
              <i class="fas fa-exclamation-circle info-icon"></i>
              <span class="info-label">Hasar Durumu:</span>
            </div>
            <span class="info-value">{{ damageStatus }}</span>
          </div>
          <div class="info-item">
            <div class="info-label-container">
              <i class="fas fa-users info-icon"></i>
              <span class="info-label">Muhtemel Nüfus:</span>
            </div>
            <span class="info-value">{{ estimatedPopulation }}</span>
          </div>
          <div class="info-item">
            <div class="info-label-container">
              <i class="fas fa-boxes info-icon"></i>
              <span class="info-label">Ekipman ve Gıda Durumu:</span>
            </div>
            <span class="info-value">{{ equipmentAvailability }}</span>
          </div>
          <div class="info-item">
            <div class="info-label-container">
              <i class="fas fa-map-marker-alt info-icon"></i>
              <span class="info-label">Toplanma Alanı:</span>
            </div>
            <span class="info-value">{{ gatheringPoint }}</span>
          </div>
          <div class="info-item">
            <div class="info-label-container">
              <i class="fas fa-user-shield info-icon"></i>
              <span class="info-label">Buradaki Ekipler:</span>
            </div>
            <span class="info-value">{{ team }}</span>
          </div>
        </div>
        <button @click="$emit('coordinate')" class="btn btn-outline-success mt-4 w-100 align-self-end">
          Koordinasyonu Sağla
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content">
        <h3>Koordinasyon Seçimleri</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="teamSelection">Takımlar</label>
            <select id="teamSelection" v-model="selectedTeam" class="form-control">
              <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="foodSelection">Gıdalar</label>
            <select id="foodSelection" v-model="selectedFood" class="form-control">
              <option v-for="food in foods" :key="food.id" :value="food.id">{{ food.name }}</option>
            </select>
          </div>

          <button type="submit" class="btn btn-success">Kaydet</button>
          <button type="button" class="btn btn-secondary" @click="closeModal">İptal</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LocationPopupComponent",
  props: {
    address: String,
    damageStatus: String,
    estimatedPopulation: Number,
    equipmentAvailability: String,
    gatheringPoint: String,
    buildingImage: String,
    team: String
  },
  data() {
    return {
      showModal: false,
      teams: [],
      foods: [],
      selectedTeam: null,
      selectedFood: null,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
      this.fetchData();
    },
    closeModal() {
      this.showModal = false;
    },
    fetchData() {
      // Fetch teams and foods from the API when the modal opens
      fetch('/api/teams')
          .then(response => response.json())
          .then(data => {
            this.teams = data;
          });

      fetch('/api/foods')
          .then(response => response.json())
          .then(data => {
            this.foods = data;
          });
    },
    submitForm() {
      // Send the selected data to the backend
      const postData = {
        teamId: this.selectedTeam,
        foodId: this.selectedFood,
      };

      fetch('/api/save-coordination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
          .then(response => response.json())
          .then(data => {
            console.log('Data saved:', data);
            this.closeModal();
          })
          .catch(error => {
            console.error('Error saving data:', error);
          });
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
}

.form-group {
  margin-bottom: 20px;
}

.btn-secondary {
  margin-left: 10px;
}

/* Gradient Header */
.custom-header {
  background: #2F56C8;
  border-radius: 15px 15px 0 0;
  padding: 15px;
}

/* Info Grid Styling */
.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  margin-top: 10px;
}

/* Info Item Styling */
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.info-item:hover {
  background-color: #e9f2ff;
}

.info-label-container {
  display: flex;
  align-items: center;
}

.info-icon {
  margin-right: 10px;
  color: #4e73df;
  font-size: 20px;
}

.info-label {
  font-weight: 600;
  color: #495057;
}

.info-value {
  font-size: 15px;
  font-weight: 500;
  color: #2d98da;
  background: #dff9fb;
  padding: 8px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Button Styling */
.btn-outline-success {
  border-color: #38ada9;
  color: #38ada9;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-success:hover {
  background-color: #38ada9;
  color: #fff;
  box-shadow: 0 8px 20px rgba(56, 173, 169, 0.3);
}

.card-title {
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 1px;
}

</style>
