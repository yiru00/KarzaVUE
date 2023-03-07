<template>
  <div class="content">
    <h4>我的報名活動</h4>
    <div class="line"></div>
    <button class="linkBtn">
      <RouterLink to="/Record/ActivityEnrolled">未舉辦</RouterLink>
    </button>
    <button class="linkBtn">
      <RouterLink to="/Record/ActivityJoined">已舉辦</RouterLink>
    </button>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView, routerViewLocationKey } from "vue-router";
</script>

<style scoped>
.content {
  padding: 20px 50px;
}
.line {
  height: 1px;
  background-color: #a3a3a3;
}

a {
  text-decoration: none;
  color: #070707;
}
.linkBtn {
  background-color: transparent;
  border: 0px;
  height: 50px;
  width: 80px;
  padding: 0px;
  margin-bottom: 10px;
}
.linkBtn:hover {
  border-bottom: 2px solid #afc7d8;
}
</style>
