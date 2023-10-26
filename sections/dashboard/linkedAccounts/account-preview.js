// src/sections/dashboard/account-linking/account-preview.js

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Stack from '@mui/material/Stack';

export const AccountPreview =  (props) => {
  const { onBack, onNext, data, ...other } = props;
  const dataMapping = {
    client_id: 'Client ID',
    client_name: 'Client Name',
    email_id: 'Email',
    phone_no: 'Phone Number',
    client_password: 'Password'
  };

  console.log("DATA-" + JSON.stringify(data));

  return (
    <Stack spacing={3}
           {...other}>
      <Table>
        <TableBody>
          {data && Object.entries(data).map(([key, value]) => (
            <TableRow key={key}>
              {/* Use the mapped label if available, otherwise use the key */}
              <TableCell>{dataMapping[key] || key}</TableCell>
              <TableCell>{value.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <Stack alignItems="center"
             direction="row"
             spacing={2}>

        <Button
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          onClick={onNext}
          variant="contained"

        >
          Confirm & Add
        </Button>
        <Button color="inherit"
                onClick={onBack}>
          Back
        </Button>
      </Stack>
    </Stack>
  );
};
