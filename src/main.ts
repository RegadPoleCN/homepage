import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import { initSentry } from './utils/sentry';

const app = createApp(App);
const pinia = createPinia();

initSentry(app);

app.use(pinia);
app.mount('#app');
