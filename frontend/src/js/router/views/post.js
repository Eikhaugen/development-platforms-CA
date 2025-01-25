import { fetchPostById } from "../../api/post/read.js";
import { renderSinglePost } from "../../ui/post/renderPosts.js";

export default async function postView(postId) {
  try {
    const post = await fetchPostById(postId);
    renderSinglePost(post);
  } catch (error) {
    console.error("Failed to load post:", error);
    const container = document.getElementById("postContainer");
    if (container) {
      container.innerHTML = "<p>Failed to load post. Please try again later.</p>";
    }
  }
}
