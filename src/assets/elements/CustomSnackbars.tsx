import React from 'react';
import { Snackbar, SnackbarProps,  Alert } from '@mui/material';
import { CheckIcon } from '../icons/CheckIcon';
import { ErrorIcon } from '../icons/ErrorIcon';
import {RefereshDotIcon} from '../icons/RefereshDotIcon';
import { SubtitleTypography } from './CustomTypography';


interface CustomSnackbarProps extends SnackbarProps {
    severity: 'success' | 'error' | 'warning' | 'info';
}

const SimpleSnackbar: React.FC<CustomSnackbarProps> = ({ open, message, severity, onClose }) => {
    const getIcon = (severity: string) => {
        switch (severity) {
            case 'success':
                return <CheckIcon fontSize="inherit" />;
            case 'error':
                return <ErrorIcon fontSize="inherit" />;
            case 'warning':
                return <RefereshDotIcon fontSize="inherit" />; // Replace with appropriate warning icon
            case 'info':
                return <CheckIcon fontSize="inherit" />; // Replace with appropriate info icon
            default:
                return <CheckIcon fontSize="inherit" />;
        }
    };

    return (
        <Snackbar
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={onClose}
        >
            <Alert icon={getIcon(severity)} severity={severity}>
                <SubtitleTypography fontSize='0.9rem' color='red'>
                    {message}
                </SubtitleTypography>
            </Alert>
        </Snackbar>
    );
};

export { SimpleSnackbar };