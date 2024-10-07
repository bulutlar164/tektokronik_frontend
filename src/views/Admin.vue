<template>
  <div class="admin-dashboard">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content Container with flexbox -->
    <div class="content-container row">
      <!-- Map Column -->
      <div class="map-column col-lg-7 col-md-12">
        <MapComponent />
      </div>

      <!-- Dashboard Section (Incidents and Teams) -->
      <div class="dashboard-column col-lg-5 col-md-12">
        <IncidentsList />
        <TeamsList />
      </div>
    </div>

    <!-- Information Boxes with Functional Buttons -->
    <div class="boxes row mt-4">
      <ResourcesBox />
      <EquipmentBox />
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
  padding: 20px;
  margin: 0 auto;
}

.boxes {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 20px;
  flex-wrap: wrap; /* Kutuların sarmalaması için */
}

.map-column {
  height: 76vh; /* Harita yüksekliği */
  flex-basis: 60%; /* Genişlik ayarı */
  display: flex;
  align-items: stretch;
  padding-right: 10px;
}

.dashboard-column {
  height: auto; /* Dashboard otomatik yükseklik alacak */
  flex-basis: 40%; /* Genişlik ayarı */
  padding-left: 10px;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }

  .map-column {
    height: 50vh; /* Küçük ekranlar için yükseklik */
    padding-right: 0; /* Sağdan boşluk kaldırıldı */
  }

  .dashboard-column {
    padding-left: 0; /* Soldan boşluk kaldırıldı */
    height: auto; /* Dashboard yüksekliği otomatik */
  }

  .boxes {
    flex-direction: column; /* Bilgi kutularını dikey yerleştir */
  }

  .boxes > * {
    width: 100%; /* Her kutunun genişliğini %100 yap */
    margin-bottom: 10px; /* Kutular arası boşluk ekleyin */
  }

  .boxes > :last-child {
    margin-bottom: 0; /* Son kutunun alt boşluğunu kaldırın */
  }
}
</style>
