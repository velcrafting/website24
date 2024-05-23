import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (user) => {
      const cachedUserData = localStorage.getItem(`user_${user.uid}`);
      if (cachedUserData) {
        setCurrentUser(JSON.parse(cachedUserData));
        console.log('User data loaded from cache:', JSON.parse(cachedUserData));
      } else {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        const userWithRole = {
          ...user,
          role: userData?.role,
        };
        localStorage.setItem(`user_${user.uid}`, JSON.stringify(userWithRole));
        setCurrentUser(userWithRole);
        console.log('User data fetched from Firestore and cached:', userWithRole);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserData(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    if (currentUser) {
      localStorage.removeItem(`user_${currentUser.uid}`);
    }
    await signOut(auth);
    setCurrentUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const value = {
    currentUser,
    setCurrentUser, // Ensure this is included
    logout,
  };
  

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
