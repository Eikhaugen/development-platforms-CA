import { BASE_API_URL } from "../constants.js";

export async function createComment(postId, { userId, content }) {
  try {
    const response = await fetch(`${BASE_API_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        content,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to post comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
}
