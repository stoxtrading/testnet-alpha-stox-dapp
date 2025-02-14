import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { Button, Link,} from '@mui/material';
import { DiscordIcon } from '../../assets/icons/DiscordIcon';
import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import { nvidiaContractConfig } from '../../assets/contracts/dev/Nvidia';
import { stoxContractConfig } from '../../assets/contracts/dev/Stox';
import SingleComponentStack from '../../assets/elements/CustomStack';
import StackTitle from '../buildingBlocks/StackTitle';
import { ClickableTxHashTypography, SubtitleTypography } from '../../assets/elements/CustomTypography';

const TradingTokens = () => {



    return (
        <Box >
            <SingleComponentStack >
                <StackTitle
                    title='tokens' />
                <Grid container columnSpacing={2} alignItems="center">
                    <Grid container size={12}>
                        <Grid container size={3}>
                            <Stack>
                                <SubtitleTypography>
                                    Order Book Contract
                                </SubtitleTypography>
                                <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${nvidiaOrderBookContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                    <ClickableTxHashTypography>{nvidiaOrderBookContractConfig.address}</ClickableTxHashTypography>
                                </Link>

                            </Stack>
                        </Grid>

                        <Grid container size={3}>
                            <Stack>
                                <SubtitleTypography>
                                    NVIDIA Token
                                </SubtitleTypography>
                                <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${nvidiaContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                    <ClickableTxHashTypography>{nvidiaContractConfig.address}</ClickableTxHashTypography>
                                </Link>

                            </Stack>
                        </Grid>
                        <Grid container size={3}>
                            <Stack>
                                <SubtitleTypography>
                                    STOX Token
                                </SubtitleTypography>
                                <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${stoxContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                                    <ClickableTxHashTypography>{stoxContractConfig.address}</ClickableTxHashTypography>
                                </Link>

                            </Stack>
                        </Grid>
                        <Grid container offset='auto'  justifyItems={'center'} size={3}>

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
                                <SubtitleTypography sx={{ fontWeight: 600, color: 'white' }}>
                                    GET TESTNET TOKENS
                                </SubtitleTypography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </SingleComponentStack>
        </Box>
    );
};

export default TradingTokens;