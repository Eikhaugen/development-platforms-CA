import { BASE_API_URL } from "../constants.js";
import { auth } from "../../utils/firebaseConfig.js";

export async function fetchAllPosts() {
  try {
    const response = await fetch(`${BASE_API_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch posts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function fetchPostById(postId) {
  try {
    const response = await fetch(`${BASE_API_URL}/posts/${postId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

export async function fetchUserPosts() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  try {
    const response = await fetch(`${BASE_API_URL}/posts?userId=${user.uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch posts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}

