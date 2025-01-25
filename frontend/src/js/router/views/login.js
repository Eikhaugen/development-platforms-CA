import { handleLoginForm } from "../../ui/auth/login.js";

  const loginForm = document.querySelector("#sign-in-form");

  loginForm.addEventListener("submit", handleLoginForm);

