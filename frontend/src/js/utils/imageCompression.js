import imageCompression from "browser-image-compression";

export async function compressImage(file, maxSizeMB = 0.5) {
  const options = {
    maxSizeMB,
    maxWidthOrHeight: 1920, 
    useWebWorker: true,
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
}

export async function compressBanner(file) {
  const options = {
    maxSizeMB: 0.5,
    useWebWorker: true,
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Error compressing banner:", error);
    throw error;
  }
}

export async function compressAvatar(file) {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 200,
    useWebWorker: true,
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Error compressing avatar:", error);
    throw error;
  }
}

