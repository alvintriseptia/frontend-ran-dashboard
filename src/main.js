import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import { createApp } from "vue";
import "element-plus/dist/index.css";

import App from "@/App.vue";
import routes from "@/router/router";
import "@/styles/index.css";

const pinia = createPinia();
const app = createApp(App);
app.use(ElementPlus);
app.use(pinia);
app.use(routes);

app.mount("#app");
