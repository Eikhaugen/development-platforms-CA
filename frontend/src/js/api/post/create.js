import { BASE_API_URL } from "../constants.js";
import { storage } from "../../utils/firebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function createPost({ userId, content, imageFile }) {
  let imageUrl = null;

  if (imageFile) {
    const imageRef = ref(storage, `posts/${Date.now()}-${imageFile.name}`);
    const uploadResult = await uploadBytes(imageRef, imageFile);
    imageUrl = await getDownloadURL(uploadResult.ref);
  }

  const response = await fetch(`${BASE_API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      content,
      image: imageUrl,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create post");
  }

  return await response.json();
}

