import { CircularProgress } from "@mui/material";
import React, { createContext } from "react";
import useFirebase from "../Hooks/useFirebase";

export const AuthProvider = createContext();
const AuthContext = ({ children }) => {
  const allcontext = useFirebase();
  const { loading } = useFirebase();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "200px" }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <AuthProvider.Provider value={allcontext}>{children}</AuthProvider.Provider>
  );
};

export default AuthContext;
