const axios = require('axios');
const { Command } = require('commander');
const program = new Command();

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

// Fetch data from CoinGecko API
async function fetchData() {
    try {
        const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 100,
                page: 1,
                sparkline: false,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from CoinGecko API', error);
    }
}

// Display fetched data
async function displayData() {
    const data = await fetchData();
    console.log(data);
}

// Sort data by specified key
async function sortData(key) {
    const data = await fetchData();
    const sortedData = data.sort((a, b) => a[key] - b[key]);
    console.log(sortedData);
}

// Search for a specific cryptocurrency by name
async function searchData(name) {
    const data = await fetchData();
    const result = data.filter(coin => coin.name.toLowerCase().includes(name.toLowerCase()));
    console.log(result);
}

// Command line interface setup
program
    .command('fetch')
    .description('Fetch cryptocurrency data')
    .action(displayData);

program
    .command('sort <key>')
    .description('Sort cryptocurrency data by specified key')
    .action(sortData);

program
    .command('search <name>')
    .description('Search for a cryptocurrency by name')
    .action(searchData);

program.parse(process.argv);
