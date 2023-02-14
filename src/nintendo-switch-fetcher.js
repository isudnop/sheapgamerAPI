const { getGamesAmerica, getGamesEurope, getGamesJapan, getQueriedGamesAmerica, getPrices, parseNSUID, Region} = require('nintendo-switch-eshop');

async function fetchGamesAndPrices(region) {
    let gamesList, regionId, titleAttr, imageAttr;
    switch (region) {
        case 'JP': 
            gamesList = await getGamesJapan();
            regionId = Region.ASIA;
            titleAttr = 'TitleName';
            imageAttr = 'ScreenshotImgURL';
            break;
        case 'US': 
            gamesList = await getGamesAmerica();
            regionId = Region.AMERICAS;
            titleAttr = 'title';
            imageAttr = 'boxart';
            break;
        case 'EU': 
            gamesList = await getGamesEurope();
            regionId = Region.EUROPE;
            titleAttr = 'title';
            imageAttr = 'boxart';
            break;
    }

    let gameIDArray = [];
    let gameObj = {};
    const slice = gamesList.slice(0, 50);
    slice.forEach(function(game) {
        let nsid = parseNSUID(game, regionId);
        gameIDArray.push(nsid);
        gameObj[nsid] = {};
        gameObj[nsid].title = game[titleAttr]; 
        gameObj[nsid].image = game[imageAttr]; 
    });

    let priceList = await getPrices(region, gameIDArray);
    priceList.prices.forEach(function(game) {
        let price = typeof game.regular_price === 'undefined' ? 'No data' : game.regular_price;
        gameObj[game.title_id].price = price;
    });

    return gameObj;
}

module.exports.fetchGamesAndPrices = fetchGamesAndPrices;
