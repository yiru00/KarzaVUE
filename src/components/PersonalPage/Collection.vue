<template>
  <!-- 呈現內容 component使用-->
  <div
    class="col-12 col-sm-6 col-md-4 col-lg-3"
    v-for="item in collections"
    :key="item.id"
    @click="photoModal(item)"
  >
    <div class="card cardSize">
      <img
        :src="`https://localhost:7259/Images/${item.source}`"
        class="card-img-top rounded-bottom"
        :alt="item.source"
        data-bs-toggle="modal"
        data-bs-target="#photoModal"
      />
      <button class="bookMarkBtn" @click.stop="collectPhoto(item)">
        <i class="fa-solid fa-bookmark" v-if="item.isCollection"></i>
        <i class="fa-regular fa-bookmark" v-else></i>
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
          </div>
          <!-- 刪除相片 v-if="memberId==memberId" -->
          <button class="photoModalDeleteBtn" @click="deletePhoto(photoFor.id)">
            <i class="fa-solid fa-trash-can fs-4"></i>
          </button>
        </div>
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
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const collections = ref([]);
const memberId = route.params.memberId;
const photoFor = ref("");
const reload = ref(false);
console.log("path" + route.path);
// modal資料
const photoModal = (item) => {
  photoFor.value = item;
};

// 收藏
const collectPhoto = (collectPhoto) => {
  axios
    .post(`https://localhost:7259/api/Collection/Collect`, {
      Id: 1,
      photoId: collectPhoto.id,
    })
    .then((response) => {
      console.log("收藏api成功");
      reload.value = true;
      console.log(reload);
      collectPhoto.isCollection = !collectPhoto.isCollection;
    })
    .catch((error) => console.log(error));
};

//收藏後重撈
watch(reload, () => {
  if (reload.value) {
    axios
      .post("https://localhost:7259/api/Photo/CollectionPhoto", {
        id: memberId,
      })
      .then((response) => {
        collections.value = response.data;
        reload.value = false;
      })
      .catch((error) => console.log(error));
  }
});

// 刪除相片
const deletePhoto = function (photoId) {
  // sweetAlert???
  axios
    .delete(`https://localhost:7259/api/Photo/DeletePhoto?photoId=${photoId}`)
    .then((response) => {
      console.log("刪除照片成功");
    })
    .catch((error) => {
      console.log(error);
    });

  // this.$swal
  //   .fire({
  //     text: "確定刪除發問？",
  //     showCancelButton: true,
  //     width: "220px",
  //     focusCancel: true,
  //   })
  //   .then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //     }
  //   });
};

// 撈某人的收藏
axios
  .post("https://localhost:7259/api/Photo/CollectionPhoto", { id: memberId })
  .then((response) => {
    collections.value = response.data;
    console.log(collections.value);
  })
  .catch((error) => console.log(error));
</script>

<style scoped>
.photoModalFooter {
  border-top: 0;
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
}
.photoModalFooter p {
  margin: 0;
}
.imgPhoto {
  border-radius: 50%;
  width: 60px;
  height: 60px;
}
.photoModalImage img {
  object-fit: cover;
}
.photoModalDeleteBtn {
  border: 0;
  background-color: transparent;
  color: #d39899;
  padding: 0;
}

.photoModalImage {
  border: 0;
  width: fit-content;
  height: fit-content;
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
