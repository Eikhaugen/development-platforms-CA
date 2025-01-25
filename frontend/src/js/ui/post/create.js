import { auth } from "../../utils/firebaseConfig.js";
import { compressImage } from "../../utils/imageCompression.js";
import { createPost } from "../../api/post/create.js";

export async function handlePostForm(event) {
  event.preventDefault();

  const postContent = event.target.postContent.value.trim();
  const postImageInput = event.target.postImage;

  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged in to create a post!");
    return;
  }

  const userId = user.uid;

  if (!postContent && !postImageInput.files.length) {
    alert("Post content or image is required!");
    return;
  }

  let compressedImage = null;

  if (postImageInput.files.length) {
    try {
      compressedImage = await compressImage(postImageInput.files[0]);
    } catch (error) {
      console.error("Error compressing image:", error);
      alert("Failed to compress image. Please try again.");
      return;
    }
  }

  try {
    console.log("userId:", userId);
    console.log("content:", postContent);

    await createPost({
      userId, 
      content: postContent,
      imageFile: compressedImage, 
    });

    alert("Post created successfully!");
    window.location.reload(); 
  } catch (error) {
    console.error("Error creating post:", error);
    alert("Failed to create post. Please try again.");
  }
}

