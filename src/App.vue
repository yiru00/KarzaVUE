<script setup>
import { RouterLink, RouterView } from 'vue-router'

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
        <div
          class="d-lg-none d-flex align-items-center justify-content-between"
        >
          <!-- 登入 -->
          <div class="btn-group">
            <button type="button" class="loginBtn">
              <RouterLink  to="/Login">登入</RouterLink>
            </button>
          </div>
          

          <!-- 個人資料下拉選單（登入後顯示頭像）(mobile) -->
          <div class="btn-group">
            <button
              type="button"
              class="userButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="background-image: url(src/assets/userPic.png)"
            ></button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
              <RouterLink  to="" class="dropdown-item personalList">帳戶管理</RouterLink>
              </li>
              <li>
              <RouterLink  to="/Record" class="dropdown-item personalList">我的紀錄</RouterLink>
              </li>
              <li>
                <RouterLink  to="" class="dropdown-item personalList">社群主頁</RouterLink>
              </li>
              <li>
                <RouterLink  to="" class="dropdown-item personalList">購物車</RouterLink>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li><RouterLink to="" class="dropdown-item personalList" href="#">登出</RouterLink></li>
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
              <RouterLink to="/Activity" class="nav-link navLink">官方活動</RouterLink>
              <!-- <RouterLink to="/activity">activity</RouterLink> -->
            </li>
            <li class="nav-item">
              <RouterLink to="" class="nav-link navLink">社群</RouterLink>

            </li>
            
            <li class="nav-item">
              <RouterLink to="" class="nav-link navLink">商城</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="" class="nav-link navLink">論壇</RouterLink>
            </li>
          </ul>

          <!--（有登入）lg以上 顯示 訊息、通知、個人選單 -->
          <div
            class="d-lg-block d-none d-flex justify-content-between align-items-center ms-auto"
          >
            <!-- 登入(沒登入前顯示) -->
            <div class="btn-group">
              <button type="button" class="loginBtn">
                <RouterLink  to="/Login">登入</RouterLink>
              </button>
            </div>

            <!-- 個人資料下拉選單（登入後顯示頭像） -->
            <div class="btn-group">
              <button
                type="button"
                class="userButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="background-image: url(src/assets/userPic.png)"
              ></button>
              <ul class="dropdown-menu dropdown-menu-end ">
              <li>
              <RouterLink  to="" class="dropdown-item personalList">帳戶管理</RouterLink>
              </li>
              <li>
              <RouterLink  to="/Record" class="dropdown-item personalList">我的紀錄</RouterLink>
              </li>
              <li>
                <RouterLink  to="" class="dropdown-item personalList">社群主頁</RouterLink>
              </li>
              <li>
                <RouterLink  to="" class="dropdown-item personalList">購物車</RouterLink>
              </li>
              <li><hr class="dropdown-divider " /></li>
              <li><RouterLink to="" class="dropdown-item personalList" href="#">登出</RouterLink></li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
<div class="container ">
  <RouterView /> 
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
  .container{
    height: 100vh;
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
  }
  /* .loginBtn:hover {
    cursor: pointer;
    background-color: #8991a9;
  } */
  .loginBtn a {
    text-decoration: none;
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
  
</style>
