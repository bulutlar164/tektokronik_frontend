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

      <!-- Dashboard Section (Incidents and Teams) -->
      <div class="dashboard-column col-lg-4 col-md-12">
        <IncidentsList />
        <!-- Ekipler Listesi, Olayların Hemen Altında ve Aynı Sütunda -->
        <div class="teams-container mt-3">
          <TeamsList />
        </div>
      </div>
    </div>

    <!-- Information Boxes with Functional Buttons -->
    <div class="boxes row mt-4">
      <DamageReportsBox />
      <CrowdDetectionsBox />
      <ResourcesBox />
      <EquipmentBox />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MapComponent from "@/components/AdminComponent/MapComponent.vue";
import IncidentsList from "@/components/AdminComponent/IncidentsList.vue";
import TeamsList from "@/components/AdminComponent/TeamsList.vue";
import DamageReportsBox from "@/components/AdminComponent/DamageReportsBox.vue";
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
  background-color: #faf8f9; /* Muted beige background color */
  min-height: 100vh;
}

.content-container {
  display: flex;
  width: 100%;
  padding: 20px 20px 0px 20px;
  margin: 0 auto;
}

.map-column {
  height: 60vh; /* Haritanın boyutunu biraz küçülttük */
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  padding-right: 10px;
}

.dashboard-column {
  height: auto;
  flex-basis: 30%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
}

.teams-container {
  max-height: 6vh; /* Kartların taşmasını engellemek için maksimum yükseklik */
  overflow-y: auto; /* Dikey kaydırma ekledik */
  padding: 10px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Hafif gölge */
  margin-bottom: 10px; /* Kartlar arasındaki boşluk */
}

.boxes {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Kutular arasındaki boşlukları düzenledik */
  margin: 0 auto;
  padding: 0 20px;
}

.col-lg-6,
.col-lg-4 {
  padding-left: 10px;
  padding-right: 10px;
}

.teams-container::-webkit-scrollbar {
  width: 8px; /* Scrollbar genişliği */
}

.teams-container::-webkit-scrollbar-thumb {
  background-color: #007bff;
  border-radius: 4px;
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
