<template>
  <div class="cotainer">
    <div>
      <p class="text-center">我的訂單</p>
      <hr />

      <div class="outline" v-for="(item, index) in orderdetail" :key="item.id">
        <div class="col prooutline container-fluid p-3 mt-5">
          <i
            @click.stop="getOI(item.id)"
            class="fa-solid fa-clipboard clickauto"
            data-bs-toggle="collapse"
            href="#ordetail"
          ></i>

          <small class="ms-4">訂單編號:{{ item.paymentId }}</small>
          <small class="totalloca">總金額:{{ item.total }}$</small>
          <br />
          <small class="ms-4">收件資訊: {{ item.address }}</small>
          <!-- {{ item }} -->
        </div>

        <div
          v-show="showprodu"
          class="col prooutline container-fluid p-3 collapse"
          id="ordetail"
        >
          <div class="col procard mt-3">
            {{ orderitems }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios, { Axios } from "axios";
export default {
  data() {
    return {
      orderdetail: [],
      orderitems: [],
      orderid: 0,
      showprodu: "",
    };
  },

  mounted() {
    this.getOD();
    // this.getOI(id);
  },

  created() {},

  methods: {
    getOD() {
      axios
        .get(`https://localhost:7259/api/OrderDetail/GetMemberOrder?memberid=1`)
        .then((res) => {
          if (res.data.length > 0) {
            this.orderdetail = res.data;
          } else {
          }
        })
        .catch((err) => {});
    },

    getOI(orderid) {
      axios
        .get(
          `https://localhost:7259/api/OrderDetail/GetOrderID?orderid=${orderid}`
        )
        .then((res) => {
          this.orderitems = res.data;
          if(orderid)

          
        })
        .catch((err) => {});
    },
  },
};
</script>

<style scoped>
.procard {
  height: 50%;
  width: 100%;
  border: solid 0.8px;
  border-color: black;
  border-radius: 0.5rem;
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