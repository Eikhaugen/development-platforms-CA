import { fetchPostById } from "../../api/post/read.js";
import { renderSinglePost } from "../../ui/post/render.js";
import { fetchCommentsByPostId } from "../../api/comments/read.js";
import { renderComments } from "../../ui/comments/render.js";
import { handleCommentForm } from "../../ui/comments/create.js";
import { toggleVisibility } from "../../ui/global/toggle.js";

export default async function postView(postId) {
  try {
    // Fetch and render the post
    const post = await fetchPostById(postId);
    renderSinglePost(post);

    // Fetch and render comments
    const comments = await fetchCommentsByPostId(postId);
    renderComments(comments);

    // Attach the comment form handler
    const commentForm = document.querySelector("#commentForm");
    if (commentForm) {
      commentForm.dataset.postId = postId;
      commentForm.addEventListener("submit", handleCommentForm);
    } else {
      console.error("Comment form not found!");
    }
  } catch (error) {
    console.error("Failed to load post or comments:", error);
    const container = document.getElementById("postContainer");
    if (container) {
      container.innerHTML = "<p>Failed to load post. Please try again later.</p>";
    }
  }
  const menuToggle = document.querySelector("#menuToggleBTN");
  if (menuToggle) {
    menuToggle.addEventListener("click", (event) => {
      toggleVisibility("#mobileNavList");
    });
  }
}
