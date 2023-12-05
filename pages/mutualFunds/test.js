// ComponentA.js

import React from 'react';
import {useTickerContext} from "../../contexts/tickerwealth/tickerContext";


function ComponentA() {
  const {  setTicker, deleteTicker } =useTickerContext();

  const handleButtonClick = () => {
    // Update data dynamically
    setTicker('dataA', 'Data from Component A');
    setTicker('dataB', 'Another data from Component A');

  };

  const handleDeleteButtonClick = () => {
    // Update data dynamically
    deleteTicker();


  };



  return (
    <div>
      <h2>Component A</h2>
      <button onClick={handleButtonClick}>Update Data</button>
      <button onClick={handleDeleteButtonClick}>Delete Data</button>

    </div>
  );
}

export default ComponentA;
