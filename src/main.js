import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from "./router";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import {extend} from "vee-validate";
import {required} from "vee-validate/dist/rules";

extend('required', {...required, message: "Pole wymagane"});

Vue.config.productionTip = false

Vue.component('validation-observer', ValidationObserver);
Vue.component('validation-provider', ValidationProvider);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
