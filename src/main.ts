import { createSSRApp } from "vue";
import App from "./App.vue";
// import store from './store'
// import regular from './utils/regular.js'
// import { httpApi } from '@/utils/http'
import uView from 'vk-uview-ui'


export function createApp() {
  const app = createSSRApp(App);
// app.config.globalProperties.$store = store
// app.config.globalProperties.$rules = regular
// app.config.globalProperties.$http = httpApi

app.use(uView)

  return {
    app,
  };
}
