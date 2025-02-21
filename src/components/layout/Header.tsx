import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { MenuIcon } from "../../assets/icons/MenuIcon"
import Grid from '@mui/material/Grid2';
import './Header.css';
import LeftSideMenu from './LeftSideMenu';
import { Box, GridProps } from '@mui/material';
//import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'
import { truncateAddress } from '../../tools/Tools';
import { HeaderMenuTypography, HomePageAnnoucementTypography, } from '../../assets/elements/CustomTypography';


interface RedirectGridProps extends GridProps {
    redirectTo: string;
}


interface HeaderProps {
    onClick: () => void;
}


const HeaderMenuButton: React.FC<RedirectGridProps> = ({ redirectTo, children, ...gridProps }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(redirectTo);
    };

    return (
        <Grid
            {...gridProps}
            size={3}
            component="div"
            alignItems="center"
            justifyContent="center"
            alignContent="center"
            justifyItems="center"
            onClick={handleClick}
            color='white'
            paddingLeft="5px"
            paddingRight="5px"
            sx={{
                transition: 'all 0.1s ease-in-out', // Smooth transition for all properties
                '&:hover': {

                    cursor: 'pointer',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Add shadow on hover
                    transform: 'scale(1.05)', // Slightly scale up on hover
                },
                paddingTop: "8px",
                paddingBottom: "5px",
                ...gridProps.sx,
            }}
        >
            {children}
        </Grid>
    );
};

const Header: React.FC<HeaderProps> = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { address: connectedWalletAddress } = useAccount()







    return (
        <AppBar position="fixed" className="appBar" sx={{ backgroundColor: "black", paddingTop: "3vh", paddingRight: "1vw", paddingLeft: "1vw" }} >
            <Grid container >
                <Grid size={2} alignItems='center' justifyContent="center" alignContent="center" justifyItems="center" display={{ xs: 'flex', sm: 'flex', md: 'none', }}>
                    <IconButton size="small" onClickCapture={handleClick}>
                        <MenuIcon color="#2C3E50" />
                    </IconButton>
                    <LeftSideMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                </Grid>

                <Grid size={9} container display={{ xs: 'none', sm: 'none', md: 'flex', }} justifyItems={"center"} alignItems={"center"} alignContent={"center"} justifyContent={"center"} >
                    <HeaderMenuButton redirectTo="/" display={{ xs: 'none', sm: 'none', md: 'flex', }}>
                        <HomePageAnnoucementTypography sx={{ fontSize: '2rem', }} color="inherit">STOX</HomePageAnnoucementTypography>
                    </HeaderMenuButton>
                    <HeaderMenuButton redirectTo="/testnet-limit-order-book">
                        <HeaderMenuTypography color="inherit">Order Book</HeaderMenuTypography>
                    </HeaderMenuButton>
                    <HeaderMenuButton redirectTo="/liquidity">
                        <HeaderMenuTypography color="inherit">Liquidity</HeaderMenuTypography>
                    </HeaderMenuButton>
                    <HeaderMenuButton redirectTo="/white-paper">
                        <HeaderMenuTypography color="inherit">White Paper</HeaderMenuTypography>
                    </HeaderMenuButton>
                    {/*  <HeaderMenuButton redirectTo="/roadmap">
                        <HeaderMenuTypography color="inherit">Roadmap</HeaderMenuTypography>
                    </HeaderMenuButton> */}

                </Grid>

                {connectedWalletAddress ? (
                    <Grid
                        size={{ sm: 5, md: 2 }}
                        component="div"
                        alignItems="center"
                        justifyContent="center"
                        alignContent="center"
                        justifyItems="center"

                        offset='auto'
                        paddingLeft="15px"
                        paddingRight="15px"
                    >
                        <Box
                            borderRadius="6px"
                            onClick={openAccountModal}
                            sx={{
                                background: 'linear-gradient(180deg, #D1D3E2 0%, #75629D 100%)',
                                transition: 'all 0.1s ease-in-out', // Smooth transition for all properties
                                '&:hover': {
                                    backgroundColor: '#5e6bae',
                                    cursor: 'pointer',
                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Add shadow on hover
                                    transform: 'scale(1.05)', // Slightly scale up on hover
                                },
                                paddingTop: "8px",
                                paddingBottom: "5px",


                            }}>
                            <HeaderMenuTypography paddingLeft="8px"
                                paddingRight="8px"
                                color="black">{truncateAddress(connectedWalletAddress)}</HeaderMenuTypography>
                        </Box>
                    </Grid>
                ) : (
                    <Grid
                        size={{ sm: 5, md: 2 }}
                        component="div"
                        alignItems="center"
                        justifyContent="center"
                        alignContent="center"
                        justifyItems="center"
                        offset='auto'
                        paddingLeft="15px"
                        paddingRight="15px"


                    >
                        <Box
                            borderRadius="6px"
                            onClick={openConnectModal}
                            sx={{
                                background: 'linear-gradient(180deg, #D1D3E2 0%, #75629D 100%)',
                                transition: 'all 0.1s ease-in-out', // Smooth transition for all properties
                                '&:hover': {
                                    backgroundColor: '#5e6bae',
                                    cursor: 'pointer',
                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Add shadow on hover
                                    transform: 'scale(1.05)', // Slightly scale up on hover
                                },
                                paddingTop: "8px",
                                paddingBottom: "5px",


                            }}>
                            <HeaderMenuTypography
                                paddingLeft="8px"
                                paddingRight="8px"
                                color="black">Connect Wallet
                            </HeaderMenuTypography>
                        </Box>
                    </Grid>
                )}



            </Grid>

        </AppBar >
    );
};

export default Header;