<template>
  <div>
    <!-- 輪播圖 -->
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
        <div v-for="(item, index) in this.newActivity" :key="index">
          <div
            v-if="index == 0"
            class="carousel-item carouselImg active"
            data-bs-interval="1500"
          >
            <router-link :to="'/Activity/' + item.activityId">
              <img :src="item.coverImage" alt="活動圖" />
              <!-- <div class="carousel-caption d-none d-md-block">
                <h5>{{ item.activityName }}</h5>
                <p>{{ item.description.slice(0, 10) }}...</p>
              </div> -->
            </router-link>
          </div>
          <div v-else class="carousel-item carouselImg" data-bs-interval="1500">
            <router-link :to="'/Activity/' + item.activityId">
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

    <!-- 介紹 -->
    <div class="infoDiv">
      <div class="container justify-content-center align-items-center">
        <div class="row justify-content-center align-items-center p-4">
          <div class="h500 col-12 col-lg-4">1</div>
          <div class="h500 col-12 col-lg-4">2</div>
          <div class="h500 col-12 col-lg-4">3</div>
        </div>
      </div>
    </div>

    <!-- ｓｗｉｐｅｒ -->
    <div class="swiperDiv">
      <div class="container">
        <p class="h4">熱門活動</p>
        <!-- @swiper="onSwiper"
        @slideChange="onSlideChange" -->
        <swiper
          :modules="modules"
          :breakpoints="swiperOptions.breakpoints"
          :scrollbar="{ draggable: true }"
          id="mySlider"
        >
          <swiper-slide v-for="(item, index) in popular" :key="index"
            ><div class="popularCard">
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
              <router-link :to="`/Activity/${item.activityId}`">
                <div class="arrow">
                  <i class="fa-solid fa-arrow-right-to-bracket fs-4"></i>
                </div>
              </router-link></div
          ></swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- 更多活動 -->
    <div class="searchDiv">
      <div class="searchContent">
        <router-link to="/Activity/Search" class="searchActivity"
          >探索更多活動 <i class="fa-solid fa-magnifying-glass"></i
        ></router-link>
      </div>
    </div>
  </div>
</template>

<script>
//import { RouterLink } from "vue-router";
// import Swiper core and required modules
import { Scrollbar } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/scrollbar";
import utility from "../../public/utility.js";
export default {
  mixins: [utility],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    // const onSwiper = (swiper) => {
    //   console.log(swiper);
    // };
    // const onSlideChange = () => {
    //   console.log("slide change");
    // };

    return {
      // onSwiper,
      // onSlideChange,
      modules: [Scrollbar],
    };
  },
  data() {
    return {
      newActivity: [],
      popular: [],
      // willbeheld: [],
      memberId: 0,
      carousel: [],
      swiperOptions: {
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          576: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },

          1200: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
      },
    };
  },
  computed: {
    getNewSum() {
      const carousel = [];
      let carouselItem = 0;
      this.newActivity.forEach((element) => {
        carousel.push(carouselItem);
        carouselItem++;
      });
      console.log(carousel);
      return carousel;
    },
  },
  mounted() {
    this.scrollToTop();
    this.getNewActivity();
    this.getPopularActivity();
    // this.getWillbeheld();
  },
  methods: {
    //#region 取得memberId
    async getMemberId() {
      let id = await this.fetchMemberId();
      this.memberId = id;
    },
    //#endregion

    //#region 取得最新活動（輪播圖用）
    getNewActivity() {
      fetch("https://localhost:7259/api/Activity/New")
        .then((response) => response.json())
        .then((data) => (this.newActivity = data));
    },
    //#endregion

    //#region 取得熱門活動
    async getPopularActivity() {
      fetch("https://localhost:7259/api/Activity/Popular")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.popular = data;
        });
    },
    //#endregion

    //#region 取得即將舉辦活動
    // getWillbeheld() {
    //   fetch("https://localhost:7259/api/Activity/WillBeHeld")
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //       this.willbeheld = data;
    //     });
    // },
    //#endregion
  },
  // components: { RouterLink },
};
</script>

<style scoped>
.h500 {
  height: 500px;
}
.h4 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

/* 輪播圖 start*/
.newActivityCarousel {
  height: 80vh;
}

.carouselImg img {
  width: 100%;
  height: 80vh;
  object-fit: cover;
}

/* 輪播圖 end*/

/* 熱門活動卡片 start */
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
  background-color: #8991a930;
  height: 8px;
  border-radius: 5px;
  width: 100%;
  margin: 10px 0px;
}
.progressBar div {
  background-color: #8991a9;
  height: 8px;
  border-radius: 5px;
}

/* 熱門活動卡片 end */

.infoDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  /* background-color: #fff; */
}
.swiperDiv {
  /* background-color: #a6b6b0; */
  height: 450px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.searchDiv {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;

  /* height: 400px; */
  /* background-color: #fff; */
}
.searchDiv:before {
  content: " ";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background-image: url("../assets/pexels-mati-mango-6344884.jpg");
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
}
.searchContent {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}
.searchActivity {
  height: 100px;
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  color: #444;
  font-size: 24px;
  text-align: center;
  background: linear-gradient(
    to right,
    #fcf7f0d7 50%,
    rgba(255, 255, 255, 0.565) 50%
  );
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all 0.5s ease-out;
}

.searchActivity:hover {
  background-position: left bottom;
}
.searchActivity i {
  color: #444;
}
</style>
