import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'mdb-vue-ui-kit/css/mdb.min.css';
import Toaster from "@meforma/vue-toaster";

createApp(App).use(router).use(Toaster).mount('#app')
