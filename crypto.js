const cryptoURL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=3&convert=USD&CMC_PRO_API_KEY=YOUR_API_KEY";

async function getCryptoPrices() {
    const response = await fetch(cryptoURL);
    const jsonData = await response.json();
    const coin = jsonData.data[0];
  
    console.log(coin);
  }
  getCryptoPrices();
  <script src="crypto.js"></script>  