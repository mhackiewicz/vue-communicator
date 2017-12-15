import './assets/styles/style.css';
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material';
import store from './vuex/store'
// import socketio from 'socket.io-client';
// import VueSocketIO from 'vue-socket.io';

Vue.use(VueMaterial)

// export const SocketInstance = socketio('http://localhost:3000/');
// Vue.use(VueSocketIO, SocketInstance)

Vue.material.registerTheme({
  default: {
    primary: 'deep-orange',
    accent: 'red'
  }  
})


Vue.config.productionTip = true

localStorage.removeItem('auth-key');

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
