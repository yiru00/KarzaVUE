<template>
  <!-- 呈現內容 component使用-->
  <div class="col-12">
    <h3>相簿title</h3>
  </div>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="i in 10" :key="i">
    <div class="card cardSize">
      <!-- <a href="#" class="w-100 h-100"> -->
      <img
        :src="`https://picsum.photos/500/400?random=${i}`"
        class="card-img-top rounded-bottom"
        alt="Photo 1"
      />
      <button class="bookMarkBtn">
        <i class="fa-regular fa-bookmark"></i>
      </button>
      <!-- </a> -->
    </div>
  </div>
</template>

<script></script>

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
  /* margin-right: 10px; */
  transition: 0.5s ease;
  border: 0;
}

.cardSize:hover .bookMarkBtn {
  width: 40px;
  padding: 10px 7px;
  visibility: visible;
  opacity: 1;
}

.bookMarkBtn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    to bottom right,
    transparent 0%,
    rgba(127, 127, 127, 0.6) 81%
  );
  border-radius: 0 0 4px 4px;
  border: 0;
  color: white;
  margin: 0 0px 0px 0;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: visibility 0s, opacity 0.5s linear;
  transition: visibility 0s, opacity 0.5s linear;
  font-size: 20px;
}
@media (max-width: 1200px) {
  .photoGrid {
    margin: 0;
  }
}
</style>
