export function renderPosts(posts, asAnchors = false, containerId = "postsContainer") {
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
    const postElement = document.createElement(asAnchors ? "a" : "div");

    if (asAnchors) {
      postElement.href = `/post/?postId=${post.id}`;
      postElement.classList.add("post-link");
    }

    postElement.classList.add(
      "flex",
      "items-start",
      "gap-4",
      "p-4",
      "bg-white",
      "dark:bg-gray-800",
      "border-b",
      "border-gray-500",
      "border-solid"
    );

    postElement.innerHTML = `
      <div class="w-12 h-12">
        <img src="${post.avatar || "/default-avatar.svg"}" alt="User Avatar"
          class="w-full h-full rounded-full bg-gray-300 dark:bg-gray-700">
      </div>
      <div class="flex-1 space-y-3">
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-900 dark:text-gray-200">${post.username || "Unknown User"}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">${new Date(post.createdAt).toLocaleString()}</span>
        </div>
        <p class="text-gray-800 dark:text-gray-300">${post.content}</p>
        ${post.image ? `
          <div class="w-full">
            <img src="${post.image}" alt="Post Image" class="w-full rounded-md bg-gray-200 dark:bg-gray-700">
          </div>` : ""}
      </div>
    `;

    container.appendChild(postElement);
  });
}



export function renderSinglePost(post, containerId = "postContainer") {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error("Post container not found!");
    return;
  }

  container.innerHTML = `
    <div class="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <!-- Post Header -->
      <div class="flex items-center gap-4">
        <img src="${post.avatar || '/default-avatar.svg'}" alt="${post.username || "Unknown User"}'s Avatar"
          class="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700">
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-200">${post.username || "Unknown User"}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">${new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <!-- Post Content -->
      <div class="text-gray-800 dark:text-gray-300">
        <p>${post.content}</p>
      </div>

      <!-- Post Image -->
      ${post.image ? `
      <div>
        <img src="${post.image}" alt="Post Image" class="w-full rounded-md bg-gray-200 dark:bg-gray-700">
      </div>` : ""}
    </div>
  `;
}


