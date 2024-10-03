<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-custom sticky-top shadow">
    <div class="container-fluid">
      <!-- Branding -->
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img src="/src/assets/logo.png" class="brand-logo me-2" alt="Brand Logo" />
        <span class="brand-text">{{ brand }}</span>
      </a>

      <!-- Toggler for mobile -->
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links and Search Bar -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Navbar Links -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="(link, index) in links" :key="index">
            <a class="nav-link active nav-link-text" :href="link.url">{{ link.label }}</a>
          </li>

          <!-- Optional: Dropdown for admin-specific actions -->
          <li class="nav-item dropdown">
            <a
                class="nav-link dropdown-toggle active nav-link-text"
                href="#"
                id="adminDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
              Admin
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </li>
        </ul>

        <!-- Search bar -->
        <form class="d-flex me-2">
          <input
              class="form-control search-input me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
          />
          <button class="btn btn-outline-warning" type="submit">Search</button>
        </form>

        <!-- User profile (icon for logged-in users) -->
        <ul class="navbar-nav ms-3">
          <li class="nav-item dropdown">
            <a
                class="nav-link dropdown-toggle d-flex align-items-center text-light"
                href="#"
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
              <img
                  src="https://via.placeholder.com/30"
                  class="rounded-circle me-2"
                  alt="User"
              />
              <span>Admin</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    brand: {
      type: String,
      required: true,
    },
    links: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every((link) => link.label && link.url);
      },
    },
  },
};
</script>

<style scoped>
/* Navbar inspired by the logo's color scheme */
.navbar.bg-custom {
  background-color: #17a2b8; /* Blue-green inspired by the buildings */
  color: white;
}

/* Image styling to control size */
.brand-logo {
  max-width: 50px; /* Sets maximum width of the image */
  height: auto; /* Maintains aspect ratio */
}

.navbar-toggler-icon {
  background-color: white;
}

/* Brand text styling */
.brand-text {
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
}

/* Navbar links */
.nav-link-text {
  font-size: 1.1rem;
  color: white !important;
  transition: color 0.3s ease;
}

.nav-link-text:hover {
  color: #f0a500 !important; /* Orange accent inspired by the cracked ground */
}

/* Dropdown menu styling */
.dropdown-menu {
  background-color: #6c757d; /* Gray inspired by the drone */
  border: none;
}

.dropdown-menu a {
  color: white;
}

.dropdown-menu a:hover {
  background-color: #f0a500; /* Orange highlight */
}

/* Search input */
.search-input {
  background-color: white;
  border: none;
  transition: background-color 0.3s ease;
}

.search-input:focus {
  background-color: #e9ecef;
  outline: none;
}

/* Profile image */
.navbar-nav .nav-link img {
  width: 30px;
  height: 30px;
  border: 2px solid white;
}

/* Button styling */
.btn-outline-warning {
  color: white;
  border-color: #f0a500;
}

.btn-outline-warning:hover {
  background-color: #f0a500;
  color: white;
}
</style>
