<template>
  <div class="admin-dashboard">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content Container with flexbox -->
    <div class="content-container row">
      <!-- Map Column -->
      <div class="map-column col-lg-7 col-md-12"> <!-- Genişlik küçültüldü -->
        <MapComponent />
      </div>

      <!-- Dashboard Section (Incidents and Teams) -->
      <div class="dashboard-column col-lg-5 col-md-12"> <!-- Dashboard kısmı genişletildi -->
        <IncidentsList />
        <TeamsList />
      </div>
    </div>

    <!-- Information Boxes with Functional Buttons -->
    <div class="boxes row mt-4">
      <CrowdDetectionsBox />
      <ResourcesBox />
      <DamageReportsBox />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MapComponent from "@/components/AdminComponent/MapComponent.vue";
import IncidentsList from "@/components/AdminComponent/IncidentsList.vue";
import TeamsList from "@/components/AdminComponent/TeamsList.vue";
import DamageReportsBox from "@/components/AdminComponent/GuidanceBox.vue";
import CrowdDetectionsBox from "@/components/AdminComponent/CrowdDetectionsBox.vue";
import ResourcesBox from "@/components/AdminComponent/ResourcesBox.vue";
import EquipmentBox from "@/components/AdminComponent/EquipmentBox.vue";

export default {
  name: "Admin",
  components: {
    Navbar,
    MapComponent,
    IncidentsList,
    TeamsList,
    DamageReportsBox,
    CrowdDetectionsBox,
    ResourcesBox,
    EquipmentBox
  }
};
</script>

<style scoped>
.admin-dashboard {
  background-color: #F5EFE6;
  min-height: 100vh;
}

.content-container {
  display: flex;
  width: 100%;
  padding: 20px 20px 0px 20px;
  margin: 0 auto;
}

.boxes{
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 20px;
}

.map-column {
  height: 71vh;
  flex-basis: 60%; /* Genişlik küçültüldü */
  display: flex;
  align-items: stretch;
  padding-right: 10px;
}

.dashboard-column {
  height: 68vh;
  flex-basis: 40%; /* Dashboard genişliği artırıldı */
  padding-left: 10px;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-lg-6 {
  width: 50%;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }

  .map-column {
    height: 400px; /* Fixed height for smaller screens */
  }
}
</style>
