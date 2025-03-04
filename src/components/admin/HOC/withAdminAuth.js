import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAdminAuth = (WrappedComponent) => {
  return function WithAdminAuthComponent(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        navigate("/");
        return;
      }

      try {
        const user = JSON.parse(userStr);
        if (!user || user.role !== "ADMIN") {
          navigate("/");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/");
      }
    }, [navigate]);

    // Kiểm tra ngay khi render
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return null;
    }

    try {
      const user = JSON.parse(userStr);
      if (!user || user.role !== "ADMIN") {
        return null;
      }
    } catch (error) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
