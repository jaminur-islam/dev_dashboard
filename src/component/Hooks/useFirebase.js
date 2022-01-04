import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import firebaseAuthenticationInit from "../firebase/firebase.init";
import { useEffect } from "react";
import axios from "axios";

firebaseAuthenticationInit();

// auth
const auth = getAuth();

// providers
const goolgeProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Create user
  const createUser = (name, email, password, navigate) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser({ displayName: name, email });
        setUserOnDatabase("POST", { name, email });
        setUserName(name);
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

  //  update user Name
  const setUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
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
        const { displayName, email } = result.user;
        setUserOnDatabase("PUT", { name: displayName, email });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // user Handle
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  // setUser on Database
  const setUserOnDatabase = (method, userInf) => {
    setLoading(true);
    fetch("https://aqueous-falls-80276.herokuapp.com/setUser", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInf),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // handle admin

  useEffect(() => {
    let isMounted = true;
    if (token) {
      setLoading(true);
      axios(`https://aqueous-falls-80276.herokuapp.com/admin/${user.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((result) => {
          setIsAdmin(result.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [token]);

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

  return {
    GoogleSingIn,
    user,
    loading,
    logout,
    signWithEmailPass,
    createUser,
    token,
    isAdmin,
  };
};

export default useFirebase;
