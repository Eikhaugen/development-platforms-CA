import { deletePost } from "../../api/post/delete.js";
export function renderUserPosts(posts, containerId = "postContainer") {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error("Posts container not found!");
    return;
  }

  container.innerHTML = "";

  if (posts.length === 0) {
    container.innerHTML = "<p>No posts available.</p>";
    return;
  }

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("user-post");

    postElement.innerHTML = `
      <button class="delete-post-btn" data-post-id="${post.id}">Delete</button>
      <a href="/post/?postId=${post.id}" class="post-link">
      <div class="post-header">
        <h3>${post.username || "Unknown User"}</h3>
        <p>${new Date(post.createdAt).toLocaleString()}</p>
      </div>
      <div class="post-content">
        <div>${post.content}</div>
        ${post.image ? `<img src="${post.image}" alt="Post Image" class="post-image">` : ""}
      </div>
      </a>
    `;

    container.appendChild(postElement);

    const deleteButton = postElement.querySelector(".delete-post-btn");
    deleteButton.addEventListener("click", async (e) => {
      e.stopPropagation();
      const postId = deleteButton.dataset.postId;

      if (confirm("Are you sure you want to delete this post?")) {
        try {
          await deletePost(postId);
          postElement.remove();
          alert("Post deleted successfully!");
        } catch (error) {
          console.error("Failed to delete post:", error);
          alert("Failed to delete post. Please try again.");
        }
      }
    });
  });
}
