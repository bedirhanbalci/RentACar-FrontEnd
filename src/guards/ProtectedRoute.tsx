import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const roleStr = localStorage.getItem("auth");
    if (!roleStr) {
      navigate("/");
    } else {
      const role = JSON.parse(roleStr);
      if (!role || !role.role || !role.role.includes("USER")) {
        navigate("/");
      }
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
