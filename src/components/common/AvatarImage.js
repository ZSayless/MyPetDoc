import React, { useState } from "react";
import defaultAvatar from "../../assets/img/default-avatar.png"; // Thêm ảnh default vào thư mục assets

function AvatarImage({ src, alt, className }) {
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
    }
  };

  const getAvatarSrc = () => {
    if (error || !src || src === "default-avatar.png") {
      return defaultAvatar;
    }
    return src;
  };

  return (
    <img
      src={getAvatarSrc()}
      alt={alt || "User avatar"}
      className={className}
      onError={handleError}
    />
  );
}

export default AvatarImage;
