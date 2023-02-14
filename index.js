const fetcher = require('./src/nintendo-switch-fetcher.js');

exports.handler = async (event) => {
    let games = await fetcher.fetchGamesAndPrices('JP');
    let game2 = await fetcher.fetchGamesAndPrices('US');

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/json',
        },
        body: JSON.stringify(games),
    };
    return response;
}