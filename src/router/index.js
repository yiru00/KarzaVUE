import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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

    
    //活動詳細頁面(動態router
    {
      path: "/Activity/:id",
      name: "activityDetails",
      component: ()=>import("../views/Activity/[id].vue"),
    },
//
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
      path:"",
      component:import("../views/Record/ActivitySave.vue")
    },
    {
      path: "/ActivitySave",
      name: "ActivitySaveRecord",
      component: import("../views/Record/ActivitySave.vue"),
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
