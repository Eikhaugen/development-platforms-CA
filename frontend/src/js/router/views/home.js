import { fetchAllPosts } from "../../api/post/read.js";
import { renderPosts } from "../../ui/post/renderPosts.js";

export default async function homeView() {
  try {
    const posts = await fetchAllPosts();

    renderPosts(posts);
  } catch (error) {
    console.error("Failed to load posts:", error);
    const container = document.getElementById("postsContainer");
    if (container) {
      container.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
    }
  }
}
