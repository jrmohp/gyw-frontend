// LinkedAccountContext.js

import { createContext, useContext, useEffect, useState } from 'react';

const LinkedAccountContext = createContext();

export const useLinkedAccountContext = () => {
  return useContext(LinkedAccountContext);
};

export const LinkedAccountProvider = ({ children }) => {
  const [linkedAccountData, setLinkedAccountData] = useState(() => {
    // Initialize with data from local storage if available, or an empty object
    const storedData = localStorage.getItem('linkedAccountData');
    return storedData ? JSON.parse(storedData) : {};
  });

  useEffect(() => {
    // Save data to local storage whenever linkedAccountData changes
    localStorage.setItem('linkedAccountData', JSON.stringify(linkedAccountData));
  }, [linkedAccountData]);

  const setLinkedAccount = (linkedAccountSymbol, linkedAccountValue) => {
    setLinkedAccountData((prevData) => ({
      ...prevData,
      [linkedAccountSymbol]: linkedAccountValue,
    }));
  };

  const deleteLinkedAccount = () => {
    setLinkedAccountData({}); // Clear all data
    localStorage.removeItem('linkedAccountData'); // Remove data from local storage
  };

  return (
    <LinkedAccountContext.Provider value={{ linkedAccountData, setLinkedAccount, deleteLinkedAccount }}>
      {children}
    </LinkedAccountContext.Provider>
  );
};
