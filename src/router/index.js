import Vue from "vue";
import Router from "vue-router";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import UserList from "../pages/dashboard/users/UserList";
import RouterPath from "../components/shared/RouterPath";
import store from '../store';
import UserPreview from "../pages/dashboard/users/UserPreview";
import UserCreate from "../pages/dashboard/users/UserCreate";
import UserEdit from "../pages/dashboard/users/UserEdit";
import Profile from "../pages/dashboard/Profile";
import ProfileEdit from "../pages/dashboard/ProfileEdit";

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
      redirect: '/dashboard/profile',
      component: Dashboard,
      beforeEnter(to, from, next) {
        store.getters['isAuthenticated'] ? next() : next({name: 'auth.login'})
      },
      children: [
        {
          path: 'profile',
          component: RouterPath,
          children: [
            {
              path: '',
              name: 'dashboard.profile',
              component: Profile
            },
            {
              path: 'edit',
              name: 'dashboard.profile.edit',
              component: ProfileEdit
            }
          ]
        },
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
              path: 'create',
              name: 'dashboard.users.create',
              component: UserCreate
            },
            {
              path: ':id/preview',
              name: 'dashboard.users.preview',
              component: UserPreview
            },
            {
              path: ':id/edit',
              name: 'dashboard.users.edit',
              component: UserEdit
            },
          ]
        }
      ]
    }
  ]
});

export default router;
