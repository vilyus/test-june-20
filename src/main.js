import Vue from 'vue'

import setupBuefy from './plugins/buefy'
import App from './App.vue'
import store from './store'

setupBuefy(Vue)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
