import React, { createContext, useState, useContext } from 'react';

const LogoutContext = createContext(true);

export const useLogout = () => {
  return useContext(LogoutContext);
};

export const LogoutProvider = ({ children }) => {
  const hasToken = sessionStorage.getItem('jwtToken');
  const [loggedOut, setLoggedOut] = useState(!hasToken);

  const logOut = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('email');
    setLoggedOut(true);
  };
  
  const logIn = (email, authToken) => {
    sessionStorage.setItem('jwtToken', authToken);
    sessionStorage.setItem('email', email);
    setLoggedOut(false);
  };

  return (
    <LogoutContext.Provider value={{ loggedOut, logOut, logIn }}>
      {children}
    </LogoutContext.Provider>
  );
};