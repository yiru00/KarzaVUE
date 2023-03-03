<template>
  <div
          class="modal fade"
          id="loginModal"
          tabindex="-1"
          aria-labelledby="loginModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modalcenter">
            <div class="modal-content">
              <h3>登入會員使用更多功能！</h3>
              <div class="modal-body">
                <div class="loginInput">
                  <div class="form-floating mb-3">
                    <input
                    v-model="user.email"
                      name="account"
                      class="form-control"
                      id="loginEmail"
                      type="email"
                      placeholder="電子郵件"
                    />
                    <label for="loginEmail">電子郵件</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                    v-model="user.password"
                      name="password"
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
                      type="submit"
                      value="登入"
                    />
                  </div>
                  <a class="mt-3" href="./../forgetPassword.html">忘記密碼？</a>
                </div>
              </div>

              <p>還沒加入會員？<a href="./../register.html">註冊</a></p>
            </div>
          </div>
        </div>
</template>

<script>

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        erromsg:""
      },
    };
  },
  methods: {
    userLogin() {
      console.log(this.user.email)
      let account = this.user.email
      let password = this.user.password

  //console.log(account)
  $.ajax({
    url: `https://localhost:7259/api/Members/JwtLogin?account=${account}&password=${password}`,
    type: "POST",
    async: false,
  })
    .done(function (response) {
      console.log(response);
      if (
        response == "帳號密碼錯誤" ||
        response == "帳號尚未啟用，請至信箱查看。" ||
        response == "此帳戶已是黑名單"
      ) {
        // alert(response)
        $(".loginErroMsg").text(response);
      
      } else {
        document.cookie = `token=${response}`;
        // const router=useRouter();
        // router.push("/")
        history.go(0);
      }
    })
    .fail(function () {
      alert("Failure");
    });
    },
  },
};


</script>

<style>
/* modal start */
.modal-content {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 0px;
  max-height: 85vh;
  min-width: 40vh;
  width: 450px;
  padding: 60px 50px;
}
.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginInput {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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