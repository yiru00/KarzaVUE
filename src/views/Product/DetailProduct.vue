<template>
  <div class="container h-100 py-5">
    <div class="topProduct">
      <div class="ProName">
        <p class="ProName-P">{{ detail.name }}</p>
      </div>
      <div>
        <div class="Pro-lef d-flex">
          <img
            class="card-img"
            :src="'https://localhost:7027/ProductImgFiles/' + coverimg"
            style="width: 470px; object-fit: cover"
            alt=""
          />
          <div class="Pro-right">加寬</div>
          <div>
            <p class="Id-Pborder">商品編號 : {{ detail.id }}</p>
            <p>商品類別 : {{ detail.categoryName }}</p>
            <p>品牌 : {{ detail.brandName }}</p>
            <p>庫存量 : {{ detail.inventory }}</p>
            <span> NT {{ detail.price }}</span>
            <button class="add-btn" @click.stop="this.toSoppingCart(detail)">
              直接購買
            </button>
            <div>
              <button class="add-btn" @click.stop="buyDirectly(detail)">
                購物車
              </button>
              <button class="add-btn">
                <i
                  v-if="MId == 0"
                  class="fa-regular fa-star"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                ></i>

                <i
                  v-else-if="!status.upshot"
                  @click="CallProductFavorites()"
                  class="fa-regular fa-star"
                ></i>
                <i
                  v-else
                  @click="CallUnFavorites(status.deleteId)"
                  class="fa-solid fa-star"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="TBborder">
      <p class="PBack">商品介紹</p>
    </div>
    <div class="botproduct">
      <div v-for="(item, index) in picture" :key="index">
        <img
          class="card-img"
          :src="'https://localhost:7027/ProductImgFiles/' + item"
          style="width: 100%"
          alt=""
        />
      </div>

      <div class="spec-Out">
        <p>Fujifilm Instax Mini 90 銀色</p>
        <p class="Spec">
          商品介紹:
          {{ detail.productSpec }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import utility from "../../../public/utility";
import { useRouter, useRoute } from "vue-router";

export default {
  mixins: [utility],
  name: "DetailProduct",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toSoppingCart = (productSelItem) => {
      // 將本頁prdoctItem傳入並存sessionStorage
      sessionStorage.setItem("productSelItem", JSON.stringify(productSelItem));
      router.push(`/ShoppingCart`);
    };

    return { toSoppingCart };
  },
  data() {
    return {
      detail: {},
      coverimg: "",
      picture: [],
      MId: 0,
      PId: 0,
      status: {},
      cartsSelect: [],
    };
  },
  created() {
    this.scrollToTop();

    this.CallDetailProductsApi();
    this.CallFavoritesStatus();
    this.getStorageCart();
  },
  mounted() {
    this.GetMemberId();
  },

  methods: {
    async CallDetailProductsApi() {
      let detailId = this.$route.path.slice(9);

      this.PId = detailId;
      console.log(detailId);
      axios
        .get(`https://localhost:7259/api/Product/DetailProducts?Id=${detailId}`)
        .then((response) => {
          this.detail = response.data;
          this.picture = this.detail.source;

          this.coverimg = this.detail.source[0];
          this.picture = this.picture.slice(1);
          console.log(this.picture);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async GetMemberId() {
      this.MId = await this.fetchMemberId();
      console.log(this.MId);
    },
    async CallProductFavorites() {
      await axios
        .post(
          `https://localhost:7259/api/Favorites/ProductFavorites?memberId=${this.MId}&productId=${this.PId}`
        )
        .then((response) => {
          console.log(response.data);
          let res = response.data;
          if (res.upshot) {
            this.status.deleteId = res.deleteId;
            this.status.upshot = true;
            this.showAlert(res.reply);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async CallUnFavorites(deleteId) {
      axios
        .delete(`https://localhost:7259/api/favorites/unfavorites/${deleteId}`)
        .then((response) => {
          if (response) {
            this.status.upshot = false;
            this.status.deleteId = 0;
            this.showAlert("取消收藏成功");
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async CallFavoritesStatus() {
      let memberId = await this.fetchMemberId();
      axios
        .get(
          `https://localhost:7259/api/Favorites/FavoritesStatus?memberId=${memberId}&productId=${this.PId}`
        )
        .then((response) => {
          this.status = response.data;
          console.log(this.status);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 購物車行為
    saveLocalStorage(saveName, val) {
      localStorage.setItem(saveName, JSON.stringify(val));
    },
    // 將localStorage 已存JSON字串轉回物件 存在指定data參數
    // saveName與data相同
    getlocalStorage(saveName) {
      this[saveName] = JSON.parse(localStorage.getItem(saveName)); // 與this.saveName相同
    },
    // 從Storage取使用者購物車紀錄
    getStorageCart() {
      this.getlocalStorage("cartsSelect");
      // 防呆 假如storage沒存過 將值存為空陣列
      if (!this.cartsSelect) {
        this.cartsSelect = [];
      }
    },
    buyDirectly(item) {
      // 防呆 依id確認購物車有沒有商品 有的話更新陣列數量+1 沒有新增一筆
      let findProduct = this.cartsSelect.find((a) => a.Id == item.id);

      if (findProduct) {
        // 已在購物車 找到index 修改物件值
        let index = this.cartsSelect.indexOf(findProduct);
        this.cartsSelect[index].Qty++;
      } else {
        // 未在購物車 加入陣列
        this.cartsSelect.push({
          Id: item.id,
          Qty: 1,
          Name: item.name,
          Price: item.price,
        });
      }

      // 儲存到storage
      this.saveLocalStorage("cartsSelect", this.cartsSelect);
    },
  },
};
</script>

<style scoped>
.topProduct {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: #ffff;
  padding: 10% 10%;
}
.ProName {
  border-bottom: 7px solid #899ea9;
  margin-bottom: 130px;
  margin-left: 50px;
  margin-right: 50px;
}
.ProName-P {
  padding-left: 50px;
  font-size: 24px;
  font-weight: 800;
}
.card-img {
  padding: 0% 5%;
  margin-bottom: 50px;
}
.Pro-right {
  margin-left: 150px;
  border-bottom: 5px solid #ffff;
  color: #ffff;
}
.Id-Pborder {
}
.add-btn {
  margin: 20px;
}
.TBborder {
  border-top: 5px solid #899ea9;
  border-bottom: 5px solid #899ea9;
}
.PBack {
  background: #ffff;
  margin: 0%;
  padding-left: 20%;
  font-size: 22px;
  font-weight: 800;
  padding-top: 10px;
  padding-bottom: 10px;
}
.botproduct {
  background: #ffff;
  margin-top: 0;
  padding: 15%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.spec-Out {
  padding: 50px;
}
.Spec {
  white-space: pre-wrap;
}
</style>
