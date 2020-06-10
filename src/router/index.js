import Vue from "vue";
import Router from "vue-router";
import Login from "../pages/auth/Login";

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'auth.login',
      component: Login
    },
  ]
});

export default router;
