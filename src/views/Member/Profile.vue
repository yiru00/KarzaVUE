<template>
  <!-- <div>
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
  </div> -->
  <section>
    <div class="container">
      <div class="content">
        <div class="profile_header">
          <h1>個人資訊</h1>
          <RouterLink to="/EditProfile" class="profile_edit_btn"
            >編輯資料</RouterLink
          >
        </div>
        <div class="profile row">
          <div class="profile_left col-md-6">
            <img :src="showPhoto" alt="" />
          </div>
          <div class="profile_right col-md-6">
            <p>帳號: {{ users.emailAccount }}</p>
            <p>姓名: {{ users.realName }}</p>
            <p>暱稱: {{ users.nickName }}</p>
            <p>生日: {{ users.birthOfDate }}</p>
            <p>手機: {{ users.mobile }}</p>
            <p>地址: {{ users.address }}</p>
            <p>關於: {{ users.about }}</p>
            <div class="edit_password">
              <p>密碼:</p>
              <RouterLink to="/EditPassword" class="btn edit_password_btn"
                >編輯密碼</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import utility from "../../../public/utility.js";
// import axios from 'axios'

export default {
  data() {
    return {
      users: {},
      showPhoto: "",
    };
  },
  mixins: [utility],
  async created() {
    let id = await this.fetchMemberId();

    axios
      .get(`https://localhost:7259/api/Members/Profile?id=${id}`, {
        headers: {
          Authorization: "Bearer " + $.cookie("token"),
        },
      })
      .then((response) => {
        // console.log(response.data)
        this.users = response.data;
        this.users.birthOfDate = this.users.birthOfDate.substring(0, 10);
        this.showPhoto = `https://localhost:7259/Images/${response.data.photoSticker}`;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.container {
  width: 1440px;
  margin: 0 auto;
}
.content {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  border-radius: 15px;
  padding: 50px 80px;
 ;
}
.profile_header {
  margin-left: 200px;
  color: #8991a9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
}
.profile_edit_btn {
  text-decoration: none;
  border: none;
  background: #afc7d8;
  border-radius: 5px;
  padding: 8px 15px;
  color: #ffffff;
  letter-spacing: 1px;
}
.profile_header h1 {
  margin: 15px 0;
  font-size: 35px;
  font-weight: bolder;
}
.profile {
  display: flex;
  align-items: center;
}
.profile_left img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 1px solid #000;
  margin-right: 100px;
}
.profile_right {
  color: #8991a9;
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 1px;
}
.profile_right p {
  margin: 25px 0;
}
.edit_password {
  display: flex;
  align-items: center;
  height: 35px;
}
.edit_password_btn {
  margin-left: 5px;
  background: #afc7d8;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  color: #ffffff;
  letter-spacing: 1px;
}
</style>
