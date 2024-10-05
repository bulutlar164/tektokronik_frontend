<template>
  <div class="admin-dashboard">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content Container with flexbox -->
    <div class="content-container row">
      <!-- Map Column -->
      <div class="map-column col-lg-8 col-md-12">
        <MapComponent />
      </div>

      <!-- Dashboard Section (Incidents and Teams) inside a scrollable box -->
      <div class="dashboard-column col-lg-4 col-md-12">
        <div class="dashboard-box">
          <IncidentsList />
          <TeamsList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MapComponent from "@/components/AdminComponent/MapComponent.vue";
import IncidentsList from "@/components/AdminComponent/IncidentsList.vue";
import TeamsList from "@/components/AdminComponent/ConfirmationBox.vue";

export default {
  name: "Admin",
  components: {
    Navbar,
    MapComponent,
    IncidentsList,
    TeamsList
  }
};
</script>

<style>
.admin-dashboard {
  background-color: #faf8f9; /* Muted beige background color */
  min-height: 100vh;
}

.content-container {
  display: flex;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
}

.map-column {
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  padding-right: 10px;
}

.dashboard-column {
  flex-basis: 30%;
  padding-left: 10px;
}

.dashboard-box {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto; /* Scrollbar ekledik */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }
  .map-column {
    height: 400px;
  }
}
</style>
