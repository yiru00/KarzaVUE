<template>
  <!-- 呈現內容 component使用-->
  <div class="col-12">
    <h3>相簿title</h3>
  </div>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="i in 10" :key="i">
    <div class="card cardSize">
      <img
        :src="`https://picsum.photos/500/400?random=${i}`"
        class="card-img-top rounded-bottom"
        data-bs-toggle="modal"
        data-bs-target="#photoModal"
      />
      <button class="bookMarkBtn">
        <i class="fa-solid fa-bookmark"></i>
        <i class="fa-regular fa-bookmark"></i>
      </button>
    </div>
  </div>

  <!-- 相片詳細頁面modal -->
  <!-- <div
    class="modal fade"
    id="photoModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div
          class="modal-header p-3 border-bottom-0 d-flex justify-content-between align-items-center"
        >
          <div
            class="photoModalProfile d-flex justify-content-center align-items-center"
          >
            <img
              class="imgPhoto me-3"
              :src="`https://localhost:7259/Images/${photoFor.authorPhotoSticker}`"
              :alt="photoFor.authorPhotoSticker"
            />
            <p class="m-0">{{ photoFor.author }}</p>
          </div> -->

  <!-- </div>
        <div
          class="modal-body d-flex justify-content-center flex-column align-items-center p-0"
        >
          <div class="card photoModalImage">
            <img
              :src="`https://localhost:7259/Images/${photoFor.source}`"
              class="card-img-top rounded-0"
              :alt="photoFor.source"
            />
            <button class="bookMarkBtn" @click.stop="collectPhoto(photoFor)">
              <i class="fa-solid fa-bookmark" v-if="photoFor.isCollection"></i>
              <i class="fa-regular fa-bookmark" v-else></i>
            </button>
          </div>
        </div>
        <div class="photoModalFooter">
          <p class="fw-bold">{{ photoFor.title }}</p>
          <p>
            <i class="fa-solid fa-camera-retro fs-5"></i>
            {{ photoFor.camera }}
          </p>
        </div>
      </div>
    </div>
  </div>  -->
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const allPhotos = ref([]);
const memberId = route.params.memberId;

// modal資料
// const photoModal = (item) => {
//   console.log("傳給modal");
//   photoFor.value = item;
// };
</script>

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
