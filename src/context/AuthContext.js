import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  

   const [user, setUser] = useState(null);
 
   useEffect(() => {
     const unsub = onAuthStateChanged(auth, (firebaseUser) => {
       setUser(firebaseUser);         
       console.log("Firebase user changed:", firebaseUser);
     });
     return () => unsub();
   }, []);
 
 
 const login  = (firebaseUser) => setUser(firebaseUser);
   const logout = () => signOut(auth);
 
   return (

   <AuthContext.Provider value={{ user, login, logout }}>
       {children}
     </AuthContext.Provider>
   );
 };

export const useAuth = () => useContext(AuthContext);
