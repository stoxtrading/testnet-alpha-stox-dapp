import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';

import { MenuIcon } from "../../assets/icons/MenuIcon"


import Grid from '@mui/material/Grid2';
import './Header.css';
import LeftSideMenu from './LeftSideMenu';
import { Typography, TypographyProps } from '@mui/material';



interface HeaderProps {
    onClick: () => void;
}

const HeaderMenuTypography: React.FC<TypographyProps> = (props) => {
    return (
        <Typography
            {...props}
            color ="black"
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

const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };


    return (
        <AppBar position="fixed" className="appBar" sx={{ backgroundColor: "white" }} >
            <Grid container >
                <Grid size={2} alignItems='center' justifyContent="center" alignContent="center" justifyItems="center" display={{ xs: 'flex', sm: 'flex', md: 'none', }}>
                    <IconButton size="small" onClickCapture={handleClick}>
                        <MenuIcon size={20} color="#2C3E50" />
                    </IconButton>
                    <LeftSideMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                </Grid>
                <Grid size={12} container  alignItems='center' justifyContent="center" alignContent="center" justifyItems="center" display={{ xs: 'none', sm: 'none', md: 'flex', }}>
                    <Grid size={2}
                   
                        component="div"
                        alignItems='center'
                        justifyContent="center"
                        alignContent="center"
                        justifyItems="center"
                        onClick={() => navigate('/')}
                        sx={{ '&:hover': { backgroundColor: '#f0f0f0', cursor: 'pointer'}, paddingTop: "5px", paddingBottom: "5px" }}>
                        <HeaderMenuTypography >Home</HeaderMenuTypography>
                    </Grid>

                    <Grid size={2}
                        component="div"
                        alignItems='center'
                        justifyContent="center"
                        alignContent="center"
                        justifyItems="center"
                        onClick={() => navigate('/testnet-limit-order-book')}
                        sx={{ '&:hover': { backgroundColor: '#f0f0f0', cursor: 'pointer'}, paddingTop: "5px", paddingBottom: "5px" }}>
                        <HeaderMenuTypography >Tesnet Order Book</HeaderMenuTypography>
                    </Grid>
                    <Grid size={2}
                        component="div"
                        alignItems='center'
                        justifyContent="center"
                        alignContent="center"
                        justifyItems="center"
                        onClick={() => navigate('/')}
                        sx={{ '&:hover': { backgroundColor: '#f0f0f0', cursor: 'pointer'}, paddingTop: "5px", paddingBottom: "5px" }}>
                    

                        <HeaderMenuTypography >White Paper</HeaderMenuTypography>
                    </Grid>
                    <Grid size={2} alignItems='center' justifyContent="center" alignContent="center" justifyItems="center">
                        <HeaderMenuTypography>Support</HeaderMenuTypography>
                    </Grid>
                    <Grid size={2} alignItems='center' justifyContent="center" alignContent="center" justifyItems="center">
                        <HeaderMenuTypography>Roadmap</HeaderMenuTypography>
                    </Grid>
                    <Grid size={2} alignItems='center' justifyContent="center" alignContent="center" justifyItems="center">
                        <HeaderMenuTypography>Connect Wallet </HeaderMenuTypography>
                    </Grid>



                </Grid>
            </Grid>
        </AppBar >
    );
};

export default Header;