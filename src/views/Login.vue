<script>
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        erromsg: "",
      },
    };
  },
  methods: {
    userLogin() {
      if (!this.user.email && !this.user.password) {
        this.user.erromsg = "記得輸入帳號密碼";
        return;
      } else if (!this.user.email) {
        this.user.erromsg = "記得輸入帳號";
        return;
      } else if (!this.user.password) {
        this.user.erromsg = "記得輸入密碼";
        return;
      } else {
        console.log(this.user.email);
        let account = this.user.email;
        let password = this.user.password;
        console.log(account, password);
      }

      //console.log(account)
      fetch(
        `https://localhost:7259/api/Members/JwtLogin?account=${this.user.email}&password=${this.user.password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.text())
        .then((response) => {
          console.log(response);
          if (
            response == "帳號密碼錯誤" ||
            response == "帳號尚未啟用，請至信箱查看。" ||
            response == "此帳戶已是黑名單"
          ) {
            this.user.erromsg = response;
          } else {
            document.cookie = `token=${response}`;
            history.go(-1);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // alert("Failure");
        });
    },
  },
};
</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="modal-content">
      <h3>登入會員</h3>
      <div class="modal-body" @keydown.enter="userLogin">
        <div class="form-floating mb-3">
          <input
            v-model.trim="user.email"
            class="form-control"
            id="loginEmail"
            type="email"
            placeholder="電子郵件"
          />
          <label for="loginEmail">電子郵件</label>
        </div>
        <div class="form-floating mb-3">
          <input
            v-model.trim="user.password"
            class="form-control"
            id="loginPassword"
            type="password"
            placeholder="密碼"
          />
          <label for="loginPassword">密碼</label>
          <span class="loginErroMsg">{{ user.erromsg }}</span>
        </div>

        <div>
          <input
            @click="userLogin"
            id="login"
            class="login"
            type="button"
            value="登入"
          />
        </div>
        <router-link to="" class="mt-3">忘記密碼？</router-link>
      </div>

      <p>還沒加入會員？<router-link to="">註冊</router-link></p>
    </div>
  </div>
</template>

<style scoped>
/* modal start */
body {
  background-color: #fff;
}
.modal-content {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0px;
  height: 85vh;
  width: 80%;
  max-width: 400px;
  padding: 60px 50px;
  border-radius: 20px;
  margin: 20px;
  border: 2.5px solid #8991a9;
}

.modal-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-control {
  border: 0px;
  border-radius: 0px;
  outline: 0;
  border-bottom: 1px solid #444;
  color: gray;
  width: 100%;
}
.form-control:focus {
  outline: none; /* 外框效果 */
  box-shadow: none;
  border-bottom: 2.5px solid #8991a9;
}
/* modal上的登入鈕 */
.login {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 0px;
  background: #afc7d8;
  color: #fff;
}
.modal-content a {
  text-decoration: none;
  color: #8991a9;
}
.modalcenter {
  display: flex;
  justify-content: center;
}
.loginErroMsg {
  color: #d39899;
}
/* modal end */
</style>
