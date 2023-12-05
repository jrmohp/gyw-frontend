import React from 'react';
import { Stack, Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TickerBuyForm from "./custom/ticker-buy-mf";

const Popup = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: '70vh',
          overflowX: 'hidden',
          margin : 'auto'// Hide horizontal scrollbar
        },
      }}
    >
      <IconButton
        edge="end"
        color="inherit"
        onClick={onClose}
        aria-label="close"
        sx={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ flex: '1', overflowY: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Popup Title
        </Typography>

        <Stack
          spacing={2} // Adjust the spacing between elements vertically
          sx={{
            margin: '20px', // Add margin to all sides (vertical and horizontal)
            padding: '16px', // Add padding to all sides (vertical and horizontal)
          // Optional: Add a background color
          }}
        >
        <TickerBuyForm/>

        </Stack>
        {/* Add more content as needed */}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
