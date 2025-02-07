import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';

import { MenuIcon } from "../../assets/icons/MenuIcon"


import Grid from '@mui/material/Grid2';
import './Header.css';
import LeftSideMenu from './LeftSideMenu';
import { Typography, TypographyProps } from '@mui/material';
import {  GridProps } from '@mui/material';

interface RedirectGridProps extends GridProps {
    redirectTo: string;
}


interface HeaderProps {
    onClick: () => void;
}

const HeaderMenuTypography: React.FC<TypographyProps> = (props) => {
    return (
        <Typography
            {...props}
            color ="#99b8ed"
            sx={{
                fontFamily: 'Anta',
                fontSize: '1.2rem',
                ...props.sx, // Allow overriding styles
            }}
        >
            {props.children}
        </Typography>
    );
};

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
            sx={{
                transition: 'all 0.1s ease-in-out', // Smooth transition for all properties
                '&:hover': {
                    backgroundColor: '#5e6bae',
                    cursor: 'pointer',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Add shadow on hover
                    transform: 'scale(1.05)', // Slightly scale up on hover
                },
                paddingTop: "5px",
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


    return (
        <AppBar position="fixed" className="appBar" sx={{ backgroundColor: "#1e163b" }} >
            <Grid container >
                <Grid size={2} alignItems='center' justifyContent="center" alignContent="center" justifyItems="center" display={{ xs: 'flex', sm: 'flex', md: 'none', }}>
                    <IconButton size="small" onClickCapture={handleClick}>
                        <MenuIcon size={20} color="#2C3E50" />
                    </IconButton>
                    <LeftSideMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                </Grid>
                <Grid size={12} container  alignItems='center' justifyContent="center" alignContent="center" justifyItems="center" display={{ xs: 'none', sm: 'none', md: 'flex', }}>
                <HeaderMenuButton  redirectTo="/">
                        <HeaderMenuTypography>Home</HeaderMenuTypography>
                    </HeaderMenuButton>
                    <HeaderMenuButton redirectTo="/testnet-limit-order-book">
                        <HeaderMenuTypography>Testnet Order Book</HeaderMenuTypography>
                    </HeaderMenuButton>
                    <HeaderMenuButton  redirectTo="/white-paper">
                        <HeaderMenuTypography>White Paper</HeaderMenuTypography>
                    </HeaderMenuButton>
                    <HeaderMenuButton redirectTo="/support">
                        <HeaderMenuTypography>Support</HeaderMenuTypography>
                    </HeaderMenuButton>
                    <HeaderMenuButton  redirectTo="/roadmap">
                        <HeaderMenuTypography>Roadmap</HeaderMenuTypography>
                    </HeaderMenuButton>



                </Grid>
            </Grid>
        </AppBar >
    );
};

export default Header;