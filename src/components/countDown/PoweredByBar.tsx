import { IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { HomePageAnnoucementTypography } from '../../assets/elements/CustomTypography';





export const PoweredByBar = () => {

    const [isBaseHovered, setBaseIsHovered] = useState(false);


    return (
        <Stack justifyContent={"center"} alignItems={"center"} spacing={"0.8rem"} marginTop='1rem'>
            <Grid alignItems={"center"} justifyContent={"center"} >
                <Grid container justifyContent="center" >
                    <HomePageAnnoucementTypography sx={{ fontSize: '1rem', }}>
                        Powered by
                    </HomePageAnnoucementTypography>
                </Grid>
            </Grid>


            <Grid alignItems={"center"} justifyContent={"center"} >
                <IconButton
                    onClick={() => window.open('https://www.base.org/', '_blank')}
                    onMouseEnter={() => setBaseIsHovered(true)}
                    onMouseLeave={() => setBaseIsHovered(false)}
                    sx={{
                        transition: 'all 0.3s ease',
                        transform: isBaseHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                >
                    <img
                        src={'./Base_Wordmark_Blue.svg'}
                        style={{
                            width: '90px',
                            transition: 'all 0.3s ease',
                            filter: isBaseHovered ? 'brightness(1.2)' : 'brightness(1)'
                        }}
                    />
                </IconButton>
            </Grid>

        </Stack>
    );
};