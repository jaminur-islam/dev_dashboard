import { CircularProgress } from "@mui/material";
import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
  const { isAdmin, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "200px" }}>
        <CircularProgress />
      </div>
    );
  }
  if (!user.email) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (isAdmin) {
    return children;
  } else {
    return (
      <div style={{ textAlign: "center", color: "blue" }}>
        <h1>Wait until the request is accepted...</h1>
        <Link to="/login"> Back to login</Link>
      </div>
    );
  }
};

export default AdminRoute;
