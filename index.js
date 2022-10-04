const jpFetch = require('./src/fetcher.js');

exports.handler = async (event) => {
    let games = await jpFetch.jpGames();

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/json',
        },
        body: JSON.stringify(games),
    };
    return response;
}