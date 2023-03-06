<script>
import utility from "./../public/utility.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const currentRoute = router.currentRoute.value.path;
    console.log(currentRoute);
    const navigateTo = () => {
      router.go(0);
    };

    return {
      navigateTo,
      currentRoute,
    };
  },
  watch: {
    $route(to, from) {
      // 當路由切換時，這個監聽器會被觸發
      // 可以在這裡執行某些操作，例如更新數據
      this.getMemberId();
      console.log("路由發生了變化：", to.path, from.path);
    },
  },
  data() {
    return {
      memberId: Number,
      user: {
        email: "",
        password: "",
        erromsg: "",
      },
    };
  },
  mounted() {
    //導覽列變化
    window.addEventListener("DOMContentLoaded", () => {
      let scrollPos = 0;
      const mainNav = document.getElementById("mainNav");
      const headerHeight = mainNav.clientHeight;
      window.addEventListener("scroll", function () {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if (currentTop < scrollPos) {
          // Scrolling Up
          if (currentTop > 0 && mainNav.classList.contains("is-fixed")) {
            mainNav.classList.add("is-visible");
          } else {
            //console.log(123);
            mainNav.classList.remove("is-visible", "is-fixed");
          }
        } else {
          // Scrolling Down
          mainNav.classList.remove(["is-visible"]);
          if (
            currentTop > headerHeight &&
            !mainNav.classList.contains("is-fixed")
          ) {
            mainNav.classList.add("is-fixed");
          }
        }
        scrollPos = currentTop;
      });
    });
    this.getMemberId();
  },
  mixins: [utility],
  methods: {
    async getMemberId() {
      let id = await this.fetchMemberId();
      this.memberId = id;
      console.log(this.memberId);
    },
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
            this.navigateTo();
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
  <nav
    class="navbar navbar-light navbar-expand-lg navbar-togglable"
    id="mainNav"
  >
    <div
      class="container-fluid d-flex align-items-center justify-content-between"
    >
      <!-- Navbar toggler 漢堡選單按鈕-->
      <button
        class="navbar-toggler border-0 px-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fa-solid fa-bars-staggered fs-4"></i>
      </button>

      <!--Navbar brand -->
      <!-- <a class="navbar-brand m-0" href="./index.html">KARZA!</a> -->
      <router-link to="/" class="navbar-brand m-0">KARZA!</router-link>

      <!-- （有登入）lg以下顯示 訊息、通知、個人選單  -->
      <div class="d-lg-none d-flex align-items-center justify-content-between">
        <!-- 登入 -->
        <div v-if="this.memberId == 0" class="btn-group">
          <button
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
            type="button"
            class="loginBtn"
          >
            登入
          </button>
        </div>

        <!-- 個人資料下拉選單（登入後顯示頭像）(mobile) -->
        <div v-else class="btn-group">
          <button
            type="button"
            class="userButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="background-image: url(/src/assets/userPic.png)"
          ></button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <RouterLink to="" class="dropdown-item personalList"
                >帳戶管理</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/Record" class="dropdown-item personalList"
                >我的紀錄</RouterLink
              >
            </li>
            <li>
              <RouterLink to="" class="dropdown-item personalList"
                >社群主頁</RouterLink
              >
            </li>
            <li>
              <RouterLink to="" class="dropdown-item personalList"
                >購物車</RouterLink
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <RouterLink to="" class="dropdown-item personalList" href="#"
                >登出</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Navbar collapse -->
      <div
        class="collapse navbar-collapse align-items-center"
        id="navbarCollapse"
      >
        <!-- Navbar nav -->
        <ul class="navbar-nav me-3 ms-3">
          <li class="nav-item">
            <RouterLink to="/Activity" class="nav-link navLink"
              >官方活動</RouterLink
            >
            <!-- <RouterLink to="/activity">activity</RouterLink> -->
          </li>
          <li class="nav-item">
            <RouterLink to="" class="nav-link navLink">社群</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink to="" class="nav-link navLink">商城</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/Forum" class="nav-link navLink">論壇</RouterLink>
          </li>
        </ul>

        <!--（有登入）lg以上 顯示 訊息、通知、個人選單 -->
        <div
          class="d-lg-block d-none d-flex justify-content-between align-items-center ms-auto"
        >
          <!-- 登入(沒登入前顯示) -->
          <div v-if="this.memberId == 0" class="btn-group">
            <button
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
              type="button"
              class="loginBtn"
            >
              登入
            </button>
          </div>

          <!-- 個人資料下拉選單（登入後顯示頭像） -->
          <div v-else class="btn-group">
            <button
              type="button"
              class="userButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="background-image: url(/src/assets/userPic.png)"
            ></button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <RouterLink to="" class="dropdown-item personalList"
                  >帳戶管理</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/Record" class="dropdown-item personalList"
                  >我的紀錄</RouterLink
                >
              </li>
              <li>
                <RouterLink to="" class="dropdown-item personalList"
                  >社群主頁</RouterLink
                >
              </li>
              <li>
                <RouterLink to="" class="dropdown-item personalList"
                  >購物車</RouterLink
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <RouterLink to="" class="dropdown-item personalList"
                  >登出</RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main><RouterView /></main>
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
          <div class="loginInput" @keydown.enter="userLogin">
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
            <router-link to="" class="mt-3" href="./../forgetPassword.html"
              >忘記密碼？</router-link
            >
          </div>
        </div>

        <p>
          還沒加入會員？<router-link to="" href="./../register.html"
            >註冊</router-link
          >
        </p>
      </div>
    </div>
  </div>
  <!-- 以下會是點了連結之後的內容渲染 -->
  <footer
    class="footer border-top d-flex justify-content-center align-items-center me-0"
  >
    <p class="p-0 m-0 text-white">
      <i class="fa-regular fa-copyright text-white"></i>2023 KARZA!
    </p>
  </footer>
</template>

<style>
* {
  font-family: "Noto Serif TC", serif;
  color: #070707;
}
body {
  background-color: #fcf7f0;
  /* height: 300vh; */
}
main {
  min-height: 100vh;
}
#mainNav {
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  background: #fff;
}
.navLink {
  color: #070707;
}
@media (min-width: 992px) {
  #mainNav {
    background: #fff;
    transition: background-color 0.2s;
    /* Force Hardware Acceleration in WebKit */
    transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .navLink:hover,
  .navLink:active {
    border-bottom: 2px solid #afc7d8;
  }

  #mainNav.is-fixed {
    /* 往下滑時navbar固定在網頁上方隱藏 */
    position: fixed;
    top: -66px;
    transition: transform 0.2s;
  }

  #mainNav.is-visible {
    /* 變化滑動方向時顯示出navbar */
    background-color: #ffffffae;
    transform: translate3d(0, 100%, 0);
  }
}

.userButton {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0;
  background-size: cover;
}

.loginBtn {
  width: 70px;
  height: 50px;
  border-radius: 10%;
  background-color: #afc7d8;
  border: 0;
  font-size: 18px;
  color: #ffffff;
}

.personalList:hover,
.personalList:active {
  background-color: #afc7d8;
  color: #fff;
}

.footer {
  height: 100px;
  bottom: 0px;
  background-color: #8991a9;
}
.mail,
.mail:active {
  color: #fff;
  text-decoration: none;
}
.mail:hover {
  color: #fcf7f0;
  cursor: pointer;
}
/* .notificationButton,
  .messageButton {
    background-color: transparent;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 0;
  }
  .notificationButton:focus,
  .messageButton:focus {
    border: 0;
  } */

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
