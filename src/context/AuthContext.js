import { useContext, createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  OAuthProvider,
  getIdToken,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [idToken, setIdToken] = useState(null);
  const [loginByGoogle, setLoginByGoogle] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await getIdToken(user);
      setIdToken(token);
      setAccessToken(user.accessToken);
    }
  });
  const appleSignIns = async () => {
    setLoginByGoogle(false);
    const appleProvider = new OAuthProvider("apple.com");
    await signInWithPopup(auth, appleProvider);
  };

  const logOut = () => {
    if (auth) {
      signOut(auth);
    }
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logOut,
        user,
        setUser,
        appleSignIns,
        idToken,
        setIdToken,
        loginByGoogle,
        accessToken,
        setAccessToken,
        setLoginByGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
