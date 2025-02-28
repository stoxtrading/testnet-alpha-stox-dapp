
import Box from '@mui/material/Box';

import {CommonPageBackground} from '../../components/surfaces/CommonPageBackground';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { ButtonTypography, GenericTypography, HomePageAnnoucementTypography } from '../../assets/elements/CustomTypography';
import { Button } from '@mui/material';
import { DiscordIcon } from '../../assets/icons/DiscordIcon';




function Tester() {


    return (

          
                <Stack rowGap={2}>
                    <Grid container columnSpacing={2} rowSpacing={2} textAlign="center">
                        <Grid size={12}>
                        <HomePageAnnoucementTypography>
                            A.  Testnet users Rewards 
                            </HomePageAnnoucementTypography>
                            <GenericTypography
                                fontSize="1.5rem">
                                Become a Testnet tester and earn STOX tokens
                            </GenericTypography>
                            <GenericTypography
                                fontSize="1.5rem">
                                In order to get the rewards, you need to complete the following tasks:
                            </GenericTypography>
                            <GenericTypography
                                fontSize="1.5rem">
                                1. Join our Discord Server
                            </GenericTypography>
                            <Button
                                
                                variant="contained"
                                color="primary"
                                endIcon={<DiscordIcon />}
                                sx={{
                                    height:35,
                                    marginLeft: 2,
                                    backgroundColor: '#5865F2',
                                    '&:hover': {
                                        backgroundColor: '#ED4245',
                                    },
                                    textTransform: 'none',
                                }}
                                component="a"
                                href="https://discord.gg/gCgE5uNw"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ButtonTypography sx={{  color: 'white' }}>
                                    FAUCET
                                </ButtonTypography>
                            </Button>
                            <GenericTypography
                                fontSize="1.5rem">
                                2. Drop your address in the Faucet Channel in order to receive testnet STOX tokens, testnet BaseETH and testnet NVIDIA tokens on BASE SEPOLIA network
                            </GenericTypography>
                            <GenericTypography
                                fontSize="1.5rem">
                                3. Navigate on the TRADING page (https://stoxtrading.com/trading) 
                            </GenericTypography>
                            <GenericTypography
                                fontSize="1.5rem">
                                4. Start trading on the testnet by placing limit and market orders
                            </GenericTypography>
                            <GenericTypography
                                fontSize="1.5rem">
                               Conditions for being rewarded in STOX Mainnet tokens:
                            </GenericTypography>
                            <GenericTypography
                                fontSize="1.5rem">
                               Between the 1st of March 2025 and the 30th of April 2025, 
                               the top 100 traders who have placed more than 3 orders in the Order Book will be dropped 150 STOX Mainnet tokens
                                Only the ETH Wallet Address associated with the Discord account will be rewarded
                            </GenericTypography>
                        </Grid>
                        <Grid size={12}>
                        <HomePageAnnoucementTypography>
                            A.  BUG Bounty Rewards
                            </HomePageAnnoucementTypography>
                            </Grid>
                            

                    </Grid>



                </Stack>


    );
}

export { Tester };