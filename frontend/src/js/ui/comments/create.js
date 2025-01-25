import { createComment } from "../../api/comments/create.js";
import { auth } from "../../utils/firebaseConfig.js";

export async function handleCommentForm(event) {
  event.preventDefault();

  const commentContent = event.target.comment.value.trim();
  const postId = event.target.dataset.postId;
  const user = auth.currentUser;

  if (!user) {
    alert("You must be logged in to comment!");
    return;
  }

  if (!commentContent) {
    alert("Comment content is required!");
    return;
  }

  try {
    await createComment(postId, {
      userId: user.uid,
      content: commentContent,
    });

    alert("Comment posted successfully!");
    event.target.reset(); 
    window.location.reload(); 
  } catch (error) {
    console.error("Error posting comment:", error);
    alert("Failed to post comment. Please try again.");
  }
}
