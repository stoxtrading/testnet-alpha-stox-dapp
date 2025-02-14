import React from 'react';
import { Stack, StackProps } from '@mui/material';



const SingleComponentStack: React.FC<StackProps> = ({ children, ...props }) => {
    return (
        <Stack
            sx={{
                padding: 2,
                backgroundColor: 'white',
                borderRadius: 1,
                ...props.sx,
            }}
            {...props}
        >
            {children}
        </Stack>
    );
};

export default SingleComponentStack;