import { fetchAllPosts } from "../../api/post/read.js";
import { renderPosts } from "../../ui/post/render.js";
import { handlePostForm } from "../../ui/post/create.js";
import { toggleVisibility } from "../../ui/global/toggle.js";
import { handleLogout } from "../../ui/auth/logout.js";

export default async function homeView() {
  try {
    const postForm = document.querySelector("#postForm");
    if (!postForm) {
      console.error("Post form not found!");
    } else {
      postForm.addEventListener("submit", handlePostForm);
    }

    const posts = await fetchAllPosts();
    renderPosts(posts, true);
  } catch (error) {
    console.error("Failed to load posts:", error);
    const container = document.getElementById("postsContainer");
    if (container) {
      container.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
    }
  }

    const menuToggle = document.querySelector("#menuToggleBTN");
    if (menuToggle) {
      menuToggle.addEventListener("click", (event) => {
        toggleVisibility("#mobileNavList");
      });
    }

    const logoutBTN = document.querySelectorAll(".logoutBTN");
    if (logoutBTN.length > 0) {
      logoutBTN.forEach((btn) => {
          btn.addEventListener("click", (event) => {
            event.preventDefault();
            handleLogout();
          });
      });
  } else {
      console.error("Logout Button not found!");
  }
  
}
