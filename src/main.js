import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./plugins/element.js";
import "./permission.js";
import "normalize.css";
import "@/assets/scss/global.scss";
import "@/assets/scss/element-coverage.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
