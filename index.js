import express from 'express';
import { config } from 'dotenv';
import { loadGzipJson } from './loadGzipJson.js';
import { BSE_URL, NSE_URL } from './constants.js';

config();

const app = express();
const port = process.env.PORT;


app.use(express.json());

// nse tickers
app.get('/tickers/nse', async (req, res) => {
    try {
        // Fetch the content from the URL
        const response = await loadGzipJson(NSE_URL);
        const data = response
            .filter((item) => item.segment === 'NSE_EQ' && !!item.trading_symbol)
            .reduce((acc, item) => {
                const { name, exchange, instrument_type, trading_symbol: ticker, short_name } = item;

                acc.push({
                    name,
                    exchange,
                    instrument_type,
                    ticker,
                    short_name,
                });
                return acc;
            }, []);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).send({ error: 'Could not get tickers from NSE' });
    }
});

// bse tickers
app.get('/tickers/bse', async (req, res) => {
    try {
        // Fetch the content from the URL
        const response = await loadGzipJson(BSE_URL);
        const data = response
            .filter((item) => item.segment === 'BSE_EQ' && !!item.trading_symbol)
            .reduce((acc, item) => {
                const { name, exchange, instrument_type, trading_symbol: ticker, short_name } = item;

                acc.push({
                    name,
                    exchange,
                    instrument_type,
                    ticker,
                    short_name,
                });
                return acc;
            }, []);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).send({ error: 'Could not get tickers from BSE' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
