import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { CopyIcon } from "../../assets/icons/CopyIcon";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import getPoolReserves from '../liquidityPoolPricing/LiquidityPoolPricing'


const GridAsksNb = styled(Grid)(({ theme }: { theme: any }) => ({
  borderRadius: 0,
  backgroundColor: '#FFFFFF',
  ...theme.typography.body2,
  textAlign: 'center',
  color: '#1e163b',
  alignContent: 'center',
  height: 28,

}));

const GridAsksAddr = styled(Grid)(({ theme }: { theme: any }) => ({
  borderTopLeftRadius :6,
  borderBottomLeftRadius :6,
  backgroundColor: '#FFFFFF',
  ...theme.typography.body2,
  textAlign: 'left',
  color: '#1e163b',
  alignContent: 'center',
  height: 28,
  paddingLeft: 6,
}));

const GridQty = styled(Grid)(({ theme }: { theme: any }) => ({
  borderTopRightRadius :6,
  borderBottomRightRadius :6,
  backgroundColor: '#FFFFFF',
  ...theme.typography.body2,
  textAlign: 'center',
  color: '#1e163b',
  alignContent: 'center',
  height: 28,

}));

const GridAsksHeader = styled(Grid)(({ theme }: { theme: any }) => ({
  borderRadius: 0,
  ...theme.typography.body2,
  textAlign: 'center',
  color: '#1e163b',
  paddingLeft: 2,
  height: 30,
  alignContent: 'center',
}));

interface ContractEvent {
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  args: {
    amount1: bigint;
    amount2: bigint;
    [key: string]: any;
  };
}



function formatEthValue(value: bigint): string {
  return ethers.formatEther(value);
}


const truncateTxHash = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};



export default function Executions(): JSX.Element {

  const [executionsEvents, setExecutionsEvents] = useState<ContractEvent[]>([]);

  const [currencyReserves, setCurrencyReserves] = useState<any | null>(null);
  const [assetReserves, setAssetReserves] = useState<any | null>(null);
  const [stoxPrice, setStoxPrice] = useState<any | null>(null);

  async function getContractEvents(
    contractAddress: string,
    contractABI: any[],
    eventName: string
  ): Promise<ContractEvent[]> {
    // Connect to Ethereum provider
    const provider = new ethers.JsonRpcProvider(`${import.meta.env.VITE_APP_HTTP_RPC_ENDPOINT}`);

    // Create typed contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    try {
      const events = await contract.queryFilter(eventName);

      // Sort events by block number from larger to smaller
      const sortedEvents = events.sort((a, b) => b.blockNumber - a.blockNumber);

      const eventsWithTimestamps = await Promise.all(
        sortedEvents.map(async (event) => {
          const block = await provider.getBlock(event.blockNumber);
          const timestamp = block ? new Date(block.timestamp * 1000).toLocaleString('fr-FR') : 'N/A';

          return {
            ...event,
            timestamp,
          };
        })
      );

      return eventsWithTimestamps.map(event => {
        const typedEvent = event as unknown as ethers.EventLog;

        return {
          transactionHash: event.transactionHash,
          blockNumber: event.blockNumber,
          blockHash: event.blockHash,
          transactionIndex: event.transactionIndex,
          address: event.address,
          data: event.data,
          topics: event.topics,
          timestamp: event.timestamp,
          args: {
            amount1: typedEvent.args[0],
            amount2: typedEvent.args[1],
            ...typedEvent.args
          },
          removed: event.removed
        };
      });
    } catch (error) {
      console.error('Event retrieval error:', error);
      return [];
    }
  }
  useEffect(() => {
    // Example usage
    const contractAddress = nvidiaOrderBookContractConfig.address;
    const contractABI = nvidiaOrderBookContractConfig.abi; // Contract ABI
    const eventName = 'Execution';

    getContractEvents(contractAddress, [...contractABI], eventName)
      .then(events => setExecutionsEvents(events));

  },);

  useEffect(() => {
            const fetchPoolReserves = async () => {
                try {
                    const reserves = await getPoolReserves(`${import.meta.env.VITE_APP_POOL_ADDRESS}`);
                    setCurrencyReserves(reserves.token0);
                    setAssetReserves(reserves.token1);
                    setStoxPrice(Number(reserves.token0.reserve) / Number(reserves.token1.reserve));
                    console.log("fetching STOX reserves", Number(reserves.token0.reserve) / Number(reserves.token1.reserve))
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError(String(err));
                    }
                } finally {
                    setLoading(false);
                }
            };
           
            fetchPoolReserves();
        }, []);

  return (
    <Box >
            <Stack sx={{ padding: 2, backgroundColor: 'rgba(153, 184, 237, 0.9)', borderRadius: 2}}  >



        <Grid container sx={{ marginBottom: 0.1, marginTop: -2.5, marginLeft: -1 }}>
          <Grid  >
            <Typography sx={{ fontWeight: 700 }} color='#1e163b' variant="overline">Executions</Typography>
          </Grid>
        </Grid>
        <Grid container columns={12} display={{ xs: 'none', sm: 'flex', }} >
          <GridAsksHeader sx={{ textAlign: 'left' }} size={4}>TX HASH</GridAsksHeader>
          <GridAsksHeader size={2}>TIMESTAMP</GridAsksHeader>
          <GridAsksHeader size={2}>{currencyReserves?.symbol || 'loading'} PRICE</GridAsksHeader>
          <GridAsksHeader size={2}>{assetReserves?.symbol || 'loading'} PRICE</GridAsksHeader>
          <GridAsksHeader size={2}>QUANTITY</GridAsksHeader>
        </Grid>

        <Grid container columns={12} display={{ xs: 'flex', sm: 'none' }} >
          <GridAsksHeader sx={{ textAlign: 'left' }} size={4}>TX HASH</GridAsksHeader>
          <GridAsksHeader size={2}>BLOCK</GridAsksHeader>
          <GridAsksHeader size={2}>{currencyReserves !== null ? `${(currencyReserves.symbol)} ` : 'Loading ccy...'} PX</GridAsksHeader>
          <GridAsksHeader size={2}>{assetReserves !== null ? `${(assetReserves.symbol)} ` : 'Loading ccy...'} PRICE</GridAsksHeader>
          <GridAsksHeader size={2}>QTY</GridAsksHeader>
        </Grid>

        {executionsEvents.map((event, index) => (
          <Grid container key={index} columns={12}>
            <GridAsksAddr 
            
            size={4}>
              <span>
                {truncateTxHash(event.transactionHash)}
              </span>
              <IconButton size="small">
                <CopyIcon size={15} color="white" />
              </IconButton>
            </GridAsksAddr>
            <GridAsksNb size={2}> <span >
              {event.timestamp}
            </span></GridAsksNb>
            <GridAsksNb size={2}> <span >
              {(Number(formatEthValue((event.args.amount1))) * stoxPrice).toFixed(4)}
            </span></GridAsksNb>
            <GridAsksNb size={2}> <span >
              {(Number(formatEthValue((event.args.amount1)))).toFixed(2)}
            </span></GridAsksNb>
            <GridQty size={2}>
              <span >
                {formatEthValue(event.args.amount2)}
              </span>
            </GridQty>

          </Grid>
        ))}
      </Stack>

    </Box>

  )
}
function setError(message: string) {
  throw new Error('Function not implemented.');
}

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

