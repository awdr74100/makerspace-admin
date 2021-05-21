import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

import './plugins/vue-axios';
import './plugins/vue-fontawesome';
import './plugins/vue-js-modal';
import './plugins/vue-loading-overlay';
import './plugins/vue-toastification';

import 'bootstrap/dist/js/bootstrap.esm';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
