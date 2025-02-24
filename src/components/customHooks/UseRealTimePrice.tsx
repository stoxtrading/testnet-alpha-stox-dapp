import { useState, useEffect } from 'react';

const useRealTimePrice = (instrument: string) => {
    const [price, setPrice] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const ws = new WebSocket('wss://api.universe-bank.com/market-data/ws');

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            ws.send(JSON.stringify({ action: 'subscribe', instrument }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.body?.[`${instrument}_cboe`]?.last) {
                setPrice(data.body[`${instrument}_cboe`].last);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setError('WebSocket error');
        };

        return () => {
            ws.close();
        };
    }, [instrument]);

    return { price, error };
};

export default useRealTimePrice;