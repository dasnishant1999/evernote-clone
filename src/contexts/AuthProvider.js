import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [currentUser, setcurrentUser] = useState();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
      setloading(false);
      console.log("inside auth changed");
    });
    return unsub;
  }, []);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
