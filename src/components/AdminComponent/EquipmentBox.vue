<template>
  <div class="col-lg-6 col-md-12 mb-4">
    <div class="card h-100 p-4">
      <div class="card-body">
        <h5 class="card-title text-center">Mevcut Kaynaklar</h5>
        <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
          <table class="table table-hover table-bordered table-striped">
            <thead class="thead-dark">
            <tr>
              <th>Kaynak Tipi</th>
              <th>Mevcut Miktar</th>
              <th>Konum</th>
              <th>İşlem</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="resource in resources" :key="resource.equipmentId">
              <td>{{ resource.equipmentType }}</td>
              <td>{{ resource.capacity }}</td>
              <td>{{ resource.location.address }}</td>
              <td>
                <button class="btn btn-primary btn-sm" @click="allocateResource(resource)">
                  Yönlendir
                </button>
                <button class="btn btn-outline-primary btn-sm mt-2" @click="showLocation(resource)">
                  Konumu Gör
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import eventBus from '@/eventBus';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  data() {
    return {
      resources: [],
      map: null
    };
  },
  created() {
    this.fetchResources();
  },
  mounted() {
    this.initMap();
  },
  methods: {
    fetchResources() {
      axios.get('/api/equipment')
          .then(response => {
            this.resources = response.data;
          })
          .catch(error => {
            console.error('Kaynaklar yüklenemedi:', error);
          });
    },
    allocateResource(resource) {
      axios.put(`/api/equipment/${resource.equipmentId}/allocate`, {
        status: 'kullanımda'
      })
          .then(() => {
            alert(`${resource.equipmentType} kaynağı yönlendirildi!`);
            this.fetchResources(); // Tabloyu güncellemek için verileri tekrar yükle
          })
          .catch(error => {
            console.error('Kaynak yönlendirme hatası:', error);
          });
    },
    showLocation(resource) {
      eventBus.emit('highlight-equipment-location', {
        coordinates: [resource.location.latitude, resource.location.longitude],
        equipmentType: resource.equipmentType
      });
      if (this.map) {
        const coordinates = [resource.location.latitude, resource.location.longitude];
        const marker = L.marker(coordinates).addTo(this.map)
            .bindPopup(`<b>${resource.equipmentType}</b><br>${resource.location.address}`)
            .openPopup();
        this.map.setView(coordinates, 15, { animate: true });
      }
    },
    initMap() {
      this.map = L.map('map').setView([39.9334, 32.8597], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map);
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #f8f9fa;
}

.table {
  margin-top: 20px;
}

.thead-dark {
  background-color: #343a40;
  color: #fff;
}

.table tbody tr {
  transition: background-color 0.2s;
}

.table tbody tr:hover {
  background-color: #e9ecef;
}

.btn {
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.5);
  border-radius: 20px;
}

.table-responsive {
  overflow-y: auto;
  max-height: 400px;
}

.table-responsive::-webkit-scrollbar {
  width: 6px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background-color: #007bff;
  border-radius: 10px;
}

.table-responsive::-webkit-scrollbar-track {
  background-color: #e0e0e0;
}

#map {
  height: 400px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
</style>
