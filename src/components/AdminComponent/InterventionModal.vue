<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h5>Ekibi Seç</h5>
      <button class="close-button" @click="close">&times;</button>
      <div class="team-list">
        <div
            class="team-item"
            v-for="team in availableTeams"
            :key="team.team_id"
        >
          <div class="team-info">
            <strong>{{ team.team_name }}</strong>
            <small class="text-muted d-block">
              Kapasite: {{ team.capacity }}
            </small>
          </div>
          <button class="btn btn-primary btn-sm" @click="assignTeam(team)">
            Seç
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InterventionModal",
  props: {
    show: Boolean,
    incidentId: Number,
  },
  data() {
    return {
      teams: [
        // Örnek veri, gerçek uygulamada API'den çekilecek
        {
          team_id: 1,
          team_name: "Arama & Kurtarma",
          capacity: 12,
          status: "uygun",
        },
        {
          team_id: 2,
          team_name: "Medikal",
          capacity: 8,
          status: "meşgul",
        },
        {
          team_id: 3,
          team_name: "Kimyasal",
          capacity: 5,
          status: "uygun",
        },
      ],
    };
  },
  computed: {
    availableTeams() {
      return this.teams.filter((team) => team.status === "uygun");
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    assignTeam(team) {
      // Müdahale işlemi
      alert(
          `Olay ID ${this.incidentId} için ${team.team_name} ekibi seçildi.`
      );
      this.close();
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.team-list {
  max-height: 300px;
  overflow-y: auto;
  margin-top: 20px;
}

.team-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.team-info {
  flex-grow: 1;
}

.team-info strong {
  display: block;
  font-size: 16px;
}

.btn-sm {
  padding: 5px 10px;
}
</style>
