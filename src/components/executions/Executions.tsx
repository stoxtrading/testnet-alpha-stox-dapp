import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link, Tooltip, } from '@mui/material';
import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import getPoolReserves from '../liquidityPoolPricing/LiquidityPoolPricing'
import SingleComponentStack from '../../assets/elements/CustomStack';
import StackTitle from '../buildingBlocks/StackTitle';
import {NumbersTypography, ClickableTxHashTypography, TableTitleTypography} from '../../assets/elements/CustomTypography';


const GridAsksNb = styled(Grid)(() => ({
  borderRadius: 0,
  backgroundColor: '#FFFFFF',
  textAlign: 'center',
  color: '#1e163b',
  alignContent: 'center',
  height: 28,

}));

const GridAsksAddr = styled(Grid)(() => ({
  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
  backgroundColor: '#FFFFFF',
  textAlign: 'left',
  color: '#1e163b',
  alignContent: 'center',
  height: 28,
  paddingLeft: 6,
}));

const GridQty = styled(Grid)(() => ({
  borderTopRightRadius: 6,
  borderBottomRightRadius: 6,
  backgroundColor: '#FFFFFF',
  textAlign: 'center',
  color: '#1e163b',
  alignContent: 'center',
  height: 28,

}));

const GridAsksHeader = styled(Grid)(() => ({
  borderRadius: 0,
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
      <SingleComponentStack  >

      <StackTitle
                title='Executions'  />
        <Grid container columns={12} display={{ xs: 'none', sm: 'flex', }} >
          <GridAsksHeader sx={{ textAlign: 'left' }} size={4}><TableTitleTypography>TX HASH</TableTitleTypography></GridAsksHeader>
          <GridAsksHeader size={2}><TableTitleTypography>TIMESTAMP</TableTitleTypography></GridAsksHeader>
          <GridAsksHeader size={2}><TableTitleTypography>{currencyReserves?.symbol || 'loading'} PRICE</TableTitleTypography></GridAsksHeader>
          <GridAsksHeader size={2}><TableTitleTypography>{assetReserves?.symbol || 'loading'} PRICE</TableTitleTypography></GridAsksHeader>
          <GridAsksHeader size={2}><TableTitleTypography>QUANTITY</TableTitleTypography></GridAsksHeader>
        </Grid>

        <Grid container columns={12} display={{ xs: 'flex', sm: 'none' }} >
          <GridAsksHeader sx={{ textAlign: 'left' }} size={4}>TX HASH</GridAsksHeader>
          <GridAsksHeader size={2}><TableTitleTypography>TIMESTAMP</TableTitleTypography></GridAsksHeader>
          <GridAsksHeader size={2}><TableTitleTypography>{currencyReserves?.symbol || 'loading'} PX</TableTitleTypography></GridAsksHeader>
          <GridAsksHeader size={2}><TableTitleTypography>{assetReserves?.symbol || 'loading'} PRICE</TableTitleTypography></GridAsksHeader>
          <GridAsksHeader size={2}><TableTitleTypography>QTY</TableTitleTypography></GridAsksHeader>
        </Grid>

        {executionsEvents.map((event, index) => (
          <Grid container key={index} columns={12}>
            <GridAsksAddr

              size={4}>
              <span>


                <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/tx/${event.transactionHash}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                  <Stack>
                    <Tooltip title={event.transactionHash} placement="top">
                      <ClickableTxHashTypography >{truncateTxHash(event.transactionHash)}</ClickableTxHashTypography></Tooltip>
                  </Stack>
                </Link>
              </span>

            </GridAsksAddr>
            <GridAsksNb size={2}> <NumbersTypography >
              {event.timestamp}
            </NumbersTypography></GridAsksNb>
            <GridAsksNb size={2}> <NumbersTypography >
              {(Number(formatEthValue((event.args.amount1))) * stoxPrice).toFixed(4)}
            </NumbersTypography></GridAsksNb>
            <GridAsksNb size={2}> <NumbersTypography >
              {(Number(formatEthValue((event.args.amount1)))).toFixed(2)}
            </NumbersTypography></GridAsksNb>
            <GridQty size={2}>
              <NumbersTypography >
                {formatEthValue(event.args.amount2)}
              </NumbersTypography>
            </GridQty>

          </Grid>
        ))}
      </SingleComponentStack>

    </Box>

  )
}
function setError(message: string) {
  throw new Error('Function not implemented.');
}

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

