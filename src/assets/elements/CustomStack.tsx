import React from 'react';
import { Stack, StackProps } from '@mui/material';



const SingleComponentStack: React.FC<StackProps> = ({ children, ...props }) => {
    return (
        <Stack
        minHeight="13rem"
            sx={{
                padding: 2,
                backgroundColor: 'hsl(200, 10%, 20%)',
                borderRadius: 2,
                ...props.sx,
                border: '1px solid '
            }}
            {...props}
        >
            {children}
        </Stack>
    );
};

export default SingleComponentStack;