import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import firebaseAuthenticationInit from "../firebase/firebase.init";
import { useEffect } from "react";
firebaseAuthenticationInit();

// auth
const auth = getAuth();

// providers
const goolgeProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // Create user
  const createUser = (email, password, navigate) => {
    console.log(email);
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        navigate("/");
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle sign In with email and password
  const signWithEmailPass = (email, password, navigate) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle googleSign In
  const GoogleSingIn = (navigate) => {
    setLoading(true);
    signInWithPopup(auth, goolgeProvider)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // userHandle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  // handle logout
  const logout = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { GoogleSingIn, user, loading, logout, signWithEmailPass, createUser };
};

export default useFirebase;
