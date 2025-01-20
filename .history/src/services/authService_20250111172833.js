export const registerWithGoogle = async (userData) => {
  try {
    // Gọi API đăng ký với Google
    const response = await fetch("/api/auth/google-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error registering with Google:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
