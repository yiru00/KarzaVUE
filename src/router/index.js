import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
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

    {
      path: "/Forum/Create",
      name: "Create",
      component: () => import("../views/Forum/CreateArticle.vue")
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
        //預設顯示活動收藏
        {
          path: "",
          name: 'ActivitySaveRecord',
          component: import("../views/Record/ActivitySaved.vue")
        },
        {
          path: "/ActivitySaved",
          name: "ActivitySaveRecord",
          component: import("../views/Record/ActivitySaved.vue"),
        },
        {
          path: "/ActivityEnrolled",
          name: "ActivityEnrolledRecord",
          component: import("../views/Record/ActivityEnrolled.vue"),
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
