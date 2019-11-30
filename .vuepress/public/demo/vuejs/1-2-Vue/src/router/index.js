import Vue from "../../web_modules/vue/dist/vue.esm.browser.min.js";
import VueRouter from "../../web_modules/vue-router/dist/vue-router.esm.browser.min.js";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: () => import("/src/views/tapotap.js") }
];

const router = new VueRouter({
  routes: routes
});

export default router;
