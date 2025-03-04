import { IconButton } from '@mui/material';
import { useState } from 'react';
import Grid from '@mui/material/Grid2';





export const SocialMediaBar = () => {

    const [isDiscordHovered, setDiscordIsHovered] = useState(false);
    const [isTelegramHovered, setTelegramIsHovered] = useState(false);
    const [isXHovered, setXIsHovered] = useState(false);


    return (
        <Grid
            container
            columns={12}
            alignItems={"center"}
            justifyContent={"center"}
            marginTop='-30px'
        >

           
            <Grid  alignContent={"center"} justifyContent={"center"} >
                <IconButton
                    onClick={() => window.open('https://x.com/stox_trading', '_blank')}
                    onMouseEnter={() => setXIsHovered(true)}
                    onMouseLeave={() => setXIsHovered(false)}
                    sx={{
                        transition: 'all 0.3s ease',
                        transform: isXHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                >
                    <img
                        src={'./twitter-white.png'}
                       
                            width= '20px'
                        
                    />
                </IconButton>
            </Grid>
            <Grid alignItems={"center"} justifyContent={"center"} columnGap={4}>
                <IconButton
                    onClick={() => window.open('https://t.me/+77kd9ZB43BNiMDE0', '_blank')}
                    onMouseEnter={() => setTelegramIsHovered(true)}
                    onMouseLeave={() => setTelegramIsHovered(false)}
                    sx={{
                        transition: 'all 0.3s ease',
                        transform: isTelegramHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                >
                    <img
                        src={'./telegram-white.svg'}
                        style={{
                            width: '40px',
                            transition: 'all 0.3s ease',
                            filter: isTelegramHovered ? 'brightness(1.2)' : 'brightness(1)'
                        }}
                    />
                </IconButton>
            </Grid>
            <Grid  alignItems={"center"} justifyContent={"center"}>
                <IconButton
                    onClick={() => window.open('https://discord.gg/39P3FdqmXT', '_blank')}
                    onMouseEnter={() => setDiscordIsHovered(true)}
                    onMouseLeave={() => setDiscordIsHovered(false)}
                    sx={{
                        transition: 'all 0.3s ease',
                        transform: isDiscordHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                >
                    <img
                        src={'./discord-white.png'}
                        style={{
                            width: '20px',
                            transition: 'all 0.3s ease',
                            filter: isDiscordHovered ? 'brightness(1.2)' : 'brightness(1)'
                        }}
                    />
                </IconButton>
            </Grid>

        </Grid>
    );
};