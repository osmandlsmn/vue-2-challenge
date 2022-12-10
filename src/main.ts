import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
import VModal from "vue-js-modal";

import VueVirtualScroller from "vue-virtual-scroller";

import "@/styles/tailwind.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

Vue.use(VModal);
Vue.use(VueVirtualScroller);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
