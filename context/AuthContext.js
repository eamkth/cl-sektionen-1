import React, { createContext, useContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/clientApp";
import { validateAccountCheck, createUser } from "../utils/authUtils";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const testUser = { displayName: "Test User", committee: "Testnämnden" };
  const [user, setUser] = useState({}); // Sparar google user uppgifter
  const [userData, setUserData] = useState(); // Sparar data som finns på firebase under /user/{uid}
  const [userAccessToken, setUserAccessToken] = useState(); // Användarens access token för google api
  const [signingIn, setSigningIn] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getUserData(user);
      } else {
        setUser();
        setUserData();
      }
    });
    setSigningIn(false);
    return () => unsubscribe();
  }, []);

  const getUserData = (user) => {
    // Kollar om google kontot har tillgång till personalrummet
    // Om så spara dess uppgifter - nämnd osv'
    return new Promise((resolve, reject) => {
      validateAccountCheck(user)
        .then((res) => {
          if (res.ok) {
            // Kontot finns inlagt i systemet
            res.data.uid = user.uid;
            console.log("Auto Inloggad");
            setUserData(res.data);
            resolve("ok");
          } else {
            // Kontot är inte inlagt i systemet
            console.log("Auto inloggning:", res.message);
            resolve(res.message);
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };

  const logOut = async () => {
    console.log("Försöker logga ut");
    setUser();
    setUserData();
    await signOut(auth);
  };

  const signUp = () => {
    return new Promise((resolve, reject) => {
      createUser(user)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });

      return;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signingIn,
        userData,
        setUserData,
        logOut,
        userAccessToken,
        setUserAccessToken,
        signUp,
        getUserData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
