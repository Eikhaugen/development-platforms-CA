import { BASE_API_URL } from "../constants.js";
import { auth } from "../../utils/firebaseConfig.js";

export async function deletePost(postId) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const token = await user.getIdToken();

  const response = await fetch(`${BASE_API_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete post");
  }

  return await response.json();
}

