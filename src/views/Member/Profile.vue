<template>
  <div>
    <h1>帳戶設定</h1>
    <h2>個人資訊</h2>
    <p>姓名:{{ users.realName }}</p>
    <p>暱稱:{{ users.nickName }}</p>
    <p>生日:{{ users.birthOfDate }}</p>
    <p>手機:{{ users.mobile }}</p>
    <p>地址:{{ users.address }}</p>
    <p>關於:{{ users.about }}</p>
    
       
  </div>

  <div class="float-right">
    <p>帳號:{{ users.emailAccount }}</p>
    <p>密碼:編輯密碼</p>
  </div>


</template>

<script>
import utility from "../../../public/utility.js"
// import axios from 'axios'

export default {
  data() {
    return {
      users: {},
    };
  },
  mixins: [utility],
 async mounted() {
    let id = await this.fetchMemberId();

    axios
      .get(`https://localhost:7259/api/Members/Profile?id=${id}`, {
        headers: {
          Authorization: "Bearer " + $.cookie("token"),
        },
      })
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

</script>

<style scoped>

</style>