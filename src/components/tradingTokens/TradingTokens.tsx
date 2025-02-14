import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { Button, Link, Typography } from '@mui/material';
import { DiscordIcon } from '../../assets/icons/DiscordIcon';
import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import { nvidiaContractConfig } from '../../assets/contracts/dev/Nvidia';
import { stoxContractConfig } from '../../assets/contracts/dev/Stox';
import SingleComponentStack from '../../assets/elements/CustomStack';
import StackTitle from '../buildingBlocks/StackTitle';

const TradingTokens = () => {
  
   

    return (
        <Box >
            <SingleComponentStack >
                <StackTitle
                title='tokens'  />
                <Grid container columnSpacing={2} alignItems="center">
                    <Grid container size={9}>
                        <Grid container size={4}>
                            <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${nvidiaOrderBookContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                <Stack>
                                    <Typography variant="caption" sx={{ color: '#3f51b5' }}>
                                        Order Book Smart Contract:
                                    </Typography>
                                    <Typography variant="caption" sx={{
                                        color: 'black', wordBreak: 'break-all', fontWeight: 'bold', cursor: 'pointer',
                                        '&:hover': {
                                            color: '#3f51b5',
                                            textDecoration: 'underline',
                                        },
                                    }}>{nvidiaOrderBookContractConfig.address}</Typography>
                                </Stack>
                            </Link>
                        </Grid>

                        <Grid container size={4}>
                            <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${nvidiaContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                <Stack>
                                    <Typography variant="caption" sx={{ color: '#3f51b5' }}>
                                        NVIDIA Token:
                                    </Typography>
                                    <Typography variant="caption" sx={{
                                        color: 'black', wordBreak: 'break-all', fontWeight: 'bold', cursor: 'pointer',
                                        '&:hover': {
                                            color: '#3f51b5',
                                            textDecoration: 'underline',
                                        },
                                    }}>{nvidiaContractConfig.address}</Typography>
                                </Stack>
                            </Link>
                        </Grid>
                        <Grid container size={4}>
                            <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${stoxContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                <Stack>
                                    <Typography variant="caption" sx={{ color: '#3f51b5' }}>
                                        STOX Token:
                                    </Typography>
                                    <Typography variant="caption" sx={{
                                        color: 'black', wordBreak: 'break-all', fontWeight: 'bold', cursor: 'pointer',
                                        '&:hover': {
                                            color: '#3f51b5',
                                            textDecoration: 'underline',
                                        },
                                    }}>{stoxContractConfig.address}</Typography>
                                </Stack>
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid container offset='auto' sx={{ marginRight: 2 }} justifyItems={'center'}>
                        <Stack justifyContent={'center'} alignContent={'center'} alignItems={'center'} direction={'column'}>

                            <Typography variant="caption" sx={{ color: "#2C3E50", fontWeight: 600 }}>
                                GET TESTNET TOKENS
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<DiscordIcon />}
                                sx={{
                                    marginLeft: 2,
                                    backgroundColor: '#7289da',
                                    '&:hover': {
                                        backgroundColor: '#5e6bae',
                                    },
                                    textTransform: 'none',
                                }}
                                component="a"
                                href="https://discordapp.com/channels/1328711049347862548/1339175575037673582"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Discord Channel
                            </Button>
                        </Stack>
                    </Grid>

                </Grid>
            </SingleComponentStack>
        </Box>
    );
};

export default TradingTokens;