import { loginUser } from "../../api/auth/login.js";

export async function handleLoginForm(event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
    const user = await loginUser(email, password);

    console.log("User logged in successfully:", user);
    alert("Login successful!");

    window.location.href = "/feed/";
  } catch (error) {
    console.error("Login failed:", error);
    alert("Failed to log in: " + error.message);
  }
}
