export function renderPosts(posts, containerId = "postsContainer") {
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
      postElement.classList.add("post");
  
      postElement.innerHTML = `
        <div class="post-header">
          <h3>${post.username || "Unknown User"}</h3>
          <p>${new Date(post.createdAt).toLocaleString()}</p>
        </div>
        <div class="post-content">
          <p>${post.content}</p>
        </div>
      `;
  
      container.appendChild(postElement);
    });
  }
  