<template>
  <div class="container pagebac">
    <!-- 搜尋 -->
    <div class="row">
      <div class="col-12 searchBar">
        <div class="form-floating w-100 h-100">
          <input
            type="text"
            class="form-control searchContent"
            id="floatingSearch"
            placeholder="名字"
            v-model="searchInput"
          />
          <label for="floatingSearch"
            ><i class="fa-solid fa-magnifying-glass"></i> 暱稱</label
          >
        </div>
      </div>
    </div>
    <div class="row gy-4 mb-4">
      <!-- 1張 -->
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 user"
        v-for="i in 10"
        :key="i"
      >
        <RouterLink
          :to="`/Community/PersonalPage/${i}/Photos`"
          class="personlink"
        >
          <div class="rounded-3 p-5 userInfo">
            <!-- Personal information goes here -->
            <div class="userProfile">
              <img
                class="imgPhoto"
                src="https://picsum.photos/500/400?random=1"
                alt=""
              />
              <h5>用戶的暱稱</h5>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const searchInput = ref("");
const allProfile = reactive(Array);
console.log(searchInput.value);
console.log(allProfile);

// axios
//   .get(
//     `https://localhost:7259/api/Profile/GetAllMember?searchInput=${searchInput.value}`
//   )
//   .then((response) => {
//     console.log(response.data);
//     allProfile = response.data;
//     console.log(allProfile);
//   })
//   .catch((error) => console.log(error));
</script>

<style scoped>
.user {
  max-width: 360px;
  display: flex;
  justify-content: center;
}

.userInfo {
  height: 100%;
  /* background-color: #f6fafcf5; */
  background-color: white;
  box-shadow: 0 1px 5px 1px rgba(128, 128, 128, 0.144);
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 360px;
  transition: ease-in-out 0.3s;
}
.userInfo:hover {
  transform: translateY(3%);
  box-shadow: 0 1px 10px 1px rgba(128, 128, 128, 0.301);
}

.userProfile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.imgPhoto {
  border: 3px solid #fff;
  box-shadow: 0 1px 5px rgba(25, 25, 25, 0.15);
  border-radius: 50%;
  height: 100%;
  width: 110px;
  height: 110px;
  margin-bottom: 20px;
}
.personlink {
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: #070707;
}
.searchBar {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 300px;
}
.searchContent {
  border: 0;
  box-shadow: 0 1px 2px rgba(25, 25, 25, 0.15);
}
.searchContent:hover {
  box-shadow: 0 1px 10px rgba(25, 25, 25, 0.15);
}

@media (max-width: 1200px) {
  .user {
    max-width: 100%;
  }
  .userInfo {
    height: fit-content;
    max-width: none;
  }
}
</style>
