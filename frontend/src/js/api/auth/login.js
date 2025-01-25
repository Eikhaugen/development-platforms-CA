import { auth } from "../../utils/firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const token = await userCredential.user.getIdToken();

    localStorage.setItem("token", token);

    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}
