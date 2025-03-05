import { useState } from 'react';
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
}



export default function Airdrop() {
    const { address: connectedWalletAddress, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    
    const [formData, setFormData] = useState<AirdropFormData>({
        address: '',
        email: '',
        name: '',
        twitter: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFireworks, setShowFireworks] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error' as const,
    });

    const [tokensReward, setTokensReward] = useState(100);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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
                    name: '',
                    twitter: '',
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
                    <Stack spacing={3}>
                     {/*    <AirdropTextField
                            label="Wallet Address"
                            name="address"
                            type="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your wallet address"
                        /> */}

                        <AirdropTextField
                            label="Email (Optional)"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />

                        <AirdropTextField
                            label="Name (Optional)"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />

                        <AirdropTextField
                            label="X Handle (Optional)"
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
                            {isSubmitting ? 'Submitting...' :<span> <GenericTypography usage='subTitle' fontSize="0.7rem" sx={{ fontWeight: 'bold' }}>
                                REGISTER TO GET 
                            </GenericTypography>
                            <GenericTypography usage='subTitle' fontSize="1rem" sx={{ fontWeight: 'bold' }}>
                            {tokensReward} STOX
                                </GenericTypography></span>}
                        </Button>
                    </Stack>
                </form>
            </Paper>

            <Box sx={{ width: '100%', maxWidth: 600, textAlign: 'center', mt: 2 }}>
                <GenericTypography>
                    Register your wallet address to be eligible for the upcoming STOX token airdrop.
                    Early participants will receive bonus tokens.
                </GenericTypography>
            </Box>

            <SocialMediaBar />
            <PoweredByBar/>

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