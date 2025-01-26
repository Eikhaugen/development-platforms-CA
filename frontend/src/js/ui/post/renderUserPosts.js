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
    postElement.classList.add(
      "flex",
      "items-start",
      "gap-4",
      "p-4",
      "bg-white",
      "dark:bg-gray-800",
      "border-b",
      "border-gray-500",
      "border-solid",
      "relative"
    );

    postElement.innerHTML = `
      <!-- Delete Button -->
      <button class="delete-post-btn absolute top-4 right-4 px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300" data-post-id="${post.id}">
        Delete
      </button>
      
      <!-- Post Avatar -->
      <div class="w-12 h-12">
        <img src="${post.avatar || '/default-avatar.svg'}" alt="User Avatar"
          class="w-full h-full rounded-full bg-gray-300 dark:bg-gray-700">
      </div>

      <!-- Post Content -->
      <div class="flex-1 space-y-3">
        <!-- Post Header -->
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-900 dark:text-gray-200">${post.username || "Unknown User"}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">${new Date(post.createdAt).toLocaleString()}</span>
        </div>

        <!-- Post Body -->
        <p class="text-gray-800 dark:text-gray-300">${post.content}</p>
        
        <!-- Post Image -->
        ${post.image ? `
          <div class="w-full">
            <img src="${post.image}" alt="Post Image" class="w-full rounded-md bg-gray-200 dark:bg-gray-700">
          </div>` : ""}
      </div>
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
