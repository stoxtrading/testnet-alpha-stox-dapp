import { useEffect, useRef, useState } from 'react';
import { Stack, Button, Alert, Snackbar, Paper, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { GenericTypography, HomePageAnnoucementTypography } from '../../assets/elements/CustomTypography';
import { SocialMediaBar } from '../countDown/SocialMediaBar';
import { PoweredByBar } from '../countDown/PoweredByBar';
import { AirdropTextField } from '../../assets/elements/CustomTextField';
import { useAccount, useSignMessage } from 'wagmi'
import Fireworks from './Fireworks';


interface AirdropFormData {
    address: string;
    email?: string;
    name?: string;
    twitter?: string;
    discord?: string;
}



export default function Airdrop() {
    const { address: connectedWalletAddress, isConnected } = useAccount();
    
    
    const { signMessageAsync } = useSignMessage();

    const [formData, setFormData] = useState<AirdropFormData>({
        address: '',
        email: '',
        name: '',
        twitter: '',
        discord: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
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

    // const [tokensReward, setTokensReward] = useState(100);

    const isCodeVerified = useRef<boolean>(false);
    const [isDiscordVerified, setIsDiscordVerified] = useState(false);
    


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

        

    const handleDiscordAuth = () => {
        const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=1346848533692551178&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fairdrop&scope=identify`;
        location.href = discordAuthUrl;
    }


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        console.log(code);  
        console.log(isCodeVerified);
        if (code&& !isCodeVerified.current)  {
            isCodeVerified.current = true;
            const verifyDiscordCode = async () => {
                try {
                    
                    const response = await fetch('http://localhost:8546/discord-get-user-id?code='+code, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const data = await response.json();

                    if (response.ok) {
                        console.log('user is identified')
                        setIsDiscordVerified(true);
                        console.log(data)
                        setFormData((prev) => ({
                            ...prev,
                            discord: `${data.username}#${data.discriminator}`,
                        }));
                        setSnackbar({
                            open: true,
                            message: 'Connection to Discord successful',
                            severity: 'success',
                        });
                       
                    } else {
                        throw new Error(data.error || 'Failed to verify Discord account');
                    }
                } catch (error) {
                    setSnackbar({
                        open: true,
                        message: error instanceof Error ? error.message : 'An error occurred',
                        severity: 'error',
                    });
                }
            };

            verifyDiscordCode();
        }
    }, [isCodeVerified]);

    const handleSubmit = async (e: React.FormEvent) => {
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

            formData.address = String(connectedWalletAddress);
            console.log(formData.address);

            if (!formData.address) {
                setSnackbar({
                    open: true,
                    message: 'Wallet address is required',
                    severity: 'error',
                });
                return;
            }
            setIsSubmitting(true);

            // API call to Lambda function
            const response = await fetch(import.meta.env.VITE_APP_AIRDROP_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                // Show fireworks instead of success snackbar
                setShowFireworks(true);

                // Reset form after successful submission
                setFormData({
                    address: '',
                    email: '',
                    // name: '',
                    twitter: '',
                    discord: '',
                });
            } else {
                throw new Error(result.message || 'Failed to register');
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: error instanceof Error ? error.message : 'An error occurred',
                severity: 'error',
            });
        } finally {
            setIsSubmitting(false);
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
        //const twitterAuthUrl = `https://api.twitter.com/oauth/authorize?oauth_token=${import.meta.env.VITE_APP_X_OAUTH_TOKEN}`;
        const twitterAuthUrl = `https://x.com/i/oauth2/authorize?response_type=code&client_id=T0RRR3Y4V2FERDNOQTRaM1dVM0c6MTpjaQ&redirect_uri=https://stoxtrading.com&scope=users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
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
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3} alignItems={'center'} justifyItems={'center'}>
                        {/*    <AirdropTextField
                            label="Wallet Address"
                            name="address"
                            type="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your wallet address"
                        /> */}
                        {/*<AirdropTextField
                            label="Email (+500 STOX)"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />*/}
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
                                        Connect your X Account
                                    </Button>


                        <Grid container>
                           
                            <Grid  container offset={"auto"} alignContent={"center"} justifyContent={"center"} >

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

                        {/*  <AirdropTextField
                            label="Name (Optional)"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        /> */}

                        <AirdropTextField
                            label="X Handle (+1,000 STOX)"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
                            placeholder="Enter your Twitter username"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{
                                py: 1.5,


                            }}
                        >
                            {isSubmitting ? 'Submitting...' :  <GenericTypography usage='subTitle' fontSize="0.7rem" sx={{ fontWeight: 'bold' }}>
                                CLAIM YOUR STOX
                            </GenericTypography>
                                }
                        </Button>

                        {/*   <Button
                            variant="outlined"
                            onClick={handleTwitterAuth}
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                            }}
                        >
                            Authorize Twitter
                        </Button> */}
                    </Stack>
                </form>
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