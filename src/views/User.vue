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
  import Navbar from "@/components/UserComponent/Navbar.vue";
  import MapComponent from "@/components/UserComponent/MapComponent.vue";
  import IncidentsList from "@/components/UserComponent/IncidentsList.vue";
  import ConfirmationBox from "@/components/UserComponent/ConfirmationBox.vue";
  
  export default {
    name: "User",
    components: {
      Navbar,
      MapComponent,
      IncidentsList,
      ConfirmationBox
    }
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
  }
  
  .map-column {
    height: auto;
    flex-grow: 1;
    display: flex;
    align-items: stretch;
    padding-right: 10px; /* Spacing between columns */
  }
  
  .dashboard-column {
    height: 100%;
    flex-basis: 30%;
    padding-left: 10px; /* Spacing between columns */
  }
  
  @media (max-width: 768px) {
    .content-container {
      flex-direction: column;
    }
    .map-column {
      height: 400px; /* Fixed height for smaller screens */
    }
  }
  </style>
  