import Vue from "../web_modules/vue/dist/vue.esm.browser.min.js";
import router from "./router/index.js";

// Enable VueJS Debug
Vue.config.devtools = true;

new Vue({
  el: "#app",
  router,
  beforeMount() {
    console.log("App started")
  },
});
