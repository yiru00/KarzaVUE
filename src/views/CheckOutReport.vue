<template>
  <div class="container row inline-block">
    <div class="">結帳結果頁</div>
    <div>
      <div class="container-fluid my-5">
        <div class="row justify-content-center">
          <div class="col-xl-10">
            <div class="card shadow-lg">
              <div class="row p-2 mt-3 justify-content-between mx-sm-2">
                <div class="col"></div>
                <div class="col">
                  <div class="row justify-content-start">
                    <div class="col"><h3>結帳結果頁</h3></div>
                  </div>
                </div>
                <div class="col-auto">
                  <h4 class="irc_mi img-fluid bell" width="30" height="30">
                    Karza!
                  </h4>
                </div>
              </div>
              <div class="row mx-auto justify-content-center text-center">
                <div class="col-12 mt-3">
                  <nav aria-label="breadcrumb" class="second"></nav>
                </div>
              </div>

              <div class="row justify-content-around">
                <div class="col-md-5">
                  <div class="card border-0">
                    <div class="card-header pb-0">
                      <p class="card-text text-muted mt-4 space">訂單資訊</p>
                      <hr class="my-0" />
                    </div>
                    <div class="card-body">
                      <div class="row justify-content-between">
                        <div class="col-auto mt-0">
                          <p>
                            <div>付款編號:</div>
        <div>{{ this.paymentID }}</div>
        <div>結帳日期:</div>
        <div>
          {{ this.foramtDateTime(this.paymentData.orderDetail.orderDate) }}
        </div>
        <div>訂單狀態:</div>
        <div>{{ getOrderState }}</div>
        <div>運送地址:</div>
        <div>{{ this.paymentData.orderDetail.address }}</div>
                          </p>
                        </div>
                        <div class="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="card border-0">
                    <div class="card-header card-2">
                      <p class="card-text text-muted mt-md-4 mb-2 space">
                        商品明細
                      </p>
                      <hr class="my-2" />
                      <small><div class="">
          
          <div
            v-for="item in this.paymentData.orderDetail.orderItems.$values"
            :key="item.orderId"
          >
            <div>名稱:</div>
            <div>{{ item.productName }}</div>
            <div>數量:</div>
            <div>{{ item.productNumber }}</div>
            <div>金額:</div>
            <div>{{ item.productPrice * item.productNumber }}</div>
            <br />
          </div>
          <div>原價:</div>
          <div>{{ this.paymentData.toatalBefore }}</div>
          <div>折扣金額:</div>
          <div>{{ this.paymentData.minusAmount }}</div>
          <div>總金額:</div>
          <div>{{ this.paymentData.orderDetail.total }}</div>
        </div></small>


                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="hasTakeDatas" class="col-8">
        

       
        
      </div>

      <div v-else>查無結帳資料</div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";

export default {
  data() {
    return {
      // vue loading
      loading: false,
      hasTakeDatas: false,
      paymentID: this.$route.params.id,
      paymentData: null,
      errSweetAlert: {
        title: "錯誤",
        icon: "error",
        confirmButtonText: "確定",
        confirmButtonColor: "#41b882",
        // timer: 2000,
      },
      successSweetAlert: {
        title: "成功",
        icon: "success",
        confirmButtonText: "確定",
        confirmButtonColor: "#41b882",
        // timer: 2000,
      },
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const toHomePage = () => {
      router.push(`/homepage`);
    };
    return { toHomePage };
  },
  mounted() {
    console.log(this.paymentID);
    this.GetPaymentResult();
  },
  computed: {
    getOrderState() {
      let StateName = "";
      if (this.paymentData) {
        if (this.paymentData.orderDetail) {
          switch (this.paymentData.orderDetail.state) {
            case -1:
              StateName = "待付款";
              break;
            case 0:
              StateName = "未出貨";
              break;
            case 1:
              StateName = "已出貨";
              break;
            case 2:
              StateName = "運送中";
              break;
            case 3:
              StateName = "已簽收";
              break;
            case 4:
              StateName = "已完成";
              break;
          }
        }
      }
      return StateName;
    },
  },

  methods: {
    /*================================== 公用函式  =================================== */
    // 格式化Datime
    foramtDateTime(str) {
      let dateTime = new Date(str);

      let year = dateTime.getFullYear();
      let month = dateTime.getMonth();
      let day = dateTime.getDate();
      let h = dateTime.getHours();
      let m = dateTime.getMinutes();
      let s = dateTime.getSeconds();

      return `${year}/${month}/${day}/ ${h}:${m}:${s}`;
    },
    /*================================== 結帳行為及api  =================================== */
    async GetPaymentResult() {
      axios
        .get(
          `https://localhost:7259/api/ShoppingCart/GetPaymentResult?paymentId=${this.paymentID}`
        )
        .then((res) => {
          if (res.data) {
            this.paymentData = res.data.data;
            console.log(this.paymentData);
            // 有資料才show
            this.hasTakeDatas = true;
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          this.errSweetAlert.text = error.response.data.messsage || "其他錯誤";
          this.$swal.fire(this.errSweetAlert);
          this.errSweetAlert.text = "";
        });
    },
  },
  components: {},
};
</script>
<style scoped>
body {
  background: linear-gradient(110deg, #bbdefb 60%, #42a5f5 60%);
}

.shop {
  font-size: 10px;
}

.space {
  letter-spacing: 0.8px !important;
}

.second a:hover {
  color: rgb(92, 92, 92);
}

.active-2 {
  color: rgb(92, 92, 92);
}

.breadcrumb > li + li:before {
  content: "" !important;
}

.breadcrumb {
  padding: 0px;
  font-size: 10px;
  color: #aaa !important;
}

.first {
  background-color: white;
}

a {
  text-decoration: none !important;
  color: #aaa;
}

.btn-lg,
.form-control-sm:focus,
.form-control-sm:active,
a:focus,
a:active {
  outline: none !important;
  box-shadow: none !important;
}

.form-control-sm:focus {
  border: 1.5px solid #4bb8a9;
}

.btn-group-lg > .btn,
.btn-lg {
  padding: 0.5rem 0.1rem;
  font-size: 1rem;
  border-radius: 0;
  color: white !important;
  background-color: #4bb8a9;
  height: 2.8rem !important;
  border-radius: 0.2rem !important;
}

.btn-group-lg > .btn:hover,
.btn-lg:hover {
  background-color: #26a69a;
}

.btn-outline-primary {
  background-color: #fff !important;
  color: #4bb8a9 !important;
  border-radius: 0.2rem !important;
  border: 1px solid #4bb8a9;
}

.btn-outline-primary:hover {
  background-color: #4bb8a9 !important;
  color: #fff !important;
  border: 1px solid #4bb8a9;
}

.card-2 {
  margin-top: 40px !important;
}

.card-header {
  background-color: #fff;
  border-bottom: 0px solid #aaaa !important;
}

p {
  font-size: 13px;
}

.small {
  font-size: 9px !important;
}

.form-control-sm {
  height: calc(2.2em + 0.5rem + 2px);
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0;
}

.cursor-pointer {
  cursor: pointer;
}

.boxed {
  padding: 0px 8px 0 8px;
  background-color: #4bb8a9;
  color: white;
}

.boxed-1 {
  padding: 0px 8px 0 8px;
  color: black !important;
  border: 1px solid #aaaa;
}

.bell {
  opacity: 0.5;
  cursor: pointer;
}

@media (max-width: 767px) {
  .breadcrumb-item + .breadcrumb-item {
    padding-left: 0;
  }
}
</style>
