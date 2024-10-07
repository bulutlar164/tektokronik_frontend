<template>
  <div v-if="report" class="card mb-3" style="max-width: 800px;">
    <div class="d-flex flex-row">
      <!-- Görüntü Bölümü -->
      <div class="col-md-6 p-2">
        <img
            v-if="report.image && report.image.filePath"
            :src="report.image.filePath"
            alt="Building Image"
            class="card-img"
            style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">
      </div>

      <!-- Detaylar Bölümü -->
      <div class="col-md-6 p-4 d-flex flex-column justify-content-between bordered-section">
        <div class="card-header text-white text-center custom-header">
          <h5 class="card-title mb-0 text-white">{{ report.location.address }}</h5>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <div class="info-label-container">
              <i class="fas fa-exclamation-circle info-icon"></i>
              <span class="info-label">Hasar Durumu:</span>
            </div>
            <span class="info-value">{{ report.buildingStatus }}</span>
          </div>
          <div class="info-item">
            <div class="info-label-container">
              <i class="fas fa-users info-icon"></i>
              <span class="info-label">Muhtemel Nüfus:</span>
            </div>
            <span class="info-value">{{ report.estimatedPeople }}</span>
          </div>
          <div class="info-item">
            <div class="info-label-container">
              <i class="fas fa-boxes info-icon"></i>
              <span class="info-label">Ekipman ve Gıda Durumu:</span>
            </div>
            <span class="info-value">{{ equipmentAvailability }}</span>
          </div>
          <div class="info-item">
            <div class="info-label-container">
              <i class="fas fa-map-marker-alt info-icon"></i>
              <span class="info-label">Toplanma Alanı:</span>
            </div>
            <span class="info-value">{{ gatheringPoint }}</span>
          </div>
          <div class="info-item">
            <div class="info-label-container">
              <i class="fas fa-user-shield info-icon"></i>
              <span class="info-label">Buradaki Ekipler:</span>
            </div>
            <span class="info-value">{{ report.team.teamName }}</span>
          </div>
        </div>
        <button @click="openSweetAlertModal" class="btn btn-outline-success mt-4 w-100 align-self-end">
          Koordinasyonu Sağla
        </button>
      </div>
    </div>
  </div>

  <!-- Yükleniyor Göstergesi -->
  <div v-else class="text-center mt-5">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Yükleniyor...</span>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  name: "LocationPopupComponent",
  data() {
    return {
      report: null,
      teams: [],
      resources: [], // Eklenen kaynakları yönetmek için yeni durum
      equipmentAvailability: "Bilinmiyor", // Varsayılan değer
      gatheringPoint: "Bilinmiyor", // Varsayılan değer
    };
  },
  methods: {
    openSweetAlertModal() {
      this.fetchTeamsAndFoods().then(() => {
        Swal.fire({
          title: 'Koordinasyon Seçimleri',
          html: this.generateModalContent(),
          width: '1000px', // Genişlik 900px olarak artırıldı
          showCancelButton: true,
          confirmButtonText: 'Kaydet',
          cancelButtonText: 'İptal',
          focusConfirm: false,
          customClass: {
            popup: 'swal2-custom-modal',
          },
          didOpen: () => {
            // Ekle butonları için olay dinleyicileri başlatılıyor
            document.getElementById('addResourceButton').addEventListener('click', this.addResource);
            document.getElementById('addEquipmentButton').addEventListener('click', this.addEquipment);

            // Kullanıcıya rehberlik etmek için varsayılan bir kaynak ve ekipman ekleniyor
            this.addResource();
            this.addEquipment();
          },
          preConfirm: () => {
            // Form doğrulaması
            const selectedTeam = Swal.getPopup().querySelector('#teamSelection').value;
            if (!selectedTeam) {
              Swal.showValidationMessage('Lütfen bir takım seçin');
              return false;
            }

            // Ekipmanları toplama
            const equipments = [];
            Swal.getPopup().querySelectorAll('.equipment-item').forEach(element => {
              const equipmentType = element.querySelector('.equipment-type').value;
              const equipmentAmount = element.querySelector('.equipment-amount').value;
              if (equipmentType && equipmentAmount) {
                equipments.push({ type: equipmentType, amount: Number(equipmentAmount) });
              }
            });

            // Kaynakları toplama
            const resources = [];
            Swal.getPopup().querySelectorAll('.resource-item').forEach(element => {
              const resourceType = element.querySelector('.resource-type').value;
              const resourceAmount = element.querySelector('.resource-amount').value;
              if (resourceType && resourceAmount) {
                resources.push({ type: resourceType, amount: Number(resourceAmount) });
              }
            });

            return {
              selectedTeam,
              equipments,
              resources,
            };
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const postData = {
              reportId: this.report.reportId,
              teamId: result.value.selectedTeam,
              equipments: result.value.equipments,
              resources: result.value.resources,
            };
            this.handleSaveCoordination(postData);
          }
        });
      });
    },

    // Yeni bir kaynak ekleme fonksiyonu
    addResource() {
      const container = document.getElementById('resourcesContainer');

      // Yeni bir kaynak satırı oluşturuluyor
      const newResource = document.createElement('div');
      newResource.className = 'row align-items-end mb-3 resource-item';

      newResource.innerHTML = `
        <div class="col-md-5">
          <label class="form-label">Kaynak Türü</label>
          <select class="form-select resource-type" required>
            <option disabled selected value="">Bir kaynak seçin</option>
            <option value="Gıda">Gıda</option>
            <option value="Battaniye">Battaniye</option>
            <option value="İsıtıcı">İsıtıcı</option>
            <option value="İlaç">İlaç</option>
            <option value="Su">Su</option>
            <option value="Çadır">Çadır</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Adet</label>
          <input type="number" class="form-control resource-amount" placeholder="Adet girin" min="1" required />
        </div>
        <div class="col-md-3 text-end">
          <button type="button" class="btn btn-danger remove-resource-btn">Sil</button>
        </div>
      `;

      // Yeni kaynağı konteynıra ekle
      container.appendChild(newResource);

      // Sil butonuna olay dinleyicisi ekle
      newResource.querySelector('.remove-resource-btn').addEventListener('click', () => {
        container.removeChild(newResource);
      });
    },

    // Yeni bir ekipman ekleme fonksiyonu
    addEquipment() {
      const container = document.getElementById('equipmentsContainer');

      // Yeni bir ekipman satırı oluşturuluyor
      const newEquipment = document.createElement('div');
      newEquipment.className = 'row align-items-end mb-3 equipment-item';

      newEquipment.innerHTML = `
        <div class="col-md-5">
          <label class="form-label">Ekipman Türü</label>
          <select class="form-select equipment-type" required>
            <option disabled selected value="">Bir ekipman seçin</option>
            <option value="Ağır Makine (Kepçe)">Ağır Makine (Kepçe)</option>
            <option value="İtfaiye">İtfaiye</option>
            <option value="Ambulans (Sağlık Ekip)">Ambulans (Sağlık Ekip)</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Adet</label>
          <input type="number" class="form-control equipment-amount" placeholder="Adet girin" min="1" required />
        </div>
        <div class="col-md-3 text-end">
          <button type="button" class="btn btn-danger remove-equipment-btn">Sil</button>
        </div>
      `;

      // Yeni ekipmanı konteynıra ekle
      container.appendChild(newEquipment);

      // Sil butonuna olay dinleyicisi ekle
      newEquipment.querySelector('.remove-equipment-btn').addEventListener('click', () => {
        container.removeChild(newEquipment);
      });
    },

    // Modal içeriğini oluşturma fonksiyonu (Bootstrap kartları ile)
    generateModalContent() {
      // Takımlar için seçenekler oluşturuluyor
      const teamsOptions = this.teams
          .map(team => `<option value="${team.teamId}">${team.teamName}</option>`)
          .join('');

      return `
        <form id="resourceEquipmentForm">
          <div class="container-fluid">
            <div class="row">
              <!-- Takımlar Kartı -->
              <div class="col-md-4 mb-3">
                <div class="card h-100">
                  <div class="card-header bg-primary text-white">
                    Takımlar
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <label for="teamSelection" class="form-label">Takım Seçin</label>
                      <select id="teamSelection" class="form-select" required>
                        <option disabled selected value="">Bir takım seçin</option>
                        ${teamsOptions}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Ekipmanlar Kartı -->
              <div class="col-md-4 mb-3">
                <div class="card h-100">
                  <div class="card-header bg-primary text-white">
                    Ekipmanlar
                  </div>
                  <div class="card-body">
                    <div id="equipmentsContainer">
                      <!-- Dinamik olarak eklenen ekipmanlar burada görünecek -->
                    </div>
                    <button type="button" id="addEquipmentButton" class="btn btn-outline-success mt-2 w-100">Ekipman Ekle</button>
                  </div>
                </div>
              </div>

              <!-- Kaynaklar Kartı -->
              <div class="col-md-4 mb-3">
                <div class="card h-100">
                  <div class="card-header bg-primary text-white">
                    Kaynaklar
                  </div>
                  <div class="card-body">
                    <div id="resourcesContainer">
                      <!-- Dinamik olarak eklenen kaynaklar burada görünecek -->
                    </div>
                    <button type="button" id="addResourceButton" class="btn btn-outline-success mt-2 w-100">Kaynak Ekle</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      `;
    },

    // Rapor verisini çekme fonksiyonu
    fetchReport() {
      fetch('http://localhost:8080/reports/1') // Uygun reportId ile değiştirin
          .then(response => {
            if (!response.ok) {
              throw new Error('Rapor verisi alınamadı');
            }
            return response.json();
          })
          .then(data => {
            this.report = data;
            this.mapAdditionalFields();
          })
          .catch(error => {
            console.error('Hata:', error);
          });
    },

    // Takımları ve yiyecekleri çekme fonksiyonu
    fetchTeamsAndFoods() {
      return fetch('/api/teams')
          .then(res => res.json())
          .then(teamsData => {
            this.teams = teamsData;
          })
          .catch(error => {
            console.error('Takımlar çekilirken hata:', error);
          });
    },

    // Koordinasyonu kaydetme fonksiyonu
    handleSaveCoordination(postData) {
      fetch('/api/save-coordination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('Koordinasyon verisi kaydedilemedi');
            }
            return response.json();
          })
          .then(data => {
            console.log('Veri kaydedildi:', data);
            Swal.fire('Başarılı', 'Koordinasyon başarıyla kaydedildi.', 'success');
          })
          .catch(error => {
            console.error('Hata:', error);
            Swal.fire('Hata', 'Koordinasyon kaydedilirken bir hata oluştu.', 'error');
          });
    },

    // Ek alanları haritalama fonksiyonu
    mapAdditionalFields() {
      this.equipmentAvailability = this.report.reportEquipments && this.report.reportEquipments.length > 0
          ? this.report.reportEquipments.map(eq => eq.equipmentName).join(', ')
          : 'Ekipman yok';

      this.gatheringPoint = this.report.gatheringPoint || 'Belirtilmemiş';
    }
  },
  mounted() {
    this.fetchReport();
  }
};
</script>

