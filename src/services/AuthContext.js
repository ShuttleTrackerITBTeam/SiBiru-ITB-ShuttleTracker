import React, { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [showLoginPopUp, setShowLoginPopUp] = useState(false);
  const [isProfilePopUpOpen, setIsProfilePopUpOpen] = useState(false);

  useEffect(() => {
    async function checklogin() {
      const fetchData = async () => {
        try {
          const session = JSON.parse(localStorage.getItem('session') || '{ "access_token": "", "token_type": ""}');
          if (session.access_token == '') {
            setUser("");
            return;
          }
          const response = await fetch('https://shuttle-tracker-itb-backend.vercel.app/login/', {
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
            },

          });

          if (response.ok) {
            const data = await response.json();
            const email = data.email;
            const formattedEmail = email.split('@')[0].substring(0, 8);
            setUser(formattedEmail);
          }
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      await fetchData();
    }
  
    checklogin();
  });

  return (
    <AuthContext.Provider value={{ user, setUser, showLoginPopUp, setShowLoginPopUp, isProfilePopUpOpen, setIsProfilePopUpOpen }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}
