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
    } else {
      postElement.classList.add("post");
    }

    postElement.innerHTML = `
      <div class="post-header">
        <h3>${post.username || "Unknown User"}</h3>
        <p>${new Date(post.createdAt).toLocaleString()}</p>
      </div>
      <div class="post-content">
        <p>${post.content}</p>
        ${post.image ? `<img src="${post.image}" alt="Post Image" class="post-image">` : ""}
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
    <div class="post">
      <div class="post-header">
        <h3>${post.username || "Unknown User"}</h3>
        <p>${new Date(post.createdAt).toLocaleString()}</p>
      </div>
      <div class="post-content">
        <p>${post.content}</p>
        ${post.image ? `<img src="${post.image}" alt="Post Image" class="post-image">` : ""}
      </div>
    </div>
  `;
}

