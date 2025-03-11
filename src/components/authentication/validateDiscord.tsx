import { useEffect, useRef, useState } from "react";
import { useDiscord } from '../contexts/useDiscord';
import { useNavigate } from 'react-router-dom';
import { CommonPageBackground } from "../surfaces/CommonPageBackground";
import { Box,  } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { HomePageAnnoucementTypography } from "../../assets/elements/CustomTypography";
import { ClipLoader } from 'react-spinners';
import { useAccount,} from 'wagmi'

export default function ValidateDiscord() {
    const isCodeVerified = useRef<boolean>(false);
    const {  setIsVerified,  setDiscordUserName } = useDiscord();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const {  address: connectedWalletAddress } = useAccount();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        console.log(code);
        console.log(isCodeVerified);
        if (code && !isCodeVerified.current) {
            isCodeVerified.current = true;
            const verifyDiscordCode = async () => {
                try {
                    const endpoint = `${import.meta.env.VITE_APP_STOX_TRADING_BOT_ENDPOINT}`
                    const redirectUri = `${import.meta.env.VITE_APP_REDIRECT_ENDPOINT}`+'/validate-discord-auth'
                    const body = {
                        redirectUri,
                    };
                    console.log('fetching')
                    const response = await fetch(endpoint +'?code='+ code +'&ethWalletAddress='+connectedWalletAddress, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                    });
                    const data = await response.json();
                    console.log(data)
                    if (response.ok) {
                        console.log('user is identified')
                        setIsVerified(true);
                        setDiscordUserName(`${data.username}#${data.discriminator}`);
                        navigate('/airdrop');
                    } else {
                        throw new Error(data.error || 'Failed to verify Discord account');
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

            verifyDiscordCode();
        } else {
            setLoading(false);
        }
    }, [isCodeVerified]);

    return (
        <CommonPageBackground>
            <Box display="flex" flexDirection="column" marginTop="10vh" alignItems="center">
                            <Grid container justifyContent="center" display={{ xs: 'flex', sm: 'none' }} alignItems={"center"}>
                                <HomePageAnnoucementTypography sx={{ fontSize: '2.4rem' }} marginRight='-1rem'>
                                    CONNECTING DISCORD ACCOUNT...
                                </HomePageAnnoucementTypography>
                                {loading ? (
                                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                                ) : null}
                            </Grid>
               

            </Box>
        </CommonPageBackground>
    );
}