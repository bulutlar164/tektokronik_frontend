<template>
  <div>
    <h2 class="section-title">User Management</h2>
    <div class="row">
      <div v-for="user in users" :key="user.user_id" class="col-md-12 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ user.username }}</h5>
            <p class="card-text">
              <strong>Email:</strong> {{ user.email }}<br>
              <strong>Role:</strong> {{ user.role }}
            </p>
            <button @click="editUser(user)" class="btn btn-primary btn-sm">Edit</button>
            <button @click="deleteUser(user.user_id)" class="btn btn-danger btn-sm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserManagement',
  data() {
    return {
      users: [
        { user_id: 1, username: 'admin', email: 'admin@example.com', role: 'yönetici' },
        { user_id: 2, username: 'team_member1', email: 'member1@example.com', role: 'ekip_üyesi' },
      ],
    };
  },
  methods: {
    editUser(user) {
      // Handle edit user
    },
    deleteUser(user_id) {
      // Handle delete user
    },
  },
};
</script>

<style scoped>
.section-title {
  font-weight: bold;
  color: #343a40;
  margin-bottom: 20px;
}

.card-title {
  font-weight: 600;
}

.card {
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.btn {
  margin-right: 10px;
}
</style>
