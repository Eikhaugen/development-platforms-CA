import { BASE_API_URL } from "../constants.js";
import { auth } from "../../utils/firebaseConfig.js";

export async function fetchUserProfile() {
    try {
      const user = await new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          unsubscribe();
          resolve(authUser);
        }, reject);
      });
  
      if (!user) {
        throw new Error("User not logged in");
      }
  
      const response = await fetch(`${BASE_API_URL}/users/${user.uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user profile");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }
