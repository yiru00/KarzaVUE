<template>
  {{activityId}}
</template>

<script setup>
import{useRoute} from "vue-router";
const route=useRoute();
let activityId=route.path.slice(10)
console.log(activityId);//取得網址

</script>

<style>

</style>