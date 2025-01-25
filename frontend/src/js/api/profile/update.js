import { BASE_API_URL } from "../constants.js";
import { auth } from "../../utils/firebaseConfig.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function updateProfile({ bio, avatarFile, bannerFile }) {
    const user = auth.currentUser;
  
    if (!user) {
      throw new Error("User not logged in");
    }
  
    const updates = { bio };
    const storage = getStorage();
  
    if (avatarFile) {
      const avatarRef = ref(storage, `avatars/${user.uid}-${Date.now()}`);
      const avatarUploadResult = await uploadBytes(avatarRef, avatarFile);
      updates.avatar = await getDownloadURL(avatarUploadResult.ref);
    }
  
    if (bannerFile) {
      const bannerRef = ref(storage, `banners/${user.uid}-${Date.now()}`);
      const bannerUploadResult = await uploadBytes(bannerRef, bannerFile);
      updates.banner = await getDownloadURL(bannerUploadResult.ref);
    }
  
    const response = await fetch(`${BASE_API_URL}/users/${user.uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await user.getIdToken()}`,
      },
      body: JSON.stringify(updates),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update profile");
    }
  
    return await response.json();
  }
