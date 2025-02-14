import React from 'react';
import { Backdrop, CircularProgress, BackdropProps } from '@mui/material';

interface CustomBackdropProps extends BackdropProps {
    open: boolean;
    handleClose?: () => void;
}

const CustomBackdrop: React.FC<CustomBackdropProps> = ({ open, handleClose, ...props }) => {
    return (
        <Backdrop
            open={open}
            onClick={handleClose}
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                ...props.sx,
            }}
            {...props}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default CustomBackdrop;