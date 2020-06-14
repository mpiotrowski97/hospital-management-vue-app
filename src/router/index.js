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
import PatientsList from "../pages/dashboard/patients/PatientsList";
import PatientPreview from "../pages/dashboard/patients/PatientPreview";
import PatientCreate from "../pages/dashboard/patients/PatientCreate";
import OperationList from "../pages/dashboard/operations/OperationList";
import OperationPreview from "../pages/dashboard/operations/OperationPreview";
import OperationCreate from "../pages/dashboard/operations/OperationCreate";
import DoctorOperationsList from "../pages/dashboard/doctor/DoctorOperationsList";
import DoctorOperationPreview from "../pages/dashboard/doctor/DoctorOperationPreview";
import ChangeOperationTerm from "../pages/dashboard/doctor/ChangeOperationTerm";
import AddDetails from "../pages/dashboard/doctor/AddDetails";
import PatientOperationsList from "../pages/dashboard/patient/PatientOperationsList";

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
        },
        {
          path: 'patients',
          component: RouterPath,
          children: [
            {
              path: '',
              name: 'dashboard.patients.list',
              component: PatientsList
            },
            {
              path: 'create',
              name: 'dashboard.patients.create',
              component: PatientCreate
            },
            {
              path: ':id',
              name: 'dashboard.patients.preview',
              component: PatientPreview
            },
          ]
        },
        {
          path: 'operations',
          component: RouterPath,
          children: [
            {
              path: 'patient',
              component: RouterPath,
              children: [
                {
                  path: '',
                  name: 'dashboard.operations.patient.list',
                  component: PatientOperationsList
                }
              ]
            },
            {
              path: 'doctor',
              component: RouterPath,
              children: [
                {
                  path: '',
                  name: 'dashboard.operations.doctor.list',
                  component: DoctorOperationsList
                },
                {
                  path: ':id/change-term',
                  name: 'dashboard.operations.doctor.change-term',
                  component: ChangeOperationTerm
                },
                {
                  path: ':id/add-details',
                  name: 'dashboard.operations.doctor.add-details',
                  component: AddDetails
                },
                {
                  path: ':id',
                  name: 'dashboard.operations.doctor.preview',
                  component: DoctorOperationPreview
                }
              ]
            },
            {
              path: '',
              name: 'dashboard.operations.list',
              component: OperationList
            },
            {
              path: 'create',
              name: 'dashboard.operations.create',
              component: OperationCreate
            },
            {
              path: ':id',
              name: 'dashboard.operations.preview',
              component: OperationPreview
            }
          ]
        }
      ]
    }
  ]
});

export default router;
