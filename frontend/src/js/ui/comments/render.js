export function renderComments(comments, containerId = "commentsContainer") {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error("Comments container not found!");
    return;
  }

  container.innerHTML = "";

  if (comments.length === 0) {
    container.innerHTML = `<p class="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>`;
    return;
  }

  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add(
      "flex",
      "items-start",
      "gap-4",
      "p-4",
      "bg-gray-100",
      "dark:bg-gray-700",
      "rounded-lg",
      "shadow-sm"
    );

    commentElement.innerHTML = `
      <!-- Avatar -->
      <div class="w-10 h-10">
        <img src="${comment.avatar || '/default-avatar.svg'}" alt="${comment.username || "Anonymous"}'s Avatar"
          class="w-full h-full rounded-full bg-gray-300 dark:bg-gray-600">
      </div>

      <!-- Comment Content -->
      <div class="flex-1 space-y-2">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <h4 class="font-semibold text-gray-900 dark:text-gray-200">${comment.username || "Anonymous"}</h4>
          <span class="text-sm text-gray-500 dark:text-gray-400">${new Date(comment.createdAt).toLocaleString()}</span>
        </div>

        <!-- Body -->
        <p class="text-gray-800 dark:text-gray-300">${comment.content}</p>
      </div>
    `;

    container.appendChild(commentElement);
  });
}
