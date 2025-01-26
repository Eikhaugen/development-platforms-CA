import { fetchUserProfile } from "../../api/profile/read.js";
import { renderUserProfile } from "../../ui/profile/render.js";
import { handleProfileUpdateForm } from "../../ui/profile/update.js";
import { toggleVisibility } from "../../ui/global/toggle.js";
import { fetchUserPosts } from "../../api/post/read.js";
import { renderUserPosts } from "../../ui/post/renderUserPosts.js";

export default async function myProfileView() {
  try {
    const profile = await fetchUserProfile();
    renderUserProfile(profile);

    const editProfileBtn = document.getElementById("editProfileBtn");
    if (editProfileBtn) {
      editProfileBtn.addEventListener("click", () => toggleVisibility("#editProfileContainer"));
    } else {
      console.error("Edit Profile button not found!");
    }

    const posts = await fetchUserPosts();
    renderUserPosts(posts);
  } catch (error) {
    console.error("Failed to load profile or posts:", error);
    const profileSection = document.getElementById("profileSection");
    if (profileSection) {
      profileSection.innerHTML = "<p>Failed to load profile or posts. Please try again later.</p>";
    }
  }

  const editProfileForm = document.querySelector("#editProfileForm");
  if (editProfileForm) {
    editProfileForm.addEventListener("submit", async (event) => {
      await handleProfileUpdateForm(event);
      editProfileForm.reset();
      toggleVisibility("#editProfileContainer");
    });
  }
}
