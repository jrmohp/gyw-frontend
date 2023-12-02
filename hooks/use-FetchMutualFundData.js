import { useEffect, useContext } from 'react';

import { getMutualFunds, getFolioSummary } from 'src/api/tickerApi/tickerApi';
import {useLinkedAccountContext} from "../contexts/linkedAccounts/linkedAccountContext";

const useFetchMutualFundData = () => {
  useEffect(() => {
    const fetchData = async () => {
      const [linkedAccountData,setLinkedAccountData] = useLinkedAccountContext();


      try {
        const mutualFunds = await getMutualFunds();
        // Retrieve the existing mutual fund data object from local storage
        let existingData = {};

        if (!existingData) {
          // If no existing data, initialize with an empty object
          existingData = {};
        }

        setLinkedAccountData('clients',mutualFunds);
        alert("DATA SET");

        await Promise.all(mutualFunds.map(async (fund) => {
          const folioSummary = await getFolioSummary(fund.id);
          // Update the existing data object with new data

            if(typeof folioSummary === 'object')
          {
            console.log(folioSummary)
            existingData[fund.client_id] = {
              client_name: fund.client_name,
              client_id: fund.client_id,
              folioSummary: folioSummary
            };
          }
         else
          {
            console.log("INVALID FOLIO SUMMARY");
            existingData[fund.client_id] = {
              client_name: fund.client_name,
              client_id: fund.client_id,
              folioSummary: []
            };
          }

        }));

        // Save the updated data object back to local storage
        localStorage.setItem("mutualFundData", JSON.stringify(existingData));
        console.log(existingData);
        console.log("LOCAL DATA SE")
      } catch (error) {
        console.error('Error in fetching data:', error);
        // Handle the error here, e.g., show a message to the user
      }
    };

    fetchData();
  }, []);
};

export default useFetchMutualFundData;
