import Vue from "vue";
import Router from "vue-router";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import UserList from "../pages/dashboard/users/UserList";
import RouterPath from "../components/shared/RouterPath";
import store from '../store';

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'auth.login',
      component: Login,
      beforeEnter(to, from, next) {
        !store.getters['isAuthenticated'] ? next() : next({name: 'dashboard'})
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/dashboard/users',
      component: Dashboard,
      beforeEnter(to, from, next) {
        store.getters['isAuthenticated'] ? next() : next({name: 'auth.login'})
      },
      children: [
        {
          path: 'users',
          component: RouterPath,
          children: [
            {
              path: '',
              component: UserList
            }
          ]
        }
      ]
    }
  ]
});

export default router;
