import Vue from "vue";
import VueRouter from "vue-router";
import layout from "@/components/layout/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: layout,
    children: [
      {
        path: "/",
        alias: "/home",
        name: "home",
        meta: {
          title: "首页"
        }
      },
      {
        path: "/department/:id",
        name: "department"
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/Index.vue")
  },
  {
    path: "*",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "@/views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
