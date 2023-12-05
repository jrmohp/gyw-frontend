// ComponentB.js

import React, { useContext, useEffect, useState } from 'react';
import {useTickerContext} from "../../contexts/tickerwealth/tickerContext";


function ComponentB() {
  const { tickerData } = useTickerContext();
  const [data, setTickerData] = useState('');

  // Listen for changes to the dataA property in tickerData
  useEffect(() => {
    if (tickerData !== undefined) {
      setTickerData(tickerData);
    }

  }, [tickerData]);

  return (
    <div>
      <h2>Component B</h2>
      <p>Data from Component A (data): {data.dataA}</p>
      <p>Data from Component A (data): {data.dataB}</p>

    </div>
  );
}

export default ComponentB;
