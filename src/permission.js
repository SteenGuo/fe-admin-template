import router from "./router";
import NProgress from "nprogress";
import { getToken } from "@/assets/js/auth";
import store from "@/store";

router.beforeEach((to, from, next) => {
  NProgress.start();
  const hasToken = getToken();
  if (to.name == "login") {
    if (hasToken) {
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    if (hasToken) {
      /*添加tab*/
      let _tab = {
        title: to.meta.title || "loading...",
        name: !to.params.id ? to.name : `${to.name}-${to.params.id}`,
        route: {
          name: to.name,
          params: to.params,
          query: to.query
        }
      };
      store.commit("tabAdd", _tab);
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
