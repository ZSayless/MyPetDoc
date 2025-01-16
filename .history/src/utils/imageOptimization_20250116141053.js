export const getOptimizedImageUrl = (url, width = 800) => {
  // Nếu dùng Cloudinary
  if (url.includes("cloudinary")) {
    return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);
  }
  return url;
};
