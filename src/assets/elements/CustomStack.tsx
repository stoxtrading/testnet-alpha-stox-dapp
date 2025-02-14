import React from 'react';
import { Stack, StackProps } from '@mui/material';



const SingleComponentStack: React.FC<StackProps> = ({ children, ...props }) => {
    return (
        <Stack
            sx={{
                padding: 2,
                backgroundColor: 'rgba(224, 228, 241, 0.9)',
                borderRadius: 2,
                ...props.sx,
            }}
            {...props}
        >
            {children}
        </Stack>
    );
};

export default SingleComponentStack;