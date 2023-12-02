import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'; // Ensure correct import path
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import {BACKEND_BASE_URL} from "src/config";

const LinkedAccountsPage = () => {
  usePageView();
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const router = useRouter();
  const accessToken = sessionStorage.getItem("accessToken");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchLinkedAccounts();
  }, []);

  const fetchLinkedAccounts = () => {
    fetch(`${BACKEND_BASE_URL}/api/mutualfund/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Replace with actual auth token
      },
    })
      .then(response => response.json())
      .then(data => setLinkedAccounts(data))
      .catch(error => console.error('Error fetching mutual funds:', error));
  };
  const handleAddAccountClick = () => {
    router.push('/linkedAccounts/add');
  };

  const handleEdit = (id) => {
    // Handle edit logic
  };

  const handleDelete = (id) => {
    fetch(`${BACKEND_BASE_URL}/api/mutualfund/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Replace with actual auth token
      },
    })
      .then(response => {
        if (response.ok) {
          fetchLinkedAccounts(); // Refresh the list after deletion
        } else {
          console.error('Failed to delete the mutual fund');
        }
      })
      .catch(error => console.error('Error deleting mutual fund:', error));
    // Handle delete logic
  };

  return (
    <>
      <Seo title="Linked Accounts" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Typography variant="h4">Linked Accounts</Typography>
            <Button
              startIcon={
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              }
              variant="contained"
              onClick={handleAddAccountClick}
            >
              Link New Account
            </Button>
          </Stack>
          {linkedAccounts.length > 0 ? (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Serial No.</TableCell>
                  <TableCell>Client ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {linkedAccounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((account, index) => (
                  <TableRow key={account.id}>
                    <TableCell component="th"
                               scope="row">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{account.client_id}</TableCell>
                    <TableCell>{account.client_name}</TableCell>
                    <TableCell>{account.email_id}</TableCell>
                    <TableCell>{account.phone_no}</TableCell>
                    <TableCell>{account.vendor}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDelete(account.id)}
                                  aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={linkedAccounts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer> ) : (
            <Typography variant="subtitle1"
                        sx={{ mt: 2 }}>
              No linked accounts available.
            </Typography>
            )}
        </Container>
      </Box>
    </>
  );

};

LinkedAccountsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default LinkedAccountsPage;
