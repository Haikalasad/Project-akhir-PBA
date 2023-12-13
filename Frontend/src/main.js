import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store"; // Sesuaikan ini dengan path ke file store Anda
import { registerPlugins } from '@/plugins';

const app = createApp(App);

// Pastikan Anda mendaftarkan Vuex dan Vue Router sebelum menggunakannya
app.use(store).use(router);

// Mendaftarkan plugin jika diperlukan
registerPlugins(app);

// Terakhir, mount aplikasi pada elemen dengan id "app"
app.mount("#app");
