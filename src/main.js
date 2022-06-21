import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import commonComponents from "./components";
import "@/assets/styles/tailwind.css";

const app = createApp(App);

commonComponents.forEach((component) => {
  app.component(component.name, component);
});

app.use(store).mount("#app");
