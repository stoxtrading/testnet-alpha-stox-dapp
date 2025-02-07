import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, ISeriesApi, CandlestickData } from 'lightweight-charts';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

const Chart = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<any>(null);
    const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [historicalData, setHistoricalData] = useState<CandlestickData[]>([]);

    // Fetch historical data and set up chart
    useEffect(() => {
        if (chartContainerRef.current && !chartRef.current) {
            const chartOptions = {
                layout: {
                    textColor: 'black',
                    background: { type: ColorType.Solid, color: 'white' },
                },
            };
            const chart = createChart(chartContainerRef.current, chartOptions);
            chartRef.current = chart;

            const candlestickSeries = chart.addCandlestickSeries({
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderVisible: false,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350',
            });
            candlestickSeriesRef.current = candlestickSeries;

            fetch('https://api.universe-bank.com/time-series/timeseries?instrument-id=NVDA&price-source=cboe&start-date=2023-05-24T22:00&end-date=2030-12-25T23:00&granularity=1d')
                .then(response => response.json())
                .then(data => {
                    const candlestickData = data.map((item: any) => ({
                        time: item.time.split(' ')[0],
                        open: item.first,
                        high: item.high,
                        low: item.low,
                        close: item.last,
                    }));

                    candlestickData.sort((a: { time: string }, b: { time: string }) => 
                        new Date(a.time).getTime() - new Date(b.time).getTime()
                    );

                    setHistoricalData(candlestickData);
                    candlestickSeries.setData(candlestickData);
                });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    }, []);

    // WebSocket connection and real-time updates
    useEffect(() => {
        const ws = new WebSocket('wss://api.universe-bank.com/market-data/ws');

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            ws.send(JSON.stringify({ action: 'subscribe', instrument: 'NVDA' }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.body?.NVDA_cboe?.last) {
                const newPrice = data.body.NVDA_cboe.last;
                setPrice(newPrice);

                // Update the last candle or create a new one
                if (candlestickSeriesRef.current && historicalData.length > 0) {
                    const currentDate = new Date().toISOString().split('T')[0];
                    const lastCandle = historicalData[historicalData.length - 1];

                    if (lastCandle.time === currentDate) {
                        // Update the last candle
                        const updatedCandle = {
                            ...lastCandle,
                            close: newPrice,
                            high: Math.max(lastCandle.high, newPrice),
                            low: Math.min(lastCandle.low, newPrice)
                        };
                        
                        const updatedData = [...historicalData.slice(0, -1), updatedCandle];
                        setHistoricalData(updatedData);
                        candlestickSeriesRef.current.update(updatedCandle);
                    } else {
                        // Create a new candle for the current day
                        const newCandle = {
                            time: currentDate,
                            open: lastCandle.close,
                            high: newPrice,
                            low: newPrice,
                            close: newPrice
                        };
                        
                        const updatedData = [...historicalData, newCandle];
                        setHistoricalData(updatedData);
                        candlestickSeriesRef.current.update(newCandle);
                    }
                }
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    },[]);

    return (
        <Box sx={{
            borderRadius: 0,
            border: 1,
            color: '#ECF0F1',
        }}>
            <Stack sx={{ padding: 2 }}>
                <Grid container sx={{ marginBottom: 0.1, marginTop: -2.5, marginLeft: -1 }}>
                    <Grid>
                        <Typography sx={{ fontWeight: 700 }} color='#2C3E50' variant="overline">
                            Chart {price ? `- Last Price: $${price.toFixed(2)}` : ''}
                        </Typography>
                    </Grid>
                </Grid>
                <div 
                    ref={chartContainerRef} 
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'right', 
                        alignItems: 'center', 
                        width: '100%', 
                        maxWidth: '90vw', 
                        height: '50vh' 
                    }} 
                />
            </Stack>
        </Box>
    );
};

export default Chart;