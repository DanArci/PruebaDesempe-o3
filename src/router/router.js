import loginView from "@/views/loginView";
import homeView from "@/views/homeView";
import adminView from "@/views/admin";
import { isAuthenticated } from "@/utils";

const routes = {
  "/": loginView,
  "/home": homeView,
  "/admin": adminView,
};

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");

  let path = window.location.pathname;

  const view = routes[path] || loginView;

  app.innerHTML = view();
};

window.addEventListener("popstate", router);
