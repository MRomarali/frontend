import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import VueResource from "vue-resource"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueResource);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')