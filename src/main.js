import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

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


// import './assets/navbar.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
