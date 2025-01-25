import { handleLoginForm } from "../../ui/auth/login.js";

export default function loginView() {
  const loginForm = document.querySelector("#sign-in-form");

  if (!loginForm) {
    console.error("Login form not found!");
    return;
  }

  loginForm.addEventListener("submit", handleLoginForm);
}
