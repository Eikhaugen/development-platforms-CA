import { BASE_API_URL } from "../constants.js";

export async function fetchCommentsByPostId(postId) {
  try {
    const response = await fetch(`${BASE_API_URL}/posts/${postId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch comments");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

