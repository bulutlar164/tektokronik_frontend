<template>
  <div class="user-dashboard">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content Container with flexbox -->
    <div class="content-container row">
      <!-- Map Column -->
      <div class="map-column col-lg-8 col-md-12">
        <MapComponent />
      </div>

      <!-- Dashboard Section (Incidents and Teams) -->
      <div class="dashboard-column col-lg-4 col-md-12">
        <IncidentsList />
        <ConfirmationBox />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MapComponent from "@/components/UserComponent/MapComponent.vue";
import IncidentsList from "@/components/AdminComponent/IncidentsList.vue";
import ConfirmationBox from "@/components/UserComponent/ConfirmationBox.vue";

export default {
  name: "User",
  components: {
    Navbar,
    MapComponent,
    IncidentsList,
    ConfirmationBox,
  },
};
</script>

<style scoped>
.user-dashboard {
  background-color: #faf8f5; /* Muted beige background color */
  min-height: 100vh;
}

.content-container {
  display: flex;
  width: 100%;
  padding: 20px; /* Adjust for spacing */
  margin: 0 auto;
  position: relative; /* Set relative positioning for z-index */
}

.map-column {
  height: auto;
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  padding-right: 10px; /* Spacing between columns */
  z-index: 1; /* Ensure map is above other elements */
}

.dashboard-column {
  height: auto; /* Allow height to be determined by content */
  flex-basis: 30%;
  padding-left: 10px; /* Spacing between columns */
  z-index: 2; /* Ensure dashboard is above map */
  position: relative; /* Set relative positioning for z-index */
}

@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }
  
  .map-column {
    height: 400px; /* Fixed height for smaller screens */
  }

  .dashboard-column {
    order: 1; /* Ensure dashboard column appears below map column */
    padding-left: 0; /* Remove left padding */
    padding-top: 10px; /* Add top padding for spacing */
    z-index: 3; /* Ensure dashboard is above other elements */
  }
}
</style>
