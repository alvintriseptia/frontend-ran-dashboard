import { createApp } from "vue";
import App from "@/App.vue";
import routes from "@/router/router";
import "element-plus/dist/index.css";
import "@/styles/index.css";
import ElementPlus from "element-plus";

const app = createApp(App);
app.use(ElementPlus);
app.use(routes);
app.mount("#app");
