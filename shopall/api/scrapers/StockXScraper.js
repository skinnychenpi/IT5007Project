const got = require('got');
const Sneaker = require('../model/model.js');

async function getProductsAndInfo(key, count) {
    try {
        const response = await got.post('https://xw7sbct9v6-1.algolianet.com/1/indexes/products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.32.1&x-algolia-application-id=XW7SBCT9V6&x-algolia-api-key=6b5e76b49705eb9f51a06d3c82f7acee', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/x-www-form-urlencoded",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site"
            },
            body: `{"params":"query=${key}&facets=*&filters=&hitsPerPage=${count}"}`,
            http2: true
        });
       
        
        var json = JSON.parse(response.body);
        var products = [];
        var numOfShoes = json.hits.length;

        for (var i = 0; i < json.hits.length; i++) {
            if (!json.hits[i].style_id || (json.hits[i].style_id).indexOf(' ') >= 0) {
                numOfShoes--;
                continue;
            }
            var shoe = new Sneaker();
            shoe.urlKey = json.hits[i].url,
            shoe.styleID =  json.hits[i].style_id,
            shoe.shoeName =  json.hits[i].name,
            shoe.brand =  json.hits[i].brand,
            shoe.silhoutte =  json.hits[i].make,
            shoe.make =  json.hits[i].make,
            shoe.colorway = json.hits[i].colorway,
            shoe.retailPrice = json.hits[i].searchable_traits['Retail Price'],
            shoe.thumbnail = json.hits[i].media.imageUrl,
            shoe.releaseDate = json.hits[i].release_date,
            shoe.description = json.hits[i].description,
            
            shoe.resellLinks.stockX = 'https://stockx.com/' + json.hits[i].url

            if(json.hits[i].lowest_ask){
                shoe.lowestResellPrice.stockX = json.hits[i].lowest_ask;
            }
            products.push(shoe);
        }
        return products;


    } catch (error) {
        let err = new Error("Could not connect to StockX while searching '", key, "' Error: ", error)
        console.log(err);
    }
}



async function getPrices(urlKey, styleID) {
    let priceMap = {sizes:[], prices:[]};
    try {
        const response = await got('https://stockx.com/api/products/' + urlKey + '?includes=market', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15'
            },
            http2: true
        });
        let json = JSON.parse(response.body);
        Object.keys(json.Product.children).forEach(function (key) {
            if (json.Product.children[key].market.lowestAsk == 0) return;
            //if size is in womens, then remove "W"
            var size = json.Product.children[key].shoeSize;
            if(size[size.length-1] == 'W'){
                size = size.substring(0, size.length - 1);               
            }
            priceMap.sizes.push(size);
            priceMap.prices.push(json.Product.children[key].market.lowestAsk);
            
        });

        return priceMap;
    } catch (error) {
        console.log("Error occurs at StockXScrapper, getPrices:");
        console.log(error)
        let err = new Error("Could not connect to StockX while searching '", styleID, "' Error: ", error)
        console.log(err);

    }
}

async function workFlow() {
    var products = await getProductsAndInfo("adidas", 5);
    var pricesMap = await getPrices(products[0].urlKey, products[0].styleID);
    console.log(pricesMap);

}

// workFlow();

module.exports = {getProductsAndInfo : getProductsAndInfo, getPrices: getPrices};