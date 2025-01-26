export function renderUserProfile(profile) {
  const profileSection = document.getElementById("profileSection");

  if (!profileSection) {
    console.error("Profile section not found!");
    return;
  }

  profileSection.innerHTML = `
    <!-- Banner Image -->
    <img src="${profile.banner || '/default-banner.jpg'}" alt="Banner" class="w-full h-40 object-cover rounded-lg">
    
    <!-- Profile Section -->
    <div class="relative mt-6">
      <!-- Avatar -->
      <img src="${profile.avatar || '/default-avatar.png'}" alt="Profile Avatar"
        class="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-gray-800 absolute -top-12 left-4">
      
      <div class="ml-32">
        <!-- Username and Edit Button -->
        <div class="flex justify-between items-center">
          <span class="text-2xl font-semibold text-gray-900 dark:text-gray-200">${profile.username || "Anonymous"}</span>
          <button id="editProfileBtn"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary">
            Edit Profile
          </button>
        </div>

        <!-- Bio -->
        <p class="mt-2 text-gray-700 dark:text-gray-300">
          ${profile.bio || "This user hasn't added a bio yet."}
        </p>

        <!-- Join Date -->
        <div class="mt-4 flex items-center space-x-4 text-gray-600 dark:text-gray-400">
          <span><i class="fa-regular fa-calendar"></i> Joined ${new Date(profile.createdAt).toLocaleDateString()}</span>
        </div>

        <!-- Following and Followers (Placeholder Values) -->
        <div class="mt-4 flex space-x-6">
          <span class="dark:text-gray-200"><b>0</b> Following</span>
          <span class="dark:text-gray-200"><b>0</b> Followers</span>
        </div>
      </div>
    </div>
  `;
}
