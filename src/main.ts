import { createApp } from "vue";
import App from "./App.vue";
import { registerPlugins } from "@/plugins";
import ToastPlugin from "vue-toast-notification";
import store from "@/store";
import router from "@/router";

const app = createApp(App);

registerPlugins(app);

app.use(store).use(router).use(ToastPlugin).mount("#app");
