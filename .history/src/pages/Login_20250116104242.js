const handleLogin = async (values) => {
  try {
    // Nếu là admin account
    if (values.email === "admin@example.com") {
      const adminData = {
        id: "admin",
        name: "Admin User", // Sửa tên admin để đồng nhất
        displayName: "Admin User", // Thêm displayName nếu cần
        email: "admin@example.com",
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