<template>
  {{route.path}}
</template>

<script setup>
import{useRoute} from "vue-router";
const route=useRoute();
console.log(route.path);//取得網址

</script>

<style>

</style>