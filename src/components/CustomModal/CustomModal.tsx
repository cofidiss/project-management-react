import React, { PropsWithChildren } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { CustomModalProps } from '../../Models/Models';

const CustomModal: React.FC<PropsWithChildren<CustomModalProps>> = ({
  isOpen,
  title,
  message,
  okButtonText,
  okButtonClick,
  leftButtonText,
  leftButtonClick,
  rightButtonText,
  rightButtonClick,
  children,
}) => {
  // Validation check
  if (okButtonText && (leftButtonText || rightButtonText)) {
    throw new Error(
      "If 'okButtonText' is provided, 'leftButtonText' and 'rightButtonText' must not be defined.",
    );
  }
  return (
    <Dialog open={isOpen}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          {children}
          {message && <Typography>{message}</Typography>}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-evenly' }}>
          {okButtonText && (
            <Button
              onClick={okButtonClick}
              sx={{
                backgroundColor: 'green',
                color: 'white',
                '&:hover': { backgroundColor: 'darkgreen' },
              }}
            >
              {okButtonText}
            </Button>
          )}
          {leftButtonText && (
            <Button onClick={leftButtonClick} color="primary">
              {leftButtonText}
            </Button>
          )}
          {rightButtonText && (
            <Button onClick={rightButtonClick} color="primary">
              {rightButtonText}
            </Button>
          )}
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default CustomModal;