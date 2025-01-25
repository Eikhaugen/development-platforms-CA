import { auth } from "../../utils/firebaseConfig.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { registerUser } from "../../api/auth/register.js";

export async function handleRegisterForm(event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;
  const confirmPassword = event.target["confirm-password"].value;
  const username = event.target.username.value;
  const profilePicture = event.target.profilePicture?.value;
  const bio = event.target.bio?.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username,
      photoURL: profilePicture || "",
    });

    const result = await registerUser({
      uid: user.uid,
      username,
      profilePicture: profilePicture || null,
      bio: bio || "",
    });

    console.log("User registered successfully:", result);
    alert("Registration successful!");
    window.location.href = "../login/";
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Failed to register: " + error.message);
  }
}
