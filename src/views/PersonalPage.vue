<template>
  <!-- Cover image -->
  <div class="bag">
    <!-- Personal information overlay -->
    <div class="about">
      <h4 class="text-light">關於</h4>
      <p class="text-light">
        {{ memberProfile.about }}
      </p>
    </div>
  </div>

  <!-- Two-column layout -->
  <div class="container-fluid">
    <div class="d-flex justify-content-center">
      <div class="p-4 content">
        <!-- 人 -->
        <div class="col-xl-3 col-lg-12 user">
          <div class="userInfo">
            <!-- Personal information goes here -->
            <div class="userText">
              <div class="userProfile">
                <img
                  v-if="memberProfile.source != null"
                  class="imgPhoto mb-3 mb-sm-3 me-md-3 me-xl-0 mb-lg-2"
                  :src="memberProfile.source"
                  :alt="memberProfile.source"
                />
                <img
                  v-else
                  class="imgPhoto mb-3 mb-sm-3 me-md-3 me-xl-0 mb-lg-2"
                  src="../assets/userPic.png"
                  alt="1"
                />
                <p class="fs-5 m-0">{{ memberProfile.name }}</p>
                <!-- <p>{{ memberProfile }}</p> -->
              </div>

              <div class="userBtn">
                <button class="followBtn">追蹤</button>
                <button class="followerBtns">追蹤中</button>
                <button class="followerBtns">粉絲數</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Photos grid 相片相簿統計呈現 -->
        <div class="col-xl-9 gy-4 col-lg-12 photoGrid">
          <div class="row gy-4">
            <!-- 選單 切換component-->
            <div class="col-12 userLinkGroup">
              <RouterLink
                :to="`/Community/PersonalPage/${memberId}/Photos`"
                class="userLink"
                >相片</RouterLink
              >
              <RouterLink
                :to="`/Community/PersonalPage/${memberId}/Albums`"
                class="userLink"
                >相簿</RouterLink
              >
              <RouterLink
                :to="`/Community/PersonalPage/${memberId}/Collections`"
                class="userLink"
                >收藏</RouterLink
              >
              <div class="dropdown">
                <button
                  role="button"
                  class="userLink dropdown-toggle toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <RouterLink
                    :to="`/Community/PersonalPage/${memberId}/Statics/DateViews`"
                    class="link"
                    >統計</RouterLink
                  >
                </button>
                <ul class="dropdown-menu staticBtnGroup">
                  <li>
                    <RouterLink
                      :to="`/Community/PersonalPage/${memberId}/Statics/DateViews`"
                      >7天總瀏覽</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="`/Community/PersonalPage/${memberId}/Statics/CameraUse`"
                      >相機使用率</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="`/Community/PersonalPage/${memberId}/Statics/TopPhotoViews`"
                      >最高瀏覽照片</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </div>

            <!-- 呈現內容 component使用-->
            <RouterView></RouterView>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const memberId = route.params.memberId;
const memberProfile = ref();

console.log(memberId);
axios({
  method: "GET",
  url: `https://localhost:7259/api/Photo/GetProfile?memberId=${memberId}`,
})
  .then((response) => {
    memberProfile.value = response.data;

    console.log(memberProfile);
  })
  .catch((error) => console.log(error));
</script>

<style scoped>
.toggle {
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.link {
  z-index: 1;
  text-decoration: none;
  color: #444444;
  padding: 8px;
  width: 100%;
  text-align: center;
}
.bag {
  background-color: #afc7d8;
  width: 100%;
  height: 290px;
}

.imgPhoto {
  border-radius: 50%;
  width: 110px;
  height: 110px;
}

.about {
  position: relative;
  left: 25%;
  top: 43%;
  word-wrap: break-word;
  max-width: 70%;
}

.followBtn {
  width: 100px;
  height: 45px;
  background-color: rgb(252, 233, 189);
  border: 2px solid #f6fafcf1;
  border-radius: 50px;
  margin-top: 12px;
}

.followBtn:hover {
  background-color: rgb(255, 250, 239);
  color: rgb(187, 140, 32);
  border: 2px solid rgb(252, 233, 189);
  transition: 0.3s;
}

.followerBtns {
  margin-top: 10px;
  transition: 0.3s;
  border-radius: 50px;
  width: 90px;
  height: 45px;
  background-color: #f6fafcf1;
  border: 1px solid #afc7d8;
}

.followerBtns:hover {
  background-color: white;
  border: 0;
  color: #afc7d8;
}

.content {
  position: relative;
  /* z-index: 1; */
  margin-top: -240px;
  /* background-color: #f6fafcf1; */
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.user {
  max-width: 360px;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 80px;
  /* left: 10px; */
  height: 100%;
}

.userInfo {
  height: 100%;
  background-color: #f6fafcf1;
  height: 481px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 360px;
  padding: 50px;
  border-radius: 10px;
}

.userText {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.userProfile,
.userBtn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.userLink {
  width: 80px;
  height: 40px;
  border: 0px;
  text-align: center;
  text-decoration: none;
  color: #444444;
  border-bottom: 1.5px solid #afc7d8;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
.userLink:hover {
  transition: 0.3s ease-in-out;
  border-radius: 15px;
  background-color: #dbe5e1eb;
  color: #444444;
}
.userLink.router-link-active,
.link.router-link-active {
  border-radius: 15px;
  background-color: #dbe5e1eb;
  color: #444444;
  border: 0;
}

.staticBtnGroup li .router-link-active {
  background-color: #dbe5e1eb;
  color: #444444;
}

.staticBtnGroup li:hover {
  background-color: #b6cac2eb;
}

.staticBtnGroup li {
  display: flex;
  justify-content: center;
}
.staticBtnGroup li a {
  text-decoration: none;
  color: #444444;
  width: 100%;
  text-align: center;
}

.userLinkGroup {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.photoGrid {
  margin-top: 230px;
  margin-left: 26px;
  height: 100%;
}

@media (max-width: 1200px) {
  .content {
    flex-direction: column;
    margin-top: 0;
  }

  .photoGrid {
    margin: 0;
  }

  .about {
    max-width: 90%;
    top: -10%;
    left: 0%;
  }

  .user {
    max-width: 100%;
    position: relative;
    top: 0;
  }

  .userText {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .userInfo {
    height: fit-content;
    max-width: none;
  }

  .followBtn,
  .followerBtns {
    margin-top: 0;
    margin-left: 10px;
  }

  .about {
    margin: 0;
    padding: 55px;
  }

  .userProfile {
    display: flex;
    flex-direction: row;
    /* min-width: 250px;  */
  }

  .userBtn {
    display: flex;
    flex-direction: row;
  }

  .userLinkGroup {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .userLink,
  .staticBtn {
    margin-top: 20px;
    margin-right: 0px;
  }

  .AllCollect {
    margin-top: 20px;
    margin-right: 0px;
  }
}

@media (max-width: 768px) {
  .userBtn {
    display: flex;
    flex-direction: column;
  }

  .userText {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .followBtn {
    margin-top: 25px;
  }
  .followerBtns {
    margin-top: 10px;
  }

  .userProfile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
