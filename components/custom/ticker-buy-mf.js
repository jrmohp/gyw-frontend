import React, { useRef } from 'react';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const TickerBuyForm = () => {
  // Refs for form fields
  const clientNameRef = useRef(null);
  const clientCodeRef = useRef(null);
  const amcRef = useRef(null);
  const schemeNameRef = useRef(null);
  const txnModeRef = useRef(null);
  const txnTypeRef = useRef(null);
  const amountRef = useRef(null);
  const euinRef = useRef(null);

  // Function to get form values
  const getFormValues = () => {
    return {
      clientName: clientNameRef.current.value,
      clientCode: clientCodeRef.current.value,
      amc: amcRef.current.value,
      schemeName: schemeNameRef.current.value,
      txnMode: txnModeRef.current.value,
      txnType: txnTypeRef.current.value,
      amount: amountRef.current.value,
      euin: euinRef.current.value,
    };
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Client Name</InputLabel>
          <Select label="Client Name" inputRef={clientNameRef}>
            <MenuItem value="client1">Client 1</MenuItem>
            <MenuItem value="client2">Client 2</MenuItem>
            {/* Add more client options as needed */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Client Code</InputLabel>
          <Select label="Client Code" inputRef={clientCodeRef}>
            <MenuItem value="code1">Code 1</MenuItem>
            <MenuItem value="code2">Code 2</MenuItem>
            {/* Add more client code options as needed */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>AMC</InputLabel>
          <Select label="AMC" inputRef={amcRef}>
            <MenuItem value="amc1">AMC 1</MenuItem>
            <MenuItem value="amc2">AMC 2</MenuItem>
            {/* Add more AMC options as needed */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Scheme Name</InputLabel>
          <Select label="Scheme Name" inputRef={schemeNameRef}>
            <MenuItem value="scheme1">Scheme 1</MenuItem>
            <MenuItem value="scheme2">Scheme 2</MenuItem>
            {/* Add more scheme options as needed */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Transaction Mode</InputLabel>
          <Select label="Transaction Mode" inputRef={txnModeRef}>
            <MenuItem value="Physical">Physical</MenuItem>
            <MenuItem value="CDSL Demat">CDSL Demat</MenuItem>
            <MenuItem value="NDSL Demat">NDSL Demat</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Transaction Type</InputLabel>
          <Select label="Transaction Type" inputRef={txnTypeRef}>
            <MenuItem value="Fresh">Fresh</MenuItem>
            <MenuItem value="Additional">Additional</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Amount"
          fullWidth
          type="number"
          step="0.01"
          inputRef={amountRef}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="EUIN" fullWidth inputRef={euinRef} />
      </Grid>
    </Grid>
  );
};

export default TickerBuyForm;
