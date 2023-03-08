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

    <button>
      <router-link to="/Activity/Search">探索更多活動</router-link>
    </button>
  </div>
</template>

<script>
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

    // getNewSum() {
    //   let carouselarr = [];
    //   let carouselItem = 0;
    //   this.new.forEach((element) => {
    //     carouselarr.push(carouselItem);
    //     carouselItem++;
    //   });
    //   this.carousel = carouselarr;
    // },

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
</style>
