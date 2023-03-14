<template>
  <div class="content">
    <h4>我的訂單</h4>
    <div class="line"></div>
    <div class="" v-html="noorder"></div>
    <div
      :ref="item.id"
      class="outline"
      v-for="(item, index) in orderdetail"
      :key="index"
    >
      <div
        class="col prooutline container-fluid p-3 mt-5"
        data-bs-toggle="collapse"
        :data-bs-target="`#index${item.id}`"
        :ref="item.id"
      >
        <i class="fa-solid fa-clipboard clickauto"></i>
        <small class="ms-4">訂單編號:{{ item.paymentId }}</small>
        <small class="totalloca">總金額:{{ item.total }}$</small>
        <br />
        <small class="ms-4">收件資訊: {{ item.address }}</small>
      </div>

      <div
        class="col-11 prooutline2 container-fluid collapsing flex-column justify-content-center align-items-center"
        :id="`index${item.id}`"
      >
        <div
          class="row procard"
          v-for="(orderitem, index) in item.orderItems"
          :key="index"
        >
          <div class="col-3">
            <img
              class="pic"
              :src="
                'https://localhost:7027/ProductImgFiles/' + orderitem.source
              "
              alt=""
            />
          </div>
          <div class="col-3">
            <small>{{ orderitem.productName }}</small>
          </div>
        </div>
      </div>
    </div>
    {{ itemid }}
  </div>
</template>

<script>
import utility from "../../../public/utility";
export default {
  mixins: [utility],
  data() {
    return {
      orderdetail: [],
      orderitems: [],
      orderid: 0,
      showprodu: "",
      noorder: "",
      itemid: "",
    };
  },

  mounted() {
    this.getOD();
    // this.getOI(id);
  },

  created() {},

  methods: {
    async getOD() {
      let memberId = await this.fetchMemberId();
      axios
        .get(
          `https://localhost:7259/api/OrderDetail/GetMemberOrder?memberid=${memberId}`
        )
        .then((res) => {
          if (res.data.length > 0) {
            console.log(res.data);
            this.orderdetail = res.data;
          } else {
            this.noorder = "<span>目前暫無訂單~</span>";
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style scoped>
.pic {
  width: 110px;
  height: 90px;
  margin-right: 20px;
}
.procard {
  width: 100%;

  display: block;
  margin-bottom: 1rem;
  padding: 10px;
  text-align: center;
}
.prooutline {
  border: solid 0.8px;
  border-color: black;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  word-wrap: normal;
}
.prooutline2 {
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  word-wrap: normal;
  background-color: #fcf7f0;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.line {
  height: 1px;
  background-color: #a3a3a3;
}
.content {
  padding: 20px 50px;
}
.prooutline .totalloca {
  margin-left: 85%;
  margin-top: 10px;
  display: inline-block;
}

.vshowDetail {
  border: solid 0.8px;
  border-color: black;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
}
</style>
