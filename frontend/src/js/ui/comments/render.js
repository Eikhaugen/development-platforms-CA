export function renderComments(comments, containerId = "commentsContainer") {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error("Comments container not found!");
    return;
  }

  container.innerHTML = "";

  if (comments.length === 0) {
    container.innerHTML = "<p>No comments yet. Be the first to comment!</p>";
    return;
  }

  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    commentElement.innerHTML = `
      <div class="comment-header">
        <h4>${comment.username || "Anonymous"}</h4>
        <p>${new Date(comment.createdAt).toLocaleString()}</p>
      </div>
      <div class="comment-content">
        <p>${comment.content}</p>
      </div>
    `;

    container.appendChild(commentElement);
  });
}

  