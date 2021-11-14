const stockXAPI = require('../scrapers/StockXScraper.js');
const goatAPI = require('../scrapers/GoatScraper.js');
const FlightClubAPI = require('../scrapers/FlightClubScraper.js');

async function searchProduct(message, count) {
    var products = await stockXAPI.getProductsAndInfo(message, count);
    var toReturn = [];
    
    // convert from object to a dictionary
    var convert = function(obj) {
        var keys = Object.keys(obj);
        var dict = {};
        
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key == "imageLinks" || key == "resellLinks" || key == "lowestResellPrice" || key == "resellPrices") continue;
            dict[key] = obj[key];
        }

        return dict;
    };
    
    for (var i = 0; i < products.length; i++) {
        toReturn.push(convert(products[i]));
    }
    
    return toReturn;
}

async function getMostPopular(count) {
    var toReturn = await searchProduct("", count);
    return toReturn;
}

async function getProductDetail(styleID, urlKey) {
    var products = await stockXAPI.getProductsAndInfo(styleID, 1);
    
    // convert from object to a dictionary
    var convert = function(obj) {
        var keys = Object.keys(obj);
        var dict = {};
        
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            dict[key] = obj[key];
        }

        return dict;
    };

    var sneakerDetail = convert(products[0]);

    // Fill in stockX Info:
    sneakerDetail.resellPrices.stockX = await stockXAPI.getPrices(urlKey, styleID);
    
    // Fill in Goat Info:
    var goatLinkAndLRP = await goatAPI.getLink(styleID);
    sneakerDetail.resellLinks.goat = goatLinkAndLRP.resellLinks;
    sneakerDetail.lowestResellPrice.goat = goatLinkAndLRP.lowestResellPrice;
    
    sneakerDetail.resellPrices.goat = await goatAPI.getPrices(goatLinkAndLRP.resellLinks);

    sneakerDetail.imageLinks = await goatAPI.getPictures(goatLinkAndLRP.resellLinks, styleID);

    // Fill in FlightClub Info:

    var FCLinkAndLRPAndDes = await FlightClubAPI.getLink(styleID);
    sneakerDetail.resellLinks.flightClub = FCLinkAndLRPAndDes.resellLinks;
    sneakerDetail.lowestResellPrice.flightClub = FCLinkAndLRPAndDes.lowestResellPrice;
    sneakerDetail.description = FCLinkAndLRPAndDes.description;
    
    sneakerDetail.resellPrices.flightClub = await FlightClubAPI.getPrices(FCLinkAndLRPAndDes.resellLinks, styleID);

    return sneakerDetail;
}

module.exports = {searchProduct: searchProduct, getMostPopular: getMostPopular, getProductDetail: getProductDetail};

async function test() {
    // var searchResult = await searchProduct("Adidas", 1);
    // console.log(searchResult);

    // searchResult = await getMostPopular(10);
    // console.log(searchResult);

    searchResult = await getProductDetail('CT8013-170', 'air-jordan-12-retro-royalty-taxi');
    console.log(searchResult);
}

// test();

