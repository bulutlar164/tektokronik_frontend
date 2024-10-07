<!-- src/components/AdminComponent/CoordinationModal.vue -->
<template>
  <div
      class="modal fade show"
      tabindex="-1"
      role="dialog"
      aria-labelledby="coordinationModalLabel"
      aria-hidden="true"
      style="display: block; background: rgba(0, 0, 0, 0.5);"
      v-if="isVisible"
  >
    <div class="modal-dialog" role="document" @click.self="closeModal">
      <div class="modal-content">
        <form @submit.prevent="submitCoordination">
          <div class="modal-header">
            <h5 class="modal-title" id="coordinationModalLabel">Coordinate Resources and Teams</h5>
            <button type="button" class="close" @click="closeModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- Team Selection -->
            <div class="form-group">
              <label for="teamSelect">Assign Team</label>
              <select v-model="selectedTeam" class="form-control" id="teamSelect" required>
                <option disabled value="">Please select a team</option>
                <option v-for="team in availableTeams" :key="team.teamId" :value="team.teamId">
                  {{ team.teamName }}
                </option>
              </select>
            </div>

            <!-- Equipment Selection -->
            <div class="form-group">
              <label for="equipmentSelect">Assign Equipment</label>
              <select v-model="selectedEquipment" class="form-control" id="equipmentSelect" required>
                <option disabled value="">Please select equipment</option>
                <option v-for="equipment in availableEquipment" :key="equipment.equipmentId" :value="equipment.equipmentId">
                  {{ equipment.equipmentType }} (Status: {{ equipment.status }})
                </option>
              </select>
            </div>

            <!-- Food Resource Selection -->
            <div class="form-group">
              <label for="foodSelect">Assign Food Resources</label>
              <select v-model="selectedFood" class="form-control" id="foodSelect" required>
                <option disabled value="">Please select food resources</option>
                <option v-for="food in availableFood" :key="food.resourceId" :value="food.resourceId">
                  {{ food.type }} - Quantity: {{ food.quantity }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="submit" class="btn btn-success">Submit Coordination</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CoordinationModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    reportId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedTeam: '',
      selectedEquipment: '',
      selectedFood: '',
      availableTeams: [],
      availableEquipment: [],
      availableFood: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async fetchCoordinationData() {
      try {
        const [teamsResponse, equipmentResponse, foodResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/teams'),
          axios.get('http://localhost:8080/equipment'),
          axios.get('http://localhost:8080/resources'),
        ]);

        this.availableTeams = teamsResponse.data;
        this.availableEquipment = equipmentResponse.data;
        this.availableFood = foodResponse.data;
      } catch (error) {
        console.error('Error fetching coordination data:', error);
      }
    },
    async submitCoordination() {
      if (!this.reportId) {
        alert('No report selected for coordination.');
        return;
      }

      try {
        const payload = {
          reportId: this.reportId,
          teamId: this.selectedTeam,
          equipmentId: this.selectedEquipment,
          resourceId: this.selectedFood,
        };

        const response = await axios.post('http://localhost:8080/reports', payload);

        if (response.status === 200) {
          alert('Coordination successful!');
          this.closeModal();
          this.$emit('refresh'); // Emit an event to refresh the map data
        } else {
          alert('Coordination failed.');
        }
      } catch (error) {
        console.error('Error submitting coordination:', error);
        alert('An error occurred while submitting coordination.');
      }
    },
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.fetchCoordinationData();
      }
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
