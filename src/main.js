import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from "./router";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import {extend} from "vee-validate";
import {required} from "vee-validate/dist/rules";
import {CHECK_AUTH} from "./store/actions.type";
import axios from 'axios';

extend('required', {...required, message: "Pole wymagane"});

Vue.config.productionTip = false

Vue.component('validation-observer', ValidationObserver);
Vue.component('validation-provider', ValidationProvider);

axios.interceptors.request.use(function (config) {
  config.headers = {
    ...config.headers, ...{
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': `${document.cookie}`.replace('XSRF-TOKEN=', '')
    }
  };
  config.withCredentials = true;
  return config;
});

router.beforeEach((to, from, next) =>
  store.dispatch(CHECK_AUTH).then(next).catch(() => {
    router.push({name: 'auth.login'})
  })
);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
