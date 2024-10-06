<template>
  <div class="col-lg-6 col-md-12 mb-4">
    <div class="card h-100 p-4 card-elevated">
      <div class="card-header bg-primary text-white text-center gradient-header">
        <h5 class="card-title mb-0">Ekipmanların Durumları</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive stylish-table" style="max-height: 400px; overflow-y: auto;">
          <table class="table table-hover table-striped table-bordered">
            <thead class="thead-dark">
            <tr>
              <th>Kaynak Türü</th>
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
                <div class="d-flex flex-column">
                  <button class="btn btn-outline-success btn-sm mb-2" @click="allocateResource(resource)">
                    Tahsis Et
                  </button>
                  <button class="btn btn-outline-primary btn-sm" @click="showLocation(resource)">
                    Konumu Görüntüle
                  </button>
                </div>
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
import MapComponent from '@/components/AdminComponent/MapComponent.vue';

export default {
  components: {
    MapComponent
  },
  data() {
    return {
      resources: []
    };
  },
  created() {
    this.fetchResources();
  },
  methods: {
    fetchResources() {
      axios.get('http://localhost:8080/equipments')
          .then(response => {
            this.resources = response.data;
          })
          .catch(error => {
            console.error('Kaynaklar yüklenemedi:', error);
          });
    },
    allocateResource(resource) {
      axios.put(`http://localhost:8080/equipments/${resource.equipmentId}`, {
        status: 'kullanımda'
      })
          .then(() => {
            alert(`${resource.equipmentType} kaynağı tahsis edildi!`);
            this.fetchResources(); // Tabloyu güncellemek için verileri yenileyin
          })
          .catch(error => {
            console.error('Kaynak tahsisi başarısız oldu:', error);
          });
    },
    showLocation(resource) {
      eventBus.emit('clear-all-markers'); // Önceki pingi temizlemek için olay yayınla
      eventBus.emit('highlight-team-location', {
        coordinates: [resource.location.latitude, resource.location.longitude],
        teamName: resource.equipmentType
      });
      // Haritaya zoomlama işlemini gerçekleştir, fakat tekrar tekrar zoom yapılmaması için kontrol ekle
      eventBus.emit('zoom-to-location', {
        coordinates: [resource.location.latitude, resource.location.longitude],
        zoomLevel: 15 // Özel bir zoom seviyesi ekledik
      });
      // Harita bileşeninin olduğu yere kaydırma işlemi
      const mapElement = document.getElementById('map');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  overflow: hidden;
  background-image: linear-gradient(145deg, #f3f4f7, #ffffff);
}

.card-elevated {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-elevated:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.gradient-header {
  background: linear-gradient(90deg, #4e73df, #224abe);
  padding: 15px;
  font-size: 1.25rem;
}

.stylish-table {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table {
  margin-top: 20px;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

.table th, .table td {
  vertical-align: middle;
  text-align: center;
  padding: 15px;
  border: 1px solid #dee2e6;
  white-space: nowrap;
  font-size: 0.9rem;
}

.table-hover tbody tr:hover {
  background-color: #e9ecef;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f8f9fc;
}

.table-warning {
  background-color: #fff3cd;
}

.table-success {
  background-color: #d4edda;
}

.table-danger {
  background-color: #f8d7da;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  padding: 6px 12px;
  border-radius: 20px;
}

.btn-info:hover {
  background-color: #138496;
  border-color: #117a8b;
}

.animated-button {
  transition: transform 0.2s;
}

.animated-button:hover {
  transform: scale(1.1);
}
</style>

<MapComponent />