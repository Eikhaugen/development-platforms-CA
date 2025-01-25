import { compressAvatar, compressBanner } from "../../utils/imageCompression.js";
import { updateProfile } from "../../api/profile/update.js";

export async function handleProfileUpdateForm(event) {
  event.preventDefault();

  const bio = event.target.bio.value.trim();
  const avatarFile = event.target.avatar.files[0];
  const bannerFile = event.target.banner.files[0];

  let compressedAvatar = null;
  let compressedBanner = null;

  try {
    if (avatarFile) {
      compressedAvatar = await compressAvatar(avatarFile);
    }

    if (bannerFile) {
      compressedBanner = await compressBanner(bannerFile);
    }

    await updateProfile({ bio, avatarFile: compressedAvatar, bannerFile: compressedBanner });
    alert("Profile updated successfully!");
    window.location.reload();
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile. Please try again.");
  }
}
