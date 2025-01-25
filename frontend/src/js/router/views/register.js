import { handleRegisterForm } from "../../ui/auth/register.js";

export default function registerView() {
  const registerForm = document.querySelector("#sign-up-form");

  if (!registerForm) {
    console.error("Register form not found!");
    return;
  }

  registerForm.addEventListener("submit", handleRegisterForm);
}
