import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import vueaxios from 'vue-axios';

const vueapp = createApp(App);
vueapp.use(vueaxios, axios);
vueapp.use(router);
vueapp.mount('#app')
