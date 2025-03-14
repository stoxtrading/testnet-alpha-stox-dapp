import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Button, Link, } from '@mui/material';
import { DiscordIcon } from '../../assets/icons/DiscordIcon';
import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import { nvidiaContractConfig } from '../../assets/contracts/dev/Nvidia';
import { stoxContractConfig } from '../../assets/contracts/dev/Stox';
import SingleComponentStack from '../../assets/elements/CustomStack';
import StackTitle from '../buildingBlocks/StackTitle';
import { ClickableTxHashTypography, SubtitleTypography, ButtonTypography } from '../../assets/elements/CustomTypography';

const TradingTokens = () => {



    return (
        <Box >
            <SingleComponentStack >
                <StackTitle
                    title='tokens' />
                <Grid container columnSpacing={2} alignItems="center">
                    <Grid container size={12} rowGap={3} >
                        <Grid container direction="column" rowGap={1} size={{ sm: 12, md: 3 }}>
                            <SubtitleTypography>
                                Order Book Contract
                            </SubtitleTypography>
                            <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${nvidiaOrderBookContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                <ClickableTxHashTypography>{nvidiaOrderBookContractConfig.address}</ClickableTxHashTypography>
                            </Link>
                        </Grid>
                        <Grid container direction="column" rowGap={1} size={{ sm: 12, md: 3 }}>
                            <SubtitleTypography>
                                NVIDIA Token
                            </SubtitleTypography>
                            <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${nvidiaContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                <ClickableTxHashTypography>{nvidiaContractConfig.address}</ClickableTxHashTypography>
                            </Link>
                        </Grid>
                        <Grid container direction="column" rowGap={1} size={{ sm: 12, md: 3 }}>

                            <SubtitleTypography>
                                STOX Token
                            </SubtitleTypography>
                            <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${stoxContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                <ClickableTxHashTypography>{stoxContractConfig.address}</ClickableTxHashTypography>
                            </Link>
                        </Grid>
                        <Grid  container alignItems={'center'} justifyItems={'center'} size={{ sm: 12, md: 3 }}>

                            <Button
                                
                                variant="contained"
                                color="primary"
                                endIcon={<DiscordIcon />}
                                sx={{
                                    height:35,
                                    marginLeft: 2,
                                    backgroundColor: '#5865F2',
                                    '&:hover': {
                                        backgroundColor: '#ED4245',
                                    },
                                    textTransform: 'none',
                                }}
                                component="a"
                                href="https://discordapp.com/channels/1328711049347862548/1339175575037673582"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ButtonTypography sx={{  color: 'white' }}>
                                    FAUCET
                                </ButtonTypography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </SingleComponentStack>
        </Box>
    );
};

export default TradingTokens;