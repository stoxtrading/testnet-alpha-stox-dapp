import React from 'react';
import { Snackbar, SnackbarProps, SnackbarOrigin } from '@mui/material';

interface State extends SnackbarOrigin {
    open: boolean;
}

const SimpleSnackbar : React.FC<SnackbarProps> = ({open}) => {
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const handleClose = () => {
        setState({ ...state, open: false });
    };
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
            message="Alert message"

        />
    );
};

export  {SimpleSnackbar};