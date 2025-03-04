import { useState, useEffect } from 'react';
import { Stack, Button, Alert, Snackbar, Paper, Box } from '@mui/material';
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

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    hue: number;
    alpha: number;
    size: number;
}

const Fireworks = ({ onComplete }: { onComplete: () => void }) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    
    useEffect(() => {
        // Create initial explosion
        createExplosion();
        
        // Set a timer to auto-dismiss
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);
        
        // Animation frame loop
        let animationId: number;
        const animate = () => {
            updateParticles();
            animationId = requestAnimationFrame(animate);
        };
        
        animationId = requestAnimationFrame(animate);
        
        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            clearTimeout(timer);
        };
    }, [onComplete]);
    
    const createExplosion = () => {
        const newParticles: Particle[] = [];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Create multiple explosions
        for (let i = 0; i < 10; i++) {
            const offsetX = (Math.random() - 0.5) * 200;
            const offsetY = (Math.random() - 0.5) * 200;
            const hue = Math.random() * 360;
            
            // Create particles for each explosion
            for (let j = 0; j < 50; j++) {
                const angle = Math.random() * Math.PI * 10;
                const speed = 1 + Math.random() * 5;
                
                newParticles.push({
                    x: centerX + offsetX,
                    y: centerY + offsetY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    hue: hue + Math.random() * 30,
                    alpha: 1,
                    size: 2 + Math.random() * 4
                });
            }
        }
        
        setParticles(newParticles);
    };
    
    const updateParticles = () => {
        setParticles(prevParticles => 
            prevParticles
                .map(p => ({
                    ...p,
                    x: p.x + p.vx,
                    y: p.y + p.vy,
                    vy: p.vy + 0.05, // Gravity
                    alpha: p.alpha - 0.01,
                    size: Math.max(0, p.size - 0.05)
                }))
                .filter(p => p.alpha > 0)
        );
    };
    
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9999
        }}>
            {particles.map((p, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        backgroundColor: `hsla(${p.hue}, 100%, 50%, ${p.alpha})`,
                        boxShadow: `0 0 ${p.size * 2}px hsla(${p.hue}, 100%, 50%, ${p.alpha})`,
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            ))}
            <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '15px 30px',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '24px',
                textAlign: 'center'
            }}>
                Successfully registered for the airdrop!
            </div>
        </div>
    );
};

export default function Airdrop() {
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