import React from 'react';
import { Stack, StackProps } from '@mui/material';



const SingleComponentStack: React.FC<StackProps> = ({ children, ...props }) => {
    return (
        <Stack
        minHeight="13rem"
        sx={{
            padding: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.06)', // Semi-transparent white
            backdropFilter: 'blur(10px)', // Blur effect
            borderRadius: 1,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
            borderColor: '#bfbfbf',
            ...props.sx,
        }}
            {...props}
        >
            {children}
        </Stack>
    );
};

export default SingleComponentStack;