import { Typography, Card, Box, Container, Divider, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { motion } from 'framer-motion';

import { AirdropIcon } from "../../assets/icons/AirdropIcon";
import { CheckIcon } from '../../assets/icons/CheckIcon';
import { PreSaleIcon } from '../../assets/icons/PreSaleIcon';
import { StocksExchangeIcon } from '../../assets/icons/StocksExchangeIcon';
import { GenericTypography } from '../../assets/elements/CustomTypography';

export default function WelcomePageSubsection() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const features = [
        {
            icon: <AirdropIcon fontSize="large" />,
            title: "STOX Tokens",
            description: "Used as a currency for purchasing Security tokens on the Limit Order Book smart contract."
        },
        {
            icon: <CheckIcon fontSize="large" />,
            title: "Security Tokens",
            description: "A representation of publicly traded stocks. The first company represented by a security token is Nvidia Inc."
        },
        {
            icon: <PreSaleIcon fontSize="large" />,
            title: "Decentralized Limit Order Book",
            description: "The backbone of STOX TRADING. A fully on-chain, non-custodial trading system for equities-backed tokens."
        },
        {
            icon: <StocksExchangeIcon fontSize="large" />,
            title: "Automated Market-Making Service",
            description: "Provides liquidity on the Order Book and ensures that prices remain aligned with those on the traditional market."
        }
    ];

    return (
        <Box
            sx={{
                backgroundColor: '#000000',
                paddingY: 10,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background wave effect similar to image */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '40%',
                    zIndex: 0,
                    background: 'linear-gradient(90deg, #ff00ff 0%, #0099ff 50%, #00ffff 100%)',
                    opacity: 0.15,
                    maskImage: 'url(/wave-pattern.svg)',
                    maskSize: 'cover',
                    maskPosition: 'bottom',
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                >
                    <Typography
                        variant="h2"
                        component="h2"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: 300,
                            fontSize: { xs: '2rem', md: '3rem' },
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            marginBottom: 4,
                            fontFamily: 'Orbitron, sans-serif', // Match the futuristic font from image
                        }}
                    >
                        A Global, Permissionless Access to Stock Markets
                    </Typography>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: 0,
                            padding: 4,
                            marginBottom: 6,
                            // border: '1px solid rgba(255, 0, 255, 0.2)',
                        }}
                    >
                        <GenericTypography
                            fontSize='1.1rem'
                             align="justify"
                        >
                            STOX TRADING is a Decentralized Limit Order Book (DLOB) system developed for trading
                            tokenized real-world equities on the blockchain. It enables efficient, transparent, and
                            non-custodial trading of securities-backed tokens by decentralizing the Order Book on a smart contract.
                        </GenericTypography>

                        

                        <GenericTypography
                            align="center"
                            fontSize='2rem'
                            marginTop='10rem'
                        >
                            STOX ecosystem components
                        </GenericTypography>
                    </Paper>
                </motion.div>

                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid size={{ xs: 12, sm: 3 }} key={index}>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={fadeIn}
                                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                            >
                                <Card
                                    sx={{
                                        minHeight: '42vh',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        padding: 3,
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                        border: index % 2 === 0
                                            ? '1px solid rgba(255, 0, 255, 0.3)'
                                            : '1px solid rgba(0, 255, 255, 0.3)',
                                        borderRadius: 6,
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: index % 2 === 0
                                                ? '0 0 15px rgba(255, 0, 255, 0.3)'
                                                : '0 0 15px rgba(0, 255, 255, 0.3)',
                                            border: index % 2 === 0
                                                ? '1px solid rgba(255, 0, 255, 0.5)'
                                                : '1px solid rgba(0, 255, 255, 0.5)',
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: index % 2 === 0
                                                ? 'rgba(255, 0, 255, 0.1)'
                                                : 'rgba(0, 255, 255, 0.1)',
                                            borderRadius: '0',
                                            padding: 2,
                                            marginBottom: 2,
                                            color: index % 2 === 0 ? '#ff00ff' : '#00ffff',
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <GenericTypography
                                        fontSize='1.2rem'
                                        marginBottom="1.2rem"
                                        marginTop="1rem"
                                    >
                                        {feature.title}
                                    </GenericTypography>
                                    <GenericTypography
                                        fontSize='0.9rem'
                                    >
                                        {feature.description}
                                    </GenericTypography>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}