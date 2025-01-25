import { BASE_API_URL } from "../constants.js";

export async function registerUser({ uid, username, profilePicture, bio }) {
  try {
    const response = await fetch(`${BASE_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, username, profilePicture, bio }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
