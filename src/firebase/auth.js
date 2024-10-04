import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./firebase";

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
});

export default function UserFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
      clear();
      return;
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
      username: user.displayName,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  const signOut = () => {
    console.log('calll')
    authSignOut(auth).then(() => {
      clear();
    });
  };

  return {
    authUser,
    isLoading,
    setAuthUser,
    signOut,
  };
}

console.log(auth,'auth')
export const AuthUserProvider = ({ children }) => {
  const auth = UserFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
