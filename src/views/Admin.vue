<template>
  <div class="admin-dashboard">
    <!-- Navbar -->
    <Navbar
        :brand="'TEKTOKRONIK'"
        :links="navLinks"
    />

    <!-- Main Content Area -->
    <div class="container-fluid dashboard-container">
      <!-- Two-column layout -->
      <div class="row justify-content-center">
        <!-- Left Content (Map) -->
        <div class="col-lg-8">
          <MapComponent />
        </div>

        <!-- Right Content (Dashboard Cards) -->
        <div class="col-lg-4">
          <DashboardContent />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/AdminComponent/Navbar.vue";
import MapComponent from "@/components/AdminComponent/MapComponent.vue";
import DashboardContent from "@/components/AdminComponent/DashboardContent.vue";

export default {
  name: 'Admin',
  components: {
    Navbar,
    MapComponent,
    DashboardContent
  },
  data() {
    return {
      navLinks: [
        { label: "Home", url: "/" },
        { label: "Dashboard", url: "#" },
        { label: "Reports", url: "#" }
      ]
    };
  }
};
</script>

<style scoped>
/* Background colors that complement #17a2b8 */
.admin-dashboard {
  background-color: #17a2b8; /* Main cyan color */
  background-image: linear-gradient(135deg, #17a2b8 40%, #1f8096 100%); /* Slightly darker blue-green for gradient */
  min-height: 100vh; /* Ensure it covers the whole viewport */
}

/* Increase container size to cover most of the screen */
.dashboard-container {
  padding: 40px;
  margin: 20px auto;
  max-width: 90%; /* Increase the width */
  min-height: 80vh; /* Increase the height to cover most of the viewport */
  background-color: rgba(255, 255, 255, 0.9); /* White background with transparency */
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); /* Larger soft shadow */
}

/* Remove the inner text */
.text-white {
  color: white;
}
</style>
