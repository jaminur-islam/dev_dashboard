import React, { createContext } from "react";
import useFirebase from "../Hooks/useFirebase";

export const AuthProvider = createContext();
const AuthContext = ({ children }) => {
  const allcontext = useFirebase();
  return (
    <AuthProvider.Provider value={allcontext}>{children}</AuthProvider.Provider>
  );
};

export default AuthContext;
