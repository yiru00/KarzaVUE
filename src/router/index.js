import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    //首頁
    {
      path: "/",
      name: "home",
      //適合一般靜態網頁
      component: HomeView,
    },
    {
      path: "/ShoppingCart",
      name: "ShoppingCart",
      //動態載入（有進到這裡才會載入資源，適合有串接api的元件）
      component: () => import("../views/ShoppingCart.vue"),
    },
    {
      path: "/Register",
      name: "Register",
      //動態載入（有進到這裡才會載入資源，適合有串接api的元件）
      component: () => import("../views/Member/Register.vue"),
    },
    {
      path: "/Profile",
      name: "Profile",
      //動態載入（有進到這裡才會載入資源，適合有串接api的元件）
      component: () => import("../views/Member/Profile.vue"),
    },
    {
      path: "/Activity",
      name: "Activity",
      //動態載入（有進到這裡才會載入資源，適合有串接api的元件）
      component: () => import("../views/Activity.vue"),
    },
    {
      path: "/Forum",
      name: "Forum",
      //動態載入（有進到這裡才會載入資源，適合有串接api的元件）
      component: () => import("../views/Forum.vue"),
    },

    //活動詳細頁面(動態router
    {
      path: "/Activity/:id",
      name: "activityDetails",
      component: () => import("../views/Activity/[id].vue"),
    },
    //活動搜尋
    {
      path: "/Activity/Search",
      name: "activitySearch",
      component: () => import("../views/Activity/Search.vue"),
    },

    //我的紀錄
    {
      path: "/Record",
      name: "Record",
      component: () => import("../views/Record.vue"),
      children: [
        {
          path: "/Record/ActivitySaved",
          name: "ActivitySaveRecord",
          component: () => import("../views/Record/ActivitySaved.vue"),
        },
        {
          path: "/Record/ActivityRecord",
          name: "ActivityRecord",
          component: () => import("../views/Record/ActivityRecord.vue"),
          children: [
            {
              path: "/Record/ActivityEnrolled",
              name: "ActivityEnrolled",
              component: () => import("../views/Record/ActivityEnrolled.vue"),
            },
            {
              path: "/Record/ActivityJoined",
              name: "ActivityJoined",
              component: () => import("../views/Record/ActivityJoined.vue"),
            },
          ],
        },
        {
          path: "/Record/OrderPage",
              name: "OrderPage",
              component: () => import("../views/Record/OrderPage.vue"),
        },
      ],
    },
    //要在最後一個(可能被動態router攔截)
    // 網址錯誤會跑到404那頁
    {
      path: "/:domain(.*)*",
      name: "NotFound",
      component: () => import("../views/404.vue"),
    },
  ],
});

export default router;