<style scoped>
/* Kart ve içerik düzeni için stiller */
.form-group {
  margin-bottom: 20px;
}

.btn-secondary {
  margin-left: 10px;
}

/* Gradient Başlık */
.custom-header {
  background: #2F56C8;
  border-radius: 15px 15px 0 0;
  padding: 15px;
}

/* Bilgi Grid Stili */
.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  margin-top: 10px;
}

/* Bilgi Öğesi Stili */
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.info-item:hover {
  background-color: #e9f2ff;
}

.info-label-container {
  display: flex;
  align-items: center;
}

.info-icon {
  margin-right: 10px;
  color: #4e73df;
  font-size: 20px;
}

.info-label {
  font-weight: 600;
  color: #495057;
}

.info-value {
  font-size: 15px;
  font-weight: 500;
  color: #2d98da;
  background: #dff9fb;
  padding: 8px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Buton Stilleri */
.btn-outline-success {
  border-color: #38ada9;
  color: #38ada9;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-success:hover {
  background-color: #38ada9;
  color: #fff;
  box-shadow: 0 8px 20px rgba(56, 173, 169, 0.3);
}

.card-title {
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 1px;
}

/* Yükleniyor Göstergesi Stili */
.spinner-border {
  width: 3rem;
  height: 3rem;
}

/* SweetAlert2 Özel Stilleri */
.swal2-custom-modal {
  padding: 20px !important;
}

.swal2-custom-modal .card-header {
  font-size: 16px;
  text-align: center;
}

.swal2-custom-modal .card {
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.swal2-custom-modal .btn {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .swal2-custom-modal {
    width: 100% !important;
  }
}
</style>
