import React from 'react';
import { Box, BoxProps } from '@mui/material';
import {  GenericTypography,  } from '../../assets/elements/CustomTypography';



const TestnetBox: React.FC<BoxProps> = ({  ...props }) => {
    return (
        <Box
        
        height= "1.8rem"
        width="7.7rem"
        alignContent={"center"}
        justifyContent={"center"}
        display="flex"

            sx={{
               
                padding: "0.2rem",
                backgroundColor: 'red',
                borderRadius: 4,
                ...props.sx,
                
            }}
            {...props}
        >

        <GenericTypography
        
        fontSize="0.8rem"
        color="white"
        fontWeight={700}>
        TESTNET
        </GenericTypography>
        </Box>
    );
};

export default TestnetBox;