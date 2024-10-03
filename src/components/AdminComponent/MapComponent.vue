<template>
  <div class="map-container">
    <!-- Google Map Embed -->
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345090844!2d144.95373531589067!3d-37.81627917975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577b8c6d8cfabeb!2sGoogle!5e0!3m2!1sen!2sus!4v1619647755651!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "MapComponent"
};
</script>

<style scoped>
.map-container {
  height: 600px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
