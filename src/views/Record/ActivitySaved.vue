<template>
  <div>
    <h4>我的收藏活動</h4>
    <hr />
    <div v-show="!isempty && !isloading">
      <div v-for="(items, month) in groupedSave" :key="month">
        <p class="month">{{ month }}</p>
        <div v-for="item in items" :key="item.activityId">
          <router-link :to="item.route">
            {{ item.activityName }}
          </router-link>
        </div>
      </div>
    </div>
    <div v-show="isempty && !isloading">沒有收藏的活動</div>
    <div v-show="isloading" class="image-container">
      <img src="../../assets/Spinner-1s-200px-2.gif" alt="" />
    </div>
  </div>
</template>

<script>
// import { useRouter } from "vue-router";
import utility from "./../../../public/utility.js";

//const route=useRoute();
export default {
  mixins: [utility],
  // setup() {
  //   const router = useRouter();
  //   console.log(router.path); //取得網址
  //   const currentRoute = router.currentRoute.value.path;
  //   console.log(currentRoute);

  //   return {
  //     currentRoute,
  //   };
  // },
  data() {
    return {
      savedData: [],
      isempty: false,
      isloading: true,
    };
  },
  computed: {
    groupedSave() {
      const grouped = {};
      this.savedData.forEach((item) => {
        const month = item.dateOfSave.substring(0, 7);
        if (!grouped[month]) {
          grouped[month] = [];
        }
        grouped[month].push(item);
      });
      return grouped;
    },
  },
  mounted() {
    this.getActivitySaved();
  },
  methods: {
    async getActivitySaved() {
      this.isempty = false;
      this.isloading = true;
      let memberId = await this.fetchMemberId();
      const data = {
        memberId: memberId,
      };

      fetch("https://localhost:7259/api/ActivityRecord/Saved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          this.isloading = false;
          console.log("Success:", data);
          if (data.length == 0) this.isempty = true;
          this.savedData = data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<style scoped>
.image-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.image-container img {
  width: 80%;
  height: auto;
  max-height: 80%;
}
.month {
  padding: 0px;
  margin: 0px;
  margin-bottom: 5px;
  font-size: 15px;
  color: #444;
}
</style>
