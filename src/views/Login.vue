<template>
  <div class="login-container">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-left">
        <img src="@/assets/logo-no-background.png" alt="Tektokronik Logo" class="logo" />
        <span class="brand-name">Tektokronik</span>
      </div>
      <div class="navbar-right">
        <a href="#about" class="nav-link">About Us</a>
      </div>
    </nav>

    <!-- Left side background image -->
    <div class="background-image"></div>

    <!-- Right side login/register form -->
    <div class="form-container">
      <div class="form-toggle">
        <button :class="{ active: isLogin }" @click="toggleForm('login')" class="form-toggle-button">Login</button>
        <button :class="{ active: !isLogin }" @click="toggleForm('register')" class="form-toggle-button">Register</button>
      </div>

      <!-- Login form -->
      <div v-if="isLogin" class="login-form-container">
        <h1>Login</h1>
        <form @submit.prevent="login">
          <div class="form-group">
            <input type="text" v-model="username" placeholder="Username" required />
          </div>
          <div class="form-group">
            <input type="password" v-model="password" placeholder="Password" required />
          </div>
          <button type="submit" class="login-button">Log In</button>
        </form>
      </div>

      <!-- Register form -->
      <div v-if="!isLogin" class="login-form-container">
        <h1>Register</h1>
        <form @submit.prevent="register">
          <div class="form-group">
            <input type="text" v-model="newUsername" placeholder="Username" required />
          </div>
          <div class="form-group">
            <input type="email" v-model="email" placeholder="Email" required />
          </div>
          <div class="form-group">
            <input type="password" v-model="newPassword" placeholder="Password" required />
          </div>
          <div class="form-group">
            <input type="password" v-model="passwordAgain" placeholder="Password Again" required />
          </div>
          <button type="submit" class="login-button">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      username: '',
      password: '',
      newUsername: '',
      email: '',
      newPassword: '',
      passwordAgain: ''
    };
  },
  methods: {
    toggleForm(formType) {
      this.isLogin = formType === 'login';
    },
    login() {
      console.log('Logging in with', this.username, this.password);
    },
    register() {
      if (this.newPassword === this.passwordAgain) {
        console.log('Registering with', this.newUsername, this.email, this.newPassword);
      } else {
        alert('Passwords do not match!');
      }
    }
  }
};
</script>

<style scoped>
/* Navbar styling */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  width: 100%;
  z-index: 10;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.brand-name {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.navbar-right .nav-link {
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  margin-left: 20px;
  transition: color 0.3s ease;
}

.navbar-right .nav-link:hover {
  color: #4CAF50;
}

/* Container for the entire page */
.login-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: #000;
  position: relative;
}

/* Left half for background image */
.background-image {
  flex: 1; /* Take half of the screen */
  background-image: url('@/assets/disaster-scene.png'); /* Replace with your image path */
  background-size: cover;
  background-position: center;
  filter: brightness(0.8); /* Darken background slightly */
}

/* Right half for form */
.form-container {
  flex: 1; /* Take half of the screen */
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  align-items: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0); /* Semi-transparent background */
  backdrop-filter: blur(5px);
}

/* Toggle buttons for Login and Register */
.form-toggle {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-toggle-button {
  padding: 10px 20px;
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  flex: 1; /* Ensure buttons take equal space */
  transition: 0.3s;
}

.form-toggle-button.active {
  background-color: #4CAF50;
}

.form-toggle-button:hover {
  background-color: #45a049;
}

/* Form styling */
.login-form-container {
  text-align: center;
  width: 100%;
}

h1 {
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.8);
}

.form-group {
  margin-bottom: 1rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  font-size: 16px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
}

input::placeholder {
  color: #ccc;
}

.login-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%; /* Make the button take full width */
}

.login-button:hover {
  background-color: #45a049;
}

/* Responsive Styling */

/* For screens 768px and smaller (tablets) */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .background-image {
    height: 50vh;
    width: 100%;
  }

  .form-container {
    width: 100%;
    padding: 1rem;
    margin-top: 0; /* Remove margin top */
    align-items: stretch; /* Stretch the form container */
  }

  .navbar {
    flex-direction: column;
    padding: 10px;
  }

  .brand-name {
    font-size: 18px;
  }

  .navbar-right .nav-link {
    margin-left: 10px;
    font-size: 14px;
  }

  .form-toggle {
    flex-direction: column; /* Stack buttons vertically */
    gap: 10px; /* Add gap between buttons */
  }

  .form-toggle-button {
    width: 100%; /* Ensure buttons take full width */
  }
}

/* For screens 480px and smaller (mobile) */
@media (max-width: 480px) {
  .login-container {
    flex-direction: column;
  }

  .background-image {
    height: 40vh;
    width: 100%;
  }

  .form-toggle {
    flex-direction: column;
    gap: 10px;
  }

  .form-toggle-button {
    width: 100%; /* Ensure buttons take full width */
    font-size: 16px;
  }

  .form-container {
    padding: 1rem;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    font-size: 14px;
  }

  .login-button {
    font-size: 14px;
  }

  h1 {
    font-size: 24px;
  }
}
</style>
