import { useEffect, useRef, useState } from 'react';
import { createChart, ISeriesApi, ColorType, AreaSeries, AreaData } from 'lightweight-charts';
import Box from '@mui/material/Box';
import RealTimePrice from '../../components/realTimePrice/RealTimePrice';
import SingleComponentStack from '../../assets/elements/CustomStack';
import StackTitle from '../buildingBlocks/StackTitle';
import { Divider } from '@mui/material';

interface TimeSeriesDataPoint {
    time: string;
    first: number;
    high: number;
    low: number;
    last: number;
}



const AreaChart = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<unknown>(null);
    const areaSeriesRef = useRef<ISeriesApi<"Area"> | null>(null);
    const [historicalData, setHistoricalData] = useState<AreaData[]>([]);
    const [histoDataLoaded, setHistoDataLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (chartContainerRef.current && !chartRef.current) {
            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: 'hsl(200, 10%, 20%)' },
                    textColor:"white"
                },
                grid: {
                    vertLines: {
                        visible: false,
                    },
                    horzLines: {
                        visible: false,
                    },
                },

                width: chartContainerRef.current.clientWidth,
                height: 400,
            });
            chartRef.current = chart;
            chart.timeScale().fitContent();

            const newSeries = chart.addSeries(AreaSeries, {
                lineWidth: 1,
                lineColor: "white",
                topColor: 'hsl(200, 10%, 20%)',
                bottomColor: 'hsl(310, 10%, 50%)'
            });
            areaSeriesRef.current = newSeries;

            fetch('https://api.universe-bank.com/time-series/timeseries?instrument-id=NVDA&price-source=cboe&start-date=2023-05-24T22:00&end-date=2030-12-25T23:00&granularity=1d')
                .then(response => response.json())
                .then(data => {
                    const areaData = data.map((item: TimeSeriesDataPoint) => ({
                        time: item.time.split(' ')[0],
                        value: item.last,
                    }));

                    areaData.sort((a: { time: string }, b: { time: string }) =>
                        new Date(a.time).getTime() - new Date(b.time).getTime()
                    );

                    setHistoricalData(areaData);
                    newSeries.setData(areaData);
                    setHistoDataLoaded(true);
                });
        

        return () => {
            if (chartRef.current) {
                chart.remove();
                chartRef.current = null;
            }
        };}
    }, []);

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

                if (areaSeriesRef.current && historicalData.length > 0) {
                    const currentDate = new Date().toISOString().split('T')[0];
                    const lastCandle = historicalData[historicalData.length - 1];

                    if (lastCandle.time === currentDate) {
                        const updatedCandle = {
                            ...lastCandle,
                            value: newPrice,
                        };

                        const updatedData = [...historicalData.slice(0, -1), updatedCandle];
                        setHistoricalData(updatedData);
                        areaSeriesRef.current.update(updatedCandle);
                    } else {
                        const newCandle = {
                            time: currentDate,
                            value: newPrice
                        };

                        const updatedData = [...historicalData, newCandle];
                        setHistoricalData(updatedData);
                        areaSeriesRef.current.update(newCandle);
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
    }, [histoDataLoaded]);

    return (
        <Box sx={{}}>
            <SingleComponentStack height={500}>
                <StackTitle title='Market' />
                <Divider color="#595959" sx={{ marginBottom:"0.5rem"}}/>
                <RealTimePrice />
                <div
                    ref={chartContainerRef}
                    style={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        maxWidth: '90vw',
                        
                        marginTop: 8,
                    }}
                />
            </SingleComponentStack>
        </Box>
    );
};

export {  AreaChart };