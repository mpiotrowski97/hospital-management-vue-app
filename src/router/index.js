import Vue from "vue";
import Router from "vue-router";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import UserList from "../pages/dashboard/users/UserList";
import RouterPath from "../components/shared/RouterPath";
import store from '../store';
import UserPreview from "../pages/dashboard/users/UserPreview";
import UserCreate from "../pages/dashboard/users/UserCreate";

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
              name: 'dashboard.users.list',
              component: UserList
            },
            {
              path: ':id/preview',
              name: 'dashboard.users.preview',
              component: UserPreview
            },
            {
              path: 'create',
              name: 'dashboard.users.create',
              component: UserCreate
            }
          ]
        }
      ]
    }
  ]
});

export default router;
