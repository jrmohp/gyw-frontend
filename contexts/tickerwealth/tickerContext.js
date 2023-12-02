// TickerContext.js

import { createContext, useContext, useEffect, useState } from 'react';

const TickerContext = createContext();

export const useTickerContext = () => {
  return useContext(TickerContext);
};

export const TickerProvider = ({ children }) => {
  const [tickerData, setTickerData] = useState(() => {
    // Initialize with data from local storage if available, or an empty object
    const storedData = localStorage.getItem('tickerData');
    return storedData ? JSON.parse(storedData) : {};
  });

  useEffect(() => {
    // Save data to local storage whenever tickerData changes
    localStorage.setItem('tickerData', JSON.stringify(tickerData));
  }, [tickerData]);

  const setTicker = (tickerSymbol, tickerValue) => {
    setTickerData((prevData) => ({
      ...prevData,
      [tickerSymbol]: tickerValue,
    }));
  };

  const deleteTicker = () => {
    setTickerData({}); // Clear all data
    localStorage.removeItem('tickerData'); // Remove data from local storage
  };

  return (
    <TickerContext.Provider value={{ tickerData, setTicker, deleteTicker }}>
      {children}
    </TickerContext.Provider>
  );
};
