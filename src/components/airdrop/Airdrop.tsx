import { useState, } from 'react';
import { Stack,  Button, Alert, Snackbar, Paper, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { GenericTypography, HomePageAnnoucementTypography } from '../../assets/elements/CustomTypography';
import { SocialMediaBar } from '../countDown/SocialMediaBar';
import { PoweredByBar } from '../countDown/PoweredByBar';
import { AirdropTextField } from '../../assets/elements/CustomTextField';


interface AirdropFormData {
    address: string;
    email?: string;
    name?: string;
    twitter?: string;
}

export default function Airdrop() {
    const [formData, setFormData] = useState<AirdropFormData>({
        address: '',
        email: '',
        name: '',
        twitter: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.address) {
            setSnackbar({
                open: true,
                message: 'Wallet address is required',
                severity: 'error',
            });
            return;
        }

        try {
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
                setSnackbar({
                    open: true,
                    message: 'Successfully registered for the airdrop!',
                    severity: 'success',
                });

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

    return (
        <Stack rowGap={5} alignItems={'center'} paddingTop="5vh">
            <Grid container justifyContent="center" spacing={2} direction={'column'} alignItems={"center"}>
                <Grid container justifyContent="center" display={{ xs: 'flex', sm: 'none' }} alignItems={"center"}>
                    <HomePageAnnoucementTypography sx={{ fontSize: '2.4rem' }} marginRight='-1rem'>
                        STOX
                    </HomePageAnnoucementTypography>
                </Grid>
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
                        

                        <AirdropTextField
                            label="Wallet Address"
                            name="address"
                            type="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your wallet address"
                        />


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
                            label="Twitter (Optional)"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
                            placeholder="Enter your Twitter username"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                            }}
                        >
                            {isSubmitting ? 'Submitting...' : <GenericTypography usage='subTitle' fontSize="1rem" gutterBottom sx={{ fontWeight: 'bold' }}>
                                REGISTER
                            </GenericTypography>}
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
            <PoweredByBar />

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
        </Stack>
    );
}