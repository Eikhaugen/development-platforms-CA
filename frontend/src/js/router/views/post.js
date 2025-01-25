import { fetchPostById } from "../../api/post/read.js";
import { renderSinglePost } from "../../ui/post/renderPosts.js";
import { handleCommentForm } from "../../ui/comments/create.js";

export default async function postView(postId) {
  try {
    const post = await fetchPostById(postId);
    renderSinglePost(post);

    const commentForm = document.querySelector("#commentForm");
    if (commentForm) {
      commentForm.dataset.postId = postId; 
      commentForm.addEventListener("submit", handleCommentForm);
    } else {
      console.error("Comment form not found!");
    }
  } catch (error) {
    console.error("Failed to load post:", error);
    const container = document.getElementById("postContainer");
    if (container) {
      container.innerHTML = "<p>Failed to load post. Please try again later.</p>";
    }
  }
}
