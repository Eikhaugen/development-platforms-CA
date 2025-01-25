export function renderUserProfile(profile) {
    const profileSection = document.getElementById("profileSection");
  
    if (!profileSection) {
      console.error("Profile section not found!");
      return;
    }
  
    profileSection.innerHTML = `
      <img src="${profile.banner || ''}" alt="Banner" class="profile-banner">
      <div>
        <img src="${profile.avatar || ''}" alt="Profile Avatar" class="profile-avatar">
        <div>
          <div>
            <span>${profile.username || 'Anonymous'}</span>
            <button id="editProfileBtn">Edit Profile</button>
          </div>
          <p>${profile.bio || ''}</p>
          <div>
            <span>Joined: ${new Date(profile.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    `;
  }
  