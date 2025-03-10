import {   useState } from 'react';
import { Stack, Button, Alert, Snackbar, Paper, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { GenericTypography, HomePageAnnoucementTypography } from '../../assets/elements/CustomTypography';
import { SocialMediaBar } from '../countDown/SocialMediaBar';
import { PoweredByBar } from '../countDown/PoweredByBar';
import { useAccount, useSignMessage } from 'wagmi'
import Fireworks from './Fireworks';
import { useDiscord } from '../contexts/useDiscord';
import { useX } from '../contexts/useX';
import { useEthSignedTxContext } from '../contexts/useEthSignedTx';






export default function Airdrop() {
    const { address: connectedWalletAddress, isConnected } = useAccount();

    const { isVerified: isDiscordVerified } = useDiscord();

    const { isVerified: isXVerified } = useX();

    const { isVerified: isEthSignedTxVerified, setIsVerified: setIsEthSignedTxVerified } = useEthSignedTxContext();

    const { signMessageAsync } = useSignMessage();


    const [showFireworks, setShowFireworks] = useState(false);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'error' | 'warning' | 'info' | 'success' | undefined;
    }>({
        open: false,
        message: '',
        severity: 'info',
    });




    const handleDiscordAuth = () => {
        if (!isEthSignedTxVerified) {
            setSnackbar({
                open: true,
                message: 'Please sign with your wallet first',
                severity: 'error',
            });
            return;
        }
        const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=1346848533692551178&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fvalidate-discord-auth&scope=identify`;
        location.href = discordAuthUrl;
    }


    const handleSignTx = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isConnected) {
            setSnackbar({
                open: true,
                message: 'Please connect your wallet',
                severity: 'error',
            });
            return;
        }



        try {
            const message = 'Please sign this message to verify your wallet address for the airdrop.';
            await signMessageAsync({ message });
            setIsEthSignedTxVerified(true);


            // API call to Lambda function
            const response = await fetch("http://localhost:8546/record-eth-wallet-address/" + connectedWalletAddress, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok) {
                // Show fireworks instead of success snackbar
                setShowFireworks(true);

                // Reset form after successful submission
                
            } else {
                throw new Error(result.message || 'Failed to register');
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: error instanceof Error ? error.message : 'An error occurred',
                severity: 'error',
            });
        } 
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));
    };

    const handleFireworksComplete = () => {
        setShowFireworks(false);
    };

    const handleTwitterAuth = () => {
        if (!isEthSignedTxVerified) {
            setSnackbar({
                open: true,
                message: 'Please sign with your wallet first',
                severity: 'error',
            });
            return;
        }


        const twitterAuthUrl = `https://x.com/i/oauth2/authorize?response_type=code&client_id=T0RRR3Y4V2FERDNOQTRaM1dVM0c6MTpjaQ&redirect_uri=http://localhost:5173/validate-x-auth&scope=users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
        location.href = twitterAuthUrl;
    };

    return (
        <Stack rowGap={5} alignItems={'center'} paddingTop="5vh">
            <Grid container justifyContent="center" spacing={2} direction={'column'} alignItems={"center"}>

                <Grid container justifyContent="center" direction={"column"}>
                    <HomePageAnnoucementTypography sx={{ fontSize: '1.9rem' }}>
                        AIRDROP
                    </HomePageAnnoucementTypography>
                </Grid>
                <Grid container justifyContent="center" direction={"column"}>
                    <HomePageAnnoucementTypography sx={{ fontSize: '1rem' }}>
                        REGISTER NOW
                    </HomePageAnnoucementTypography>
                </Grid>
            </Grid>

            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    width: '100%',
                    maxWidth: 500,
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                }}
            >

                <Stack spacing={3} alignItems={'center'} justifyItems={'center'}>

                    {!isEthSignedTxVerified ? (
                        <Button
                            variant="outlined"
                            onClick={handleSignTx}
                            sx={{
                                py: 1.5,
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                            }}
                        >
                            Connect your ETH Wallet account
                        </Button>
                    ) : (<GenericTypography align='center' usage='paragraph' fontSize="1.2rem" >
                        Connected to your Wallet + 500 STOX
                    </GenericTypography>)}


                    {!isXVerified ? (
                        <Button
                            variant="outlined"
                            onClick={handleTwitterAuth}
                            sx={{
                                py: 1.5,
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                            }}
                        >
                            Connect your X account
                        </Button>
                    ) : (<GenericTypography align='center' usage='paragraph' fontSize="1.2rem" >
                        Connected to X + 1000 STOX
                    </GenericTypography>)}


                    <Grid container>

                        <Grid container offset={"auto"} alignContent={"center"} justifyContent={"center"} >

                            {!isDiscordVerified ? (
                                <Button
                                    variant="outlined"
                                    onClick={handleDiscordAuth}
                                    sx={{
                                        py: 1.5,
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                    }}
                                >
                                    Connect your Discord account
                                </Button>
                            ) : (<GenericTypography align='center' usage='paragraph' fontSize="1.2rem" >
                                Connected to Discord + 500 STOX
                            </GenericTypography>)}
                        </Grid>
                    </Grid>

                
                </Stack>

            </Paper>

            <Box sx={{ width: '100%', maxWidth: 600, textAlign: 'center', mt: 2 }}>
                <GenericTypography>
                    Register your wallet address to be eligible for the upcoming STOX token airdrop.
                    Early participants who register between March 1st and April 15th will receive 15% bonus tokens.
                </GenericTypography>
            </Box>

            <SocialMediaBar />
            <PoweredByBar />

            {/* Error snackbar (success now uses fireworks) */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* Fireworks display for success */}
            {showFireworks && <Fireworks onComplete={handleFireworksComplete} />}
        </Stack>
    );
}