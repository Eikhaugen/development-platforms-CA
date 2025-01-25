import './src/css/style.css'
import router from "./src/js/router/index.html";

document.addEventListener('DOMContentLoaded', () => {
  router(window.location.pathname);
});
