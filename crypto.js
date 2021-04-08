const cryptoURL = "  https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=3&convert=USD&CMC_PRO_API_KEY=bb4ee065-7794-4b40-88ff-a1c23363abec";

  function getHistoricPrices(prices) {
    const {
      percent_change_90d,
      percent_change_60d,
      percent_change_30d,
      percent_change_7d,
      percent_change_24h,
      percent_change_1h,
      price,
    } = prices;
  
    const ninetyAgoPrice = calculatePriceFromPercentageChange(
      price,
      percent_change_90d
    );
    const sixtyAgoPrice = calculatePriceFromPercentageChange(
      price,
      percent_change_60d
    );
    const thirtyAgoPrice = calculatePriceFromPercentageChange(
      price,
      percent_change_30d
    );
    const sevenAgoPrice = calculatePriceFromPercentageChange(
      price,
      percent_change_7d
    );
    const dayAgoPrice = calculatePriceFromPercentageChange(
      price,
      percent_change_24h
    );
    const hourAgoPrice = calculatePriceFromPercentageChange(
      price,
      percent_change_1h
    );
  
    return [
      ninetyAgoPrice,
      sixtyAgoPrice,
      thirtyAgoPrice,
      sevenAgoPrice,
      dayAgoPrice,
      hourAgoPrice,
      price,
    ];
  }
//   var myChart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: ["90d", "60d", "30d", "7d", "24h", "1h", "Current"],
//       datasets: [
//         {
//           label: "Price",
//           borderWidth: 1,
//           data: getHistoricPrices(coin.quote.USD),
//           borderColor: "rgba(255, 99, 132, 1)",
//           backgroundColor: "rgba(255, 99, 132, 0.2)",
//         },
//       ],
//     },
//   });

  function renderLineGraph(coin) {
    const ctx = document.getElementById("myChart");
    const price = coin.quote.USD.price;
    const [ninetyAgoPrice] = getHistoricPrices(coin);
    const timeAgo = ["90d", "60d", "30d", "7d", "24h", "1h", "Current"];
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: timeAgo,
        datasets: [
          {
            label: "Price",
            borderWidth: 1,
            data: getHistoricPrices(coin.quote.USD),
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      },
      options: {
        tooltips: {
          enabled: true,
          mode: "nearest",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                suggestedMax: price,
                suggestedMin: ninetyAgoPrice,
              },
            },
          ],
        },
      },
    });
  }
  function calculatePriceFromPercentageChange(currentPrice, percentageChange) {
    let denominator;
    let historicPrice;
    if (percentageChange >= 100) {
      percentageChange = percentageChange + 100;
      denominator = percentageChange * 0.01;
      historicPrice = currentPrice / denominator;
    }
  
    if (percentageChange < 100 && percentageChange > 0) {
      denominator = 1 + percentageChange / 100;
      historicPrice = currentPrice / denominator;
    }
  
    if (percentageChange < 0) {
      const original = (currentPrice / (100 + percentageChange)) * 100;
      historicPrice = original;
    }
    return historicPrice;
  } 

async function getCryptoPrices() {
    const response = await fetch(cryptoURL);
    const jsonData = await response.json();
    const coin = jsonData.data[0];
    renderLineGraph(coin);
    console.log(coin);
  }
  getCryptoPrices();
