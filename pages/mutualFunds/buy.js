import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import {useState} from 'react';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';


import { useMediaQuery} from '@mui/material';
import ComponentA from "./test";
import ComponentB from "./test2";
import CustomDrawer from "../../components/customdrawer";
import Popup from "../../components/popup";
import {TickerProvider} from "../../contexts/tickerwealth/tickerContext";
import TickerBuyForm from "../../components/custom/ticker-buy-mf";

const Page = () => {
  const settings = useSettings();

  usePageView();

  const [openPopup, setOpenPopup] = useState(false);
  const [openDrawer, setopenDrawer] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width: 1280px)');// Define a breakpoint for large screens

  console.log("TEST");
  console.log(isLargeScreen);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleOpenDrawer = () => {
    setopenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setopenDrawer(false);
  };



  return (
    <>
      <Seo title="Dashboard: Blank" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Stack
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <div>
                <Typography variant="h4">Blank</Typography>
              </div>
              <div>
                <Stack
                  direction="row"
                  spacing={4}
                >
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    onClick={isLargeScreen ? handleOpenPopup : handleOpenDrawer}
                  >
                    Action
                  </Button>
                </Stack>
              </div>
            </Stack>

            <TickerProvider>
              <TickerBuyForm />

              <ComponentA />
              <ComponentB />
            </TickerProvider>

          </Stack>

          <CustomDrawer open={openDrawer} onClose={handleCloseDrawer} />
          <Popup open={openPopup} onClose={handleClosePopup} />

        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
