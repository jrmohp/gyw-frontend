import React, { useState, useEffect } from 'react';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { CryptoCurrentBalance } from 'src/sections/dashboard/crypto/crypto-current-balance';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useSettings } from 'src/hooks/use-settings';
import useFetchMutualFundData from "../../hooks/use-FetchMutualFundData";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import RefreshIcon from '@mui/icons-material/Refresh'; // Import RefreshIcon
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {TickerProvider} from "../../contexts/tickerwealth/tickerContext";
import ComponentA from "./test";
import ComponentB from "./test2";
import {
  LinkedAccountProvider,
  useLinkedAccountContext
} from "../../contexts/linkedAccounts/linkedAccountContext";

const CryptoBalancePage = () => {
  usePageView();
  const settings = useSettings();
  useFetchMutualFundData();

  const [linkedAccountData,setLinkedAccountDatasetLinkedAccountData] = useLinkedAccountContext();
  const [selectedClient, setSelectedClient] = useState(null);
  const [mutualFundData, setMutualFundData] = useState({});
  const [clients, setClients] = useState([]);
  const handleRefreshClick = () => {
    fetchMutualFundDataFromLocalStorage();
  };

  const fetchMutualFundDataFromLocalStorage = () => {
    console.log("FETCH CALED");
    const storedData = localStorage.getItem('mutualFundData');

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const clientsData = Object.keys(parsedData).map(client_id => ({
          client_id,
          client_name: parsedData[client_id].client_name,
        }));

        setMutualFundData(parsedData);
        setClients(clientsData);

        if (clientsData.length > 0) {
          setSelectedClient(clientsData[0]);
        }
      } catch (error) {
        setError('Error parsing data from localStorage');
      }
    }
  };

  useEffect(() => {
    fetchMutualFundDataFromLocalStorage();
  }, []);

  useEffect(() => {
    if (
      selectedClient &&
      mutualFundData[selectedClient.client_id] &&
      selectedClient.data !== mutualFundData[selectedClient.client_id]
    ) {
      const updatedClient = {
        ...selectedClient,
        data: mutualFundData[selectedClient.client_id],
      };
      setSelectedClient(updatedClient);
    }
  }, [selectedClient, mutualFundData]);

  let x = null;
  let y = null;


  return (
    <LinkedAccountProvider>
    <DashboardLayout>
      <Seo title="Mutual Funds OvervView" />

      <Card>
        <CardHeader title="Mutual Funds Dashboard" />
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2>Client Name: </h2>

            <Select
              value={selectedClient ? selectedClient.client_id : ''}
              onChange={(e) => {
                const selectedClientId = e.target.value;
                const selectedClientData = clients.find(client => client.client_id === selectedClientId);
                setSelectedClient(selectedClientData);
              }}
              style={{ marginLeft: '16px' }}
            >


              {clients.map((client) => (
                <MenuItem key={client.client_id}
                          value={client.client_id}>
                  {client.client_name}
                </MenuItem>
              ))}
            </Select>
            <IconButton color="inherit"
                        onClick={handleRefreshClick}>
              <SvgIcon>
                <RefreshIcon />
              </SvgIcon>
            </IconButton>
          </div>

          <h3>Client ID: {selectedClient?.client_id}</h3>

          <Container maxWidth={settings.stretch ? false : 'xl'}>
            <Grid container
                  spacing={2}>

              {selectedClient && selectedClient.data  ? (
                selectedClient.data.folioSummary.map((entry) => {
                  if (entry.sScheme === "Grand Total") {
                    return (
                      <Grid item
                            key={entry.SR_NO_}
                            xs={12}>



                        <CryptoCurrentBalance
                          title = {entry.sScheme}
                          chartSeries={[entry.nInvestment, entry.GainLoss]}
                          labels={['Investment', 'Gain/Loss']}
                        />
                      </Grid>
                    );
                  }
                  return null;
                })
              ) : (
                <p>No data available for the selected client.</p>
              )}
              {selectedClient && selectedClient.data ? (
                selectedClient.data.folioSummary.map((entry) => {
                  if (entry.sScheme !== "Grand Total") {
                    return (
                      <Grid item
                            key={entry.SR_NO_}
                            xs={12}
                            lg={6}
                            xl={6}>

                        <CryptoCurrentBalance
                          title = {entry.sScheme}
                          chartSeries={[entry.nInvestment, entry.GainLoss]}
                          labels={['Investment', 'Gain/Loss']}
                        />
                      </Grid>
                    );
                  }
                  return null;
                })
              ) : null}
            </Grid>
          </Container>
        </CardContent>
      </Card>

      <TickerProvider>
        <ComponentA />
        <ComponentB />
      </TickerProvider>
    </DashboardLayout>
    </LinkedAccountProvider>
  );
};

export default CryptoBalancePage;
