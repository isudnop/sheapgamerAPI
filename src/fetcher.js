const { getGamesAmerica, getGamesEurope, getGamesJapan, getQueriedGamesAmerica, getPrices, parseNSUID, Region} = require('nintendo-switch-eshop');

async function jpGames() {
    const gamesList = await getGamesJapan();
    let gameIDArray = [];
    let gameObj = {};
    const slice = gamesList.slice(0, 50);
    slice.forEach(function(game) {
        let nsid = parseNSUID(game, Region.ASIA);
        gameIDArray.push(nsid);
        gameObj[nsid] = {};
        gameObj[nsid].title = game.TitleName; 
        gameObj[nsid].image = game.ScreenshotImgURL; 
    });
    
    let priceList = await getPrices('JP', gameIDArray);
    priceList.prices.forEach(function(game) {
        let price = typeof game.regular_price === 'undefined' ? 'No data' : game.regular_price;
        gameObj[game.title_id].price = price;
    });

    return gameObj;
}

module.exports.jpGames = jpGames;
