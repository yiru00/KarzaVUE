<template>
  <!-- 呈現內容 component使用-->
  <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="i in 10" :key="i">
    <div
      class="card cardSize"
      data-bs-toggle="modal"
      data-bs-target="#photoModal"
    >
      <img
        src="https://picsum.photos/500/400?random=2"
        class="card-img-top rounded-bottom"
        alt="Photo 1"
      />
      <button class="bookMarkBtn">
        <i class="fa-regular fa-bookmark"></i>
      </button>
    </div>
  </div>

  <div
    class="modal fade"
    id="photoModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header p-0 p-3">
          <img
            class="imgPhoto me-3"
            src="https://picsum.photos/500/400?random=1"
            alt=""
          />
          <p class="fs-5 m-0">用戶的暱稱</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="modal-body d-flex justify-content-center flex-column align-items-center p-0"
        >
          <h1 class="modal-title" id="exampleModalLabel">Phototitle</h1>
          <div class="card photoModalImage">
            <img
              src="https://picsum.photos/500/400?random=2"
              class="card-img-top rounded-bottom h-100 w-100"
              alt="Photo 1"
            />
            <button class="bookMarkBtn">
              <i class="fa-regular fa-bookmark"></i>
            </button>
          </div>
        </div>
        <div class="modal-footer border-top-0">
          <h3><i class="fa-solid fa-camera-retro fs-2"></i>：Sony</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// axios({
//   method: "POST",
//   url: `https://localhost:7259/api/Photo/AllPhotos?id=${}`,
//   data: { Id: 1 },
// })
//   .then((response) => {

//   })
//   .catch((error) => console.log(error));
</script>

<style scoped>
.imgPhoto {
  border-radius: 50%;
  width: 80px;
  height: 80px;
}
.photoModalImage img {
  object-fit: cover;
}

.photoModalImage {
  width: 700px;
  border: 0;
}
.photoGrid {
  margin-top: 230px;
  margin-left: 26px;
  height: 100%;
}
.cardSize img {
  transform: scale(1, 1);
  transition: all 0.5s ease-out;
  object-fit: cover;
  height: 100%;
}

.cardSize img:hover {
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

.cardSize:hover .bookMarkBtn,
.photoModalImage:hover .bookMarkBtn {
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
