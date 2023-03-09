import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PhotoGrid from "../components/PersonalPage/PhotoGrid.vue";
import AlbumGrid from "../components/PersonalPage/AlbumGrid.vue";
import AlbumPhoto from "../components/PersonalPage/AlbumPhoto.vue";
import Collection from "../components/PersonalPage/Collection.vue";
import Statics from "../components/PersonalPage/Statics.vue";
import DateViews from "../components/PersonalPage/Statics/DateViews.vue";
import TopPhotoViews from "../components/PersonalPage/Statics/TopPhotoViews.vue";
import CameraUse from "../components/PersonalPage/Statics/CameraUse.vue";

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
    //社群主頁
    {
      path: "/Community",
      name: "Community",
      component: () => import("../views/Community.vue"),
    },
    //個人主頁
    {
      name: "personalPage",
      component: () => import("../views/PersonalPage.vue"),
      children: [
        {
          path: "/Community/PersonalPage/:memberId/Photos",
          name: "photos",
          component: PhotoGrid,
          alias: ["/Community/PersonalPage"],
        },
        {
          path: "/Community/PersonalPage/:memberId/Albums",
          name: "albums",
          component: AlbumGrid,
        },
        {
          path: "/Community/PersonalPage/:memberId/Albums/:albumId/AlbumPhoto",
          name: "albumphoto",
          component: AlbumPhoto,
        },
        {
          path: "/Community/PersonalPage/:memberId/Collections",
          name: "collection",
          component: Collection,
        },
        {
          path: "/Community/PersonalPage/:memberId/Statics/DateViews",
          name: "dateViews",
          component: DateViews,
        },
        {
          path: "/Community/PersonalPage/:memberId/Statics/CameraUse",
          name: "cameraUse",
          component: CameraUse,
        },
        {
          path: "/Community/PersonalPage/:memberId/Statics/TopPhotoViews",
          name: "topPhotoViews",
          component: TopPhotoViews,
        },
      ],
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
          name: "ActivitySaveRecord",
          component: import("../views/Record/ActivitySaved.vue"),
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
