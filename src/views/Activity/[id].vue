<template>
  <!-- {{ data.activityId }} -->
  <div class="detailpage">
    <div class="row justify-content-center m-4">
      <div class="col-12 col-md-6" id="activityimg">
        <img class="coverImage" :src="details.coverImage" alt="" />
      </div>
      <div class="col-12 col-md-6" id="activityinfo">
        <p class="activityName">{{ details.activityName }}</p>
        <p>拍攝類型：{{ details.categoryName }}</p>
        <p>建議器材：{{ details.recommendation }}</p>
        <p>活動時間：{{ details.gatheringTime }}</p>
        <p>
          集合地點：<span id="destination">{{ details.address }}</span>
        </p>
        <p>
          活動名額：{{ details.memberLimit }}人 剩餘{{
            details.memberLimit - details.numOfEnrolment
          }}人
        </p>
        <p>報名截止日：{{ details.deadline }}</p>
        <div class="buttonList mt-2">
          <!-- v-if -->
          <button class="saveBtn1">
            <i class="fa-regular fa-bookmark"></i>
          </button>
          <!-- v-if -->
          <button class="enrollBtn1">報名活動</button>
        </div>
      </div>
    </div>

    <div class="row justify-content-center m-4">
      <div class="col-12 col-md-6">
        <h5>活動說明</h5>
        <div id="description">
          {{ details.activityDescription }}
        </div>
      </div>
      <div class="col-12 col-md-6">
        <h5>講師資訊</h5>
        <div
          id="instructorCard"
          class="d-flex justify-content-center align-items-center"
        >
          <div class="instructorCard">
            <div
              class="instructorPhoto d-flex justify-content-center align-items-center"
            >
              <img
                :src="details.resumePhoto"
                alt=""
                referrerpolicy="no-referrer"
              />
            </div>
            <div
              class="instructorInfo d-flex flex-column justify-content-around align-items-center"
            >
              <p class="instrutorName">{{ details.instructorName }}</p>
              <p class="instructorDes">{{ details.instructorDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center m-4">
      <div class="col">
        <h5>查看路線</h5>
        <div class="d-flex justify-content-between">
          <div id="floating-panel">
            <label for="mode">移動方式：</label>
            <select v-model="map.selectedMode" id="mode" class="mode">
              <option value="DRIVING">開車</option>
              <option value="WALKING">走路</option>
              <option value="BICYCLING">腳踏車</option>
              <option value="TRANSIT">大眾運輸</option>
            </select>
            <label for="origin">出發地點：</label>
            <input v-model="map.destination" type="text" id="origin" class="origin"  />
          </div>
          <span class="routes"></span>
        </div>
        <div id="map"></div>
      </div>
    </div>

    <div class="row justify-content-center m-4">
      <div class="col">
        <h5>問與答</h5>

        <div class="QandA" id="question">

        </div>

        <div class="askInput d-flex mt-4">
          <textarea
            name="content"
            id="askcontent"
            class="askContent"
            maxlength="300"
            placeholder="提出和此活動有關的問題！"
          ></textarea>

          <button class="askBtn" id="ask">發問</button>
        </div>
        <p class="qerromsg"></p>
      </div>
    </div>

    <div class="row justify-content-center m-4">
      <div class="col" id="sameCategory">
        <!-- <div>
                <h5>同類型推薦</h5>
              </div>
              <div class="row justify-content-between" id="sameCategoryCard">
                <div class="col-12 col-sm-6 col-md-4 col-xl-3">col</div>
                <div class="col-12 col-sm-6 col-md-4 col-xl-3">col</div>
                <div class="col-12 col-sm-6 col-md-4 col-xl-3">col</div>
                <div class="col-12 col-sm-6 col-md-4 col-xl-3">col</div>
              </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { reactive } from "vue";
// import { ref } from "vue";
// const route = useRoute();
// let activityId = route.path.slice(10);
// console.log(activityId); //取得網址
export default {
  setup() {
    const route = useRoute();
    let getId = route.path.slice(10);
    console.log(getId); //取得網址
    const data = reactive({
      activityId: route.path.slice(10),
    });

    return { data };
  },
  data() {
    return {
      details: {},
      map:{
        selectedMode:"DRIVING",
        destination:" ",
      },
      saveStatus: {},
      enrollStatus: {},
    };
  },
  mounted() {
    console.log(this.data.activityId);

    this.fetchDetails();
    this.initMap();
    //this.calculateAndDisplayRoute(directionsService, directionsRenderer)
  },
  methods: {
    async fetchDetails() {
      let activityId = this.data.activityId;
      let response = await fetch(
        "https://localhost:7259/api/Activity/Details/?activityId=" + activityId
      );
      let details = await response.json();

      console.log(details);
      this.details = details;
      
    },
    
    initMap() {
      // 載入路線服務與路線顯示圖層
      const directionsRenderer = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();

      // 初始化地圖
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 23.5, lng: 121 },
      });

      directionsRenderer.setMap(map);
      this.calculateAndDisplayRoute(directionsService, directionsRenderer);



      document
        .getElementById("floating-panel")
        .addEventListener("change", () => {
          this.calculateAndDisplayRoute(directionsService, directionsRenderer);
        });
      
    },
    calculateAndDisplayRoute(directionsService, directionsRenderer) {
      // const selectedMode = document.querySelector("#mode").value;
      // let origin = document.querySelector("#origin").value;
      //const destination = document.querySelector("#destination").textContent;
      const destination = this.map.destination
      let selectedMode=this.map.selectedMode
      let origin=this.details.address
      //let destination = $("#destination").text();

      // 繪製路線
      directionsService
        .route({
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode[selectedMode],
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
          let legs = response.routes[0]["legs"][0];
          console.log(legs);
          let distance = legs.distance.text;
          let duration = legs.duration.text;
          console.log(distance, duration);
          document.querySelector(
            ".routes"
          ).innerText = `距離${distance}，花費${duration}`;
        })
        .catch((e) =>
          console.log("Directions request failed due to " + status)
        );
    },
    
  },
};
</script>

