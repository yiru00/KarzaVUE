<template>
  <div class="content">
    <h4>我的報名活動</h4>
    <div class="line"></div>

    <div class="" v-html="noorder"></div>
    <div
      :ref="item.id"
      class="outline"
      v-for="(item, index) in orderdetail"
      :key="item.id"
    >
      <div class="col prooutline container-fluid p-3 mt-5">
        <i
          @click.stop="getOI(item.id)"
          class="fa-solid fa-clipboard clickauto"
          data-bs-toggle="collapse"
          :data-bs-target="`#index${item.id}`"
          :ref="`${item.id}`"
        ></i>

        <small class="ms-4">訂單編號:{{ item.paymentId }}</small>
        <small class="totalloca">總金額:{{ item.total }}$</small>
        <br />
        <small class="ms-4">收件資訊: {{ item.address }}</small>
        <!-- {{ item }} -->
      </div>

      <div
        class="col prooutline container-fluid p-3 collapse"
        :id="`index${item.id}`"
      >
        <div
          class="col procard mt-3"
          v-for="items in orderitems"
          :key="items.id"
        >
          <img :src="item.source" alt="" />
          {{ items }}
        </div>
      </div>
    </div>
    {{ orderitems }}
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
      itemid: this.$refs,
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
            this.orderdetail = res.data;
          } else {
            this.noorder = "<span>目前暫無訂單~</span>";
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
