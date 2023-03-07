<template>
  <div>
    <div v-show="!isempty && !isloading">{{ this.enrolledData }}</div>
    <div v-show="isempty && !isloading">沒有報名的活動</div>
    <div v-show="isloading" class="image-container">
      <img src="../../assets/Spinner-1s-200px-2.gif" alt="" />
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import utility from "./../../../public/utility.js";

//const route=useRoute();
export default {
  mixins: [utility],
  setup() {
    const router = useRouter();
    console.log(router.path); //取得網址
    const currentRoute = router.currentRoute.value.path;
    console.log(currentRoute);

    return {
      currentRoute,
    };
  },
  data() {
    return {
      enrolledData: [],
      isempty: false,
      isloading: true,
    };
  },
  mounted() {
    this.getActivityEnrolled();
  },
  methods: {
    async getActivityEnrolled() {
      this.isempty = false;
      this.isloading = true;
      let memberId = await this.fetchMemberId();
      const data = {
        memberId: memberId,
      };

      fetch("https://localhost:7259/api/ActivityRecord/Enrolled", {
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
          this.enrolledData = data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<style>
.image-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.image-container img {
  width: 80%; /* 可根据需要进行调整 */
  height: auto;
  max-height: 80%; /* 可根据需要进行调整 */
}
</style>
