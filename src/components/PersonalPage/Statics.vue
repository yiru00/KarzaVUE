<template>
  <div class="col-12 staticsBtns">
    <RouterLink :to="{ name: 'dateViews' }" class="userLink">7天總瀏覽</RouterLink>
    <RouterLink :to="{ name: 'cameraUse' }" class="userLink">最高瀏覽照片</RouterLink>
    <RouterLink :to="{ name: 'topPhotoViews' }" class="userLink">相機使用率</RouterLink>
  </div>
  <RouterView></RouterView>
</template>

<script setup>

</script>
<style scoped>
.staticsBtns a{
  text-decoration: none;
}
.userLink {
  width: 80px;
  height: 40px;
  border: 0px;
  text-align: center;
  text-decoration: none;
  color: #575d6d;
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
</style>
