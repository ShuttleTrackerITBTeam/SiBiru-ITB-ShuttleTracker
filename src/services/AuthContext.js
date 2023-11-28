import React, { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [showLoginPopUp, setShowLoginPopUp] = useState(false);

  useEffect(() => {
    async function checklogin() {
      const fetchData = async () => {
        console.log('fetching data');
        try {
          const session = JSON.parse(localStorage.getItem('session') || '{ "access_token": "", "token_type": ""}');
          if(session.access_token == '') {
            console.log('session null : ', session);
            setUser("");
            return;
          }
          const response = await fetch('https://shuttle-tracker-itb-backend.vercel.app/check-session/', {
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
            },

          });
          if (response.ok) {
            const data = await response.json();
            console.log('Data:', JSON.stringify(data));
            setUser(data.username);
          } else {
            console.log('session : ', session);
            console.error('response not ok' + response.headers);
            console.log('Authorization : ' ,`Bearer ${session.access_token}`)
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
    <AuthContext.Provider value={{ user, setUser, showLoginPopUp, setShowLoginPopUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}
