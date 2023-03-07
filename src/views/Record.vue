<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="d-flex m-5 reordpanel">
    <nav>
      <!-- <h4>我的紀錄</h4> -->
      <ul>
        <h5>官方活動</h5>
        <li><RouterLink to="/ActivitySaved">收藏</RouterLink></li>
        <li><RouterLink to="/ActivityEnrolled">報名</RouterLink></li>
      </ul>
      <ul>
        <h5>商城</h5>
        <li><RouterLink to="">收藏</RouterLink></li>
        <li><RouterLink to="">訂單記錄</RouterLink></li>
      </ul>
    </nav>

    <div class="record">
      
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 992px) {
  .reordpanel {
    flex-direction: column;
    background-color: #fff;
    margin: 0px;
    min-width: 170px;
    border-radius: 10px;
  }
  nav {
    display: flex;
    margin-left: 0px;
    margin: 0px;
    height: 110px;
    min-width: 100%;
    width: 100%;
  }
  .record {
    background-color: #fff;
    padding: 0px;
    border-radius: 0px;
    max-width: 100%;
    min-width: 100%;
    width: 100%;
  }
  ul {
    margin-left: 15px;
    margin-bottom: 0px;
  }
}
.reordpanel {
  display: flex;
  justify-content: center;
 
}
nav {
  margin-right: 80px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  min-width: 170px;
  height: 250px;
}
.record {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 900px;
  height: 100vh;
}
a {
  text-decoration: none;
  color: #444;
}
li {
  list-style-type: none;
}
ul {
  padding: 0px;
  margin-bottom: 15px;
}
</style>
