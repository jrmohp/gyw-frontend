import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TickerBuyForm from "./custom/ticker-buy-mf";

function CustomDrawer({ open, onClose, children }) {
  return (
    <Drawer
      disableScrollLock
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        BackdropProps: {
          invisible: true,
        },
        sx: { zIndex: 1400 },
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          position: 'relative', // Added position relative
        },
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
        onClick={onClose}
        aria-label="Close"
      >
        <CloseIcon />
      </IconButton>
      <TickerBuyForm/>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Drawer>
  );
}

export default CustomDrawer;
