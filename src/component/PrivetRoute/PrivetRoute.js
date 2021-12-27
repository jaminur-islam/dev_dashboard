import { CircularProgress } from "@material-ui/core";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivetRoute = ({ children, ...rest }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "200px" }}>
        <CircularProgress />
      </div>
    );
  }
  if (user.email) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

export default PrivetRoute;
