<template>
  {{ currentRoute }}
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
  data(){
    return{
      savedData:[],
      
    }
  }
};
</script>

<style></style>
