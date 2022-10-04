const fetcher = require('./src/fetcher.js');

exports.handler = async (event) => {
    let games = await fetcher.jpGames();
    let game2 = await fetcher.americaGames();

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/json',
        },
        body: JSON.stringify(games),
    };
    return response;
}