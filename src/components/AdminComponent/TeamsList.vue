<template>
  <div class="card p-4 card-elevated main-card">
    <div class="card-header bg-primary text-white text-center gradient-header">
      <h5 class="card-title mb-0">Ekipler</h5>
    </div>
    <div class="teams-container"> <!-- Scroll ve boyut için container -->
      <div class="teams-grid">
        <div class="team-card" v-for="team in teams" :key="team.id">
          <div
              class="card team-card-content"
              :class="{
              'available-card': team.status === 'uygun',
              'busy-card':
                team.status === 'meşgul' || team.status === 'müsait değil'
            }"
          >
            <div class="card-body">
              <h6 class="card-title team-name">
                <i class="fas fa-users mr-2" style="color: #007bff;"></i>
                {{ team.teamName }}
                <!-- Eğer takım status 'uygun' ise onay işareti ekliyoruz -->
                <span v-if="team.status === 'uygun'" class="available-icon">
                  <i
                      class="fas fa-check-circle available-icon-inner"
                      style="color: green; margin-left: 8px;"
                  ></i>
                </span>
              </h6>
              <p class="card-text">
                <span class="label">Görev Yeri:</span> {{ team.assignedRegion
                }}<br />
                <span class="label">Toplam Kapasite:</span> {{ team.capacity
                }}<br />
                <span class="label">Uygunluk:</span> {{ team.status }}
              </p>
            </div>
            <!-- Kartın altına butonları yerleştiriyoruz -->
            <div class="card-footer">
              <button
                  class="btn btn-outline-primary btn-block"
                  @click="showTeamLocation(team)"
              >
                Haritada Gör
              </button>
              <button
                  class="btn btn-outline-success btn-block mt-2"
                  @click="assignTeam(team)"
              >
                Yönlendir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import eventBus from '@/eventBus'; // EventBus ile harita iletişimi için

export default {
  name: 'TeamsList',
  data() {
    return {
      teams: [], // Veriler backend'den yüklenecek
    };
  },
  mounted() {
    this.fetchTeams(); // Sayfa yüklendiğinde ekipleri backend'den çek
  },
  methods: {
    fetchTeams() {
      axios
          .get('http://localhost:8080/api/emergency-teams')
          .then((response) => {
            this.teams = response.data.map((team) => ({
              id: team.teamId, // Konsolda 'teamId' anahtarı kullanılıyor
              teamName: team.teamName,
              capacity: team.capacity,
              status: team.status, // 'uygun' veya başka değerler olabilir
              assignedRegion: team.assignedRegion,
              currentLocation: [
                team.currentLocation.latitude, // Enlem
                team.currentLocation.longitude, // Boylam
              ],
            }));
          })
          .catch((error) => {
            console.error('Ekipler yüklenirken bir hata oluştu:', error);
          });
    },
    showTeamLocation(team) {
      // EventBus ile MapComponent'e ekibin ismini ve konumunu gönderiyoruz
      eventBus.emit('highlight-team-location', {
        coordinates: team.currentLocation,
        teamName: team.teamName,
      });
    },
    assignTeam(team) {
      alert(`${team.teamName} ekibi yönlendirildi!`);
    },
  },
};
</script>

<style scoped>
.main-card {
  /* İsteğe bağlı: Kartın maksimum yüksekliğini belirleyin */
  max-height: 80vh; /* Gerekirse bu değeri ayarlayın */
  /* İsteğe bağlı: Genişlik veya diğer boyut ayarları */
  /* width: 90%; */
  /* margin: auto; */
}

.teams-container {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  height: 32vh; /* Yüksekliği azalttık */
  overflow-y: auto; /* İçerik taşarsa scroll bar ekler */
  scrollbar-width: thin; /* Scroll bar genişliğini ince yapar */
  scrollbar-color: #007bff #e0e0e0; /* Scroll barın rengi */
}

.teams-grid {
  display: flex;
  flex-wrap: wrap;
  height: 28vh; /* Yüksekliği azalttık */
  gap: 15px; /* Kartlar arası boşluk */
}

.team-card {
  flex: 1 0 calc(33.333% - 10px); /* 3 sütun olacak şekilde genişlik */
  max-width: calc(33.333% - 10px); /* Kart genişliği sabitlendi */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.team-card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Butonun en alta yerleşmesi için */
  height: 100%; /* Kartın tam yüksekliği */
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.team-card-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.available-card {
  box-shadow: 0 0 10px rgba(47, 166, 30, 0.56); /* "uygun" durumunda yeşil gölge */
}

.busy-card {
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5); /* "meşgul" veya "müsait değil" durumunda kırmızı gölge */
}

.card-body {
  padding: 15px;
}

.team-name {
  font-size: 1.2rem; /* Ekip ismini daha belirgin hale getiriyoruz */
  font-weight: bold;
  color: #333;
}

.card-text {
  font-size: 0.9rem; /* İçerik yazı boyutu */
  color: #555;
}

.label {
  font-weight: bold;
  color: #007bff; /* Öne çıkarmak için mavi ton */
}

.card-footer {
  padding: 10px 15px;
  margin-top: auto; /* Butonun her zaman kartın en altında yer alması için */
}

.card-footer button {
  width: 100%; /* Butonları aynı boyutta yapıyoruz */
}

.btn-block {
  width: 100%; /* Butonların tam genişlikte olmasını sağlıyoruz */
}

.btn-outline-primary,
.btn-outline-success {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid;
  border-radius: 4px;
  background-color: transparent;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.btn-outline-success:hover {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

.available-icon {
  display: inline-grid;
  align-items: center;
  margin-left: 8px;
}

.available-icon-inner {
  display: inline-block;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .team-card {
    flex: 1 0 100%; /* Daha küçük ekranlarda tek sütun */
    max-width: 100%;
  }
}

/* Scrollbar stili */
.teams-container::-webkit-scrollbar {
  width: 6px; /* İnce bir scrollbar genişliği */
}

.teams-container::-webkit-scrollbar-thumb {
  background-color: #007bff; /* Scrollbar rengi */
  border-radius: 10px;
}

.teams-container::-webkit-scrollbar-track {
  background-color: #e0e0e0; /* Scrollbar arka planı */
}

/* Başlık için stil */
.gradient-header {
  background: linear-gradient(90deg, #4e73df, #224abe);
  padding: 15px;
  font-size: 1.25rem;
  color: white;
  border-radius: 8px 8px 0 0;
}
</style>
