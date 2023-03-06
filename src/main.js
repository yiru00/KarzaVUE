import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

//引入sweetalert2 設定
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const options = {
  confirmButtonColor: "#8991a9",
  cancelButtonColor: "#D39899",
  confirmButtonText:"確定",
  cancelButtonText:"取消"

};



const app = createApp(App);
app.use(VueSweetalert2,options);
app.use(router);

app.mount("#app");
