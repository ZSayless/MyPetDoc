const handleLogin = async (values) => {
  try {
    // Nếu là admin account
    if (values.email === "admin@example.com") {
      const adminData = {
        id: "admin",
        name: "Admin", // Đảm bảo có trường name
        email: values.email,
        role: "admin"
      };
      dispatch(loginUser(adminData));
    } else {
      // Normal user login
      dispatch(loginUser(values));
    }
  } catch (error) {
    console.error(error);
  }
}; 