<style scoped>
.detailpage {
  background-color: #fff;
  width: 95%;
  border-radius: 15px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

h5 {
  text-decoration: 4px underline #afc7d8;
  margin-bottom: 30px;
  font-size: 22px;
}
p {
  margin: 1px;
}

/* 問與答 */
.askInput {
  border: 2px solid #afc7d8;
  border-radius: 15px;
}
.askContent {
  margin: 4px;
  resize: none;
  width: 100%;
  border: 0px;
}
.askContent:focus {
  outline: none; /* 外框效果 */
  box-shadow: none;
}
.askBtn {
  border: 0px;
  width: 60px;
  background-color: transparent;
  border-left: 2px solid #afc7d8;
}
.quser {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
}
.qcontent {
  display: inline-block;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: #fcf7f0;
}
.date {
  color: #686868;
  margin-top: 3px;
  font-size: 14px;
}
.QAlist {
  padding: 10px;
  border-bottom: 1px solid #fcf7f0;
}
.acontent {
  border-radius: 10px;
  word-wrap: break-word;
}
.qerromsg {
  color: #d39899;
}
.deleteQcontent {
  background-color: transparent;
  border: 0px;
  width: fit-content;
  height: fit-content;
}
.deleteQcontent i {
  font-size: 14px;
  color: #d39899;
}

/* 講師card */
.instructorPhoto img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #fcf7f0;
  object-fit: cover;
}
.instructorCard {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #fcf7f0;
  border-radius: 10px;
  padding: 15px;
}
.instrutorName {
  font-size: 20px;
  color: #8991a9;
  margin-bottom: 20px;
}

/* 活動圖、活動資訊 */
#activityinfo {
  height: 350px;
  line-height: 40px;
  margin-top: 20px;
}
#activityimg {
  height: 350px;
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
}
.coverImage {
  width: 100%;
  height: 350px;
  object-fit: cover;
  flex-shrink: 1;
}

.activityName {
  border: 10px;
  font-size: 22px;
}

@media (max-width: 767px) {
  #activityinfo {
    height: fit-content;
    line-height: 30px;
  }
  #activityimg {
    height: fit-content;
    margin-bottom: 20px;
  }
  .coverImage {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}

/* 收藏按鈕 */
.saveBtn,
.saveBtn1,
.unsaveBtn {
  background-color: transparent;
  border: 0px;
  width: fit-content;
  height: fit-content;
}
.saveBtn i,
.saveBtn1 i,
.unsaveBtn i {
  font-size: 25px;
  color: #e9ca89;
}
.unenrollBtn,
.enrollBtn,
.enrollBtn1 {
  height: 40px;
  margin-left: 20px;
  background-color: transparent;
  color: #8991a9;
  border: 1.5px solid #8991a9;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
}
.unenrollBtn,
.enrollBtn {
  height: 40px;
  margin-left: 20px;
  background-color: #8991a9;
  color: #fff;
  border: 0px;
  border-radius: 10px;
}

.buttonList {
  display: flex;
  align-items: center;
}

#description {
  margin-bottom: 20px;
}

/* 同類型推薦 */
.sameList {
  display: flex;
  border-radius: 10px;
  border: 1px solid #fcf7f0;
  margin-bottom: 10px;
}
.sameInfo {
  padding: 5px;
}
.sameImg {
  width: 100px;
  height: 100px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  margin-right: 5px;
  object-fit: cover;
}
.sameLink {
  text-decoration: none;
}
.ellipsis {
  color: gray;
}
.samedate i {
  width: 16px;
  color: #444444;
  margin-right: 10px;
}

/* 地圖 */
#map {
  height: 400px; /* The height is 400 pixels */
  width: 100%; /* The width is the width of the web page */
  border-radius: 10px;
}

.mode,
.origin {
  outline: none;
  box-shadow: none;
  border: 0px;
}
</style>
