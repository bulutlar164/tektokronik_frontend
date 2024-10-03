<template>
  <div class="content-container">
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Manage Users</h5>
        <p class="card-text">Add, edit, or delete user accounts.</p>
        <a href="#" class="btn btn-primary">Go to Users</a>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Recent Activity</h5>
        <p class="card-text">View recent activity logs of the system.</p>
        <a href="#" class="btn btn-primary">View Logs</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardContent"
};
</script>

<style scoped>
.content-container .card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
