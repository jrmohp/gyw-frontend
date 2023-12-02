import axios from 'axios';

import {BACKEND_BASE_URL} from "src/config"; // Replace with your actual API base URL



const getMutualFunds = async () => {
  try {
    const accessToken = sessionStorage.getItem("accessToken");

    const response = await fetch(`${BACKEND_BASE_URL}/api/mutualfund/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`  // Add the access token as a Bearer token
      },

    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching mutual funds:', error);
    return "ERROR-"+error;
  }
};

const getFolioSummary = async (id) => {
  try {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(id);
    // const response = await axios.get(`${BACKEND_BASE_URL}/api/mutualfund/tickerwealth/getFolioSummary/${id}/`);
    const response = await fetch(`${BACKEND_BASE_URL}/api/mutualfund/tickerwealth/getFolioSummary/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`  // Add the access token as a Bearer token
      },

    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching folio summary for id ${id}:`, error);
    return "ERROR-"+error;
  }
};

export { getMutualFunds, getFolioSummary };
