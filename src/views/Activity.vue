<template>
  <div>
    <div
      id="newActivity"
      class="carousel slide carousel-fade newActivityCarousel"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <div v-for="index in getNewSum" :key="index">
          <button
            v-if="index == 0"
            type="button"
            data-bs-target="#newActivity"
            class="active"
            aria-current="true"
            :data-bs-slide-to="index"
          ></button>
          <button
            v-else
            type="button"
            data-bs-target="#newActivity"
            :data-bs-slide-to="index"
          ></button>
        </div>
      </div>
      <div class="carousel-inner">
        <div v-for="(item, index) in this.new" :key="index">
          <div
            v-if="index == 0"
            class="carousel-item carouselImg active"
            data-bs-interval="1500"
          >
            <router-link :to="item.route">
              <img :src="item.coverImage" alt="活動圖" />
              <!-- <div class="carousel-caption d-none d-md-block">
                <h5>{{ item.activityName }}</h5>
                <p>{{ item.description.slice(0, 10) }}...</p>
              </div> -->
            </router-link>
          </div>
          <div v-else class="carousel-item carouselImg" data-bs-interval="1500">
            <router-link :to="item.route">
              <img :src="item.coverImage" alt="活動圖" />
              <!-- <div class="carousel-caption d-none d-md-block">
                <h5>{{ item.activityName }}</h5>
                <p>{{ item.description.slice(0, 10) }}...</p>
              </div> -->
            </router-link>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#newActivity"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#newActivity"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div>
      <router-link to="/Activity/Search">探索更多活動</router-link>
    </div>
    <div>
      <div class="container">
        <h3>熱門活動</h3>
        <div class="row gy-4">
          <div
            class="col-lg-4 col-md-6 col-12"
            v-for="(item, index) in popular"
            :key="index"
          >
            <!-- 一張卡 -->
            <div class="popularCard">
              <div class="popularCardBody">
                <div class="info">
                  <img :src="item.coverImage" alt="" />
                  <div class="content">
                    <p class="activityName">{{ item.activityName }}</p>
                    <p class="description">
                      {{ item.description.slice(0, 9) }}...
                    </p>
                  </div>
                </div>
                <div class="progressBar">
                  <div :style="{ width: item.enrolmentRate + '%' }"></div>
                  <!-- <div></div> -->
                </div>
              </div>
              <router-link :to="item.route">
                <div class="arrow">
                  <i class="fa-solid fa-arrow-right-to-bracket fs-4"></i>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import utility from "../../public/utility.js";
export default {
  mixins: [utility],
  data() {
    return {
      new: [],
      popular: [],
      willbeheld: [],
      memberId: 0,
      carousel: [],
    };
  },
  computed: {
    getNewSum() {
      const carousel = [];
      let carouselItem = 0;
      this.new.forEach((element) => {
        carousel.push(carouselItem);
        carouselItem++;
      });
      console.log(carousel);
      return carousel;
    },
  },
  mounted() {
    // this.getMemberId();
    this.getNewActivity();
    // this.getNewSum();
    this.getPopularActivity();
    this.getWillbeheld();
  },
  methods: {
    //#region 取得memberId
    async getMemberId() {
      let id = await this.fetchMemberId();
      this.memberId = id;
    },
    //#endregion
    //#region 取得最新活動（輪播圖用）
    async getNewActivity() {
      fetch("https://localhost:7259/api/Activity/New")
        .then((response) => response.json())
        .then((data) => {
          console.log(`new${data}`);
          this.new = data;
        });
    },
    //#endregion
    //#region 取得熱門活動
    getPopularActivity() {
      fetch("https://localhost:7259/api/Activity/Popular")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.popular = data;
        });
    },
    //#endregion
    //#region 取得即將舉辦活動
    getWillbeheld() {
      fetch("https://localhost:7259/api/Activity/WillBeHeld")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.willbeheld = data;
        });
    },
    //#endregion
  },
  components: { RouterLink },
};
</script>

<style scoped>
.newActivityCarousel {
  height: 80vh;
}

.carouselImg img {
  width: 100%;
  height: 80vh;
  object-fit: cover;
}
.popularCard {
  background-color: #fff;
  height: 170px;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  justify-content: space-between;

  align-items: center;
}
.popularCardBody {
  display: flex;
  flex-direction: column;
  width: 90%;
}
.arrow {
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}
a {
  text-decoration: none;
}
.arrow i {
  color: #444;
}

.info {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.info img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 15px;
  margin-right: 20px;
}
.activityName {
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
  font-size: 18px;
}
.description {
  padding: 0;
  margin: 0;
  color: gray;
  font-size: 14px;
}
.progressBar {
  background-color: #dfd5b9b1;
  height: 8px;
  border-radius: 5px;
  width: 100%;
  margin: 10px 0px;
}
.progressBar div {
  background-color: #e9ca89;
  /* background-color: #6f6144; */
  /* width: 0%; */
  height: 8px;
  border-radius: 5px;
}
</style>
