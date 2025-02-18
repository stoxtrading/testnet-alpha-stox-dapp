import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { MenuIcon } from "../../assets/icons/MenuIcon"
import Grid from '@mui/material/Grid2';
import './Header.css';
import LeftSideMenu from './LeftSideMenu';
import { GridProps } from '@mui/material';
//import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'
import { truncateAddress } from '../../tools/Tools';
import { HeaderMenuTypography, } from '../../assets/elements/CustomTypography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
            size={2}
            component="div"
            alignItems="center"
            justifyContent="center"
            alignContent="center"
            justifyItems="center"
            onClick={handleClick}
            color='#1e163b'
            paddingLeft="5px"
            paddingRight="5px"
            sx={{
                transition: 'all 0.1s ease-in-out', // Smooth transition for all properties
                '&:hover': {
                    color: 'white',
                    backgroundColor: '#5e6bae',
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


    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMd = useMediaQuery(theme.breakpoints.only('md'));
    const isLg = useMediaQuery(theme.breakpoints.only('lg'));
    const isXl = useMediaQuery(theme.breakpoints.only('xl'));

    const getBackgroundColor = () => {
        if (isXs) return '#1e163b';
        if (isSm) return '#1e163b';
        if (isMd) return 'white';
        if (isLg) return 'white';
        if (isXl) return 'white';
        return 'defaultColor';
    };



    return (
        <AppBar position="fixed" className="appBar" sx={{ backgroundColor: getBackgroundColor() }} >
            <Grid container >
                <Grid size={2} alignItems='center' justifyContent="center" alignContent="center" justifyItems="center" display={{ xs: 'flex', sm: 'flex', md: 'none', }}>
                    <IconButton size="small" onClickCapture={handleClick}>
                        <MenuIcon color="#2C3E50" />
                    </IconButton>
                    <LeftSideMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                </Grid>
                <Grid size={10} container display={{ xs: 'none', sm: 'none', md: 'flex', }}>
                    <HeaderMenuButton redirectTo="/">
                        <HeaderMenuTypography color="inherit">Home</HeaderMenuTypography>
                    </HeaderMenuButton>
                    <HeaderMenuButton redirectTo="/testnet-limit-order-book">
                        <HeaderMenuTypography color="inherit">Testnet Order Book</HeaderMenuTypography>
                    </HeaderMenuButton>
                    <HeaderMenuButton redirectTo="/liquidity">
                        <HeaderMenuTypography color="inherit">Liquidity</HeaderMenuTypography>
                    </HeaderMenuButton>
                    <HeaderMenuButton redirectTo="/white-paper">
                        <HeaderMenuTypography color="inherit">White Paper</HeaderMenuTypography>
                    </HeaderMenuButton>
                    <HeaderMenuButton redirectTo="/roadmap">
                        <HeaderMenuTypography color="inherit">Roadmap</HeaderMenuTypography>
                    </HeaderMenuButton>

                </Grid>

                {connectedWalletAddress ? (
                    <Grid
                        size={{ sm: 5, md: 2 }}
                        component="div"
                        alignItems="center"
                        justifyContent="center"
                        alignContent="center"
                        justifyItems="center"
                        onClick={openAccountModal}
                        offset='auto'
                        paddingLeft="15px"
                        paddingRight="15px"
                        sx={{
                            backgroundColor: '#1e163b',
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
                        <HeaderMenuTypography color="white">{truncateAddress(connectedWalletAddress)}</HeaderMenuTypography>
                    </Grid>
                ) : (
                    <Grid
                        size={{ sm: 5, md: 2 }}
                        component="div"
                        alignItems="center"
                        justifyContent="center"
                        alignContent="center"
                        justifyItems="center"
                        onClick={openConnectModal}
                        offset='auto'
                        paddingLeft="15px"
                        paddingRight="15px"
                        sx={{

                            backgroundColor: '#1e163b',
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
                        <HeaderMenuTypography color="white">Connect Wallet</HeaderMenuTypography>
                    </Grid>
                )}



            </Grid>

        </AppBar >
    );
};

export default Header;