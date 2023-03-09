<template>
  <!-- 呈現內容 component使用-->
  <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="i in 10" :key="i">
    <div class="card cardSize">
      <RouterLink to="Albums/AlbumPhoto" class="w-100 h-100">
        <img
          :src="`https://picsum.photos/500/400?random=${i}`"
          class="card-img-top rounded-bottom"
          alt="Photo 1"
        />
        <div class="albumTitle">相簿名稱</div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.photoGrid {
  margin-top: 230px;
  margin-left: 26px;
  height: 100%;
}
.card img {
  transform: scale(1, 1);
  transition: all 0.5s ease-out;
  object-fit: cover;
  height: 100%;
}

.card img:hover {
  transform: scale(1.2, 1.2);
}

.cardSize {
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: relative;
  float: left;
  transition: 0.5s ease;
  border: 0;
}

.cardSize:hover .albumTitle {
  width: 100%;
  padding: 8px 11px;
  visibility: visible;
  opacity: 1;
}

.albumTitle {
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.6) 81%
  );
  border-radius: 0 0 4px 4px;
  border: 0;
  color: white;
  margin: 0;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: visibility 0s, opacity 0.5s linear;
  transition: visibility 0s, opacity 0.5s linear;
  font-size: 15px;
}
@media (max-width: 1200px) {
  .photoGrid {
    margin: 0;
  }
}
</style>
