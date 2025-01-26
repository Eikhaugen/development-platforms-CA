import { BASE_API_URL } from "../../api/constants.js";
import { auth } from "../../utils/firebaseConfig.js";

export async function createComment(postId, commentData) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const token = await user.getIdToken();

  const response = await fetch(`${BASE_API_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to post comment");
  }

  return await response.json();
}
