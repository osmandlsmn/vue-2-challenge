import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
import VModal from "vue-js-modal";

import "@/styles/tailwind.css";

Vue.use(VModal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
