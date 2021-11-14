const request = require('request');
const got = require('got');
const cheerio = require('cheerio');

var options = {
    url: "",
    body: "",
    headers: {
        'User-Agent': 'Sneaks-API',
        'Content-Type': 'text/html',
    }
};

async function getLink(styleID) {
    try {
        const response = await got.post('https://graphql.stadiumgoods.com/graphql', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15',
                'Content-Type': 'application/json'

            },
            body: '{"operationId":"sg-front/cached-a41eba558ae6325f072164477a24d3c2","variables":{"categorySlug":"","initialSearchQuery":"'+styleID+'","initialSort":"RELEVANCE","includeUnavailableProducts":null,"filteringOnCategory":false,"filteringOnBrand":false,"filteringOnMensSizes":false,"filteringOnKidsSizes":false,"filteringOnWomensSizes":false,"filteringOnApparelSizes":false,"filteringOnGender":false,"filteringOnColor":false,"filteringOnPriceRange":false},"locale":"USA_USD"}',
            http2: true,
            responseType: 'json'
        });
        
        var linkAndLowestResellPrice = {platform: "stadiumGoods"};

        if (response.body.data.configurableProducts.edges[0]) {
            linkAndLowestResellPrice["resellLinks"] = response.body.data.configurableProducts.edges[0].node.pdpUrl;
            if(response.body.data.configurableProducts.edges[0].node.lowestPrice.__typename == 'DiscountedPrice'){
                linkAndLowestResellPrice["lowestResellPrice"] = Number(response.body.data.configurableProducts.edges[0].node.lowestPrice.originalValue.formattedValue.replace(/[^0-9.-]+/g, ""));
            }
            else{
                linkAndLowestResellPrice["lowestResellPrice"] = Number(response.body.data.configurableProducts.edges[0].node.lowestPrice.value.formattedValue.replace(/[^0-9.-]+/g, ""));
            }
        } else {
            console.log("Product '" + styleID + "' not found on Stadium Goods'");
        }
        return linkAndLowestResellPrice;
    } catch (error) {
        console.log(error);
    }
}


async function workFlow() {
    var dict = await getLink("FY2903");
    console.log(dict);

}

workFlow();






// function getPrices(shoe, callback) {
//     if (!shoe.resellLinks.stadiumGoods) {
//         callback()
//     } else {
//         options.url = shoe.resellLinks.stadiumGoods;
//         let priceMap = {};
//         request.post(options,
//             function getPriceMap(error, response, data) {
//                 if (error) {
//                     let err = new Error("Could not connect to Stadium Goods while searching '", shoe.styleID, "' Error: ", error)
//                     console.log(err);
//                     callback(err)
//                 } else if (response.statusCode != 200) {
//                     let err = new Error("Could not connect to Stadium Goods while searching '", shoe.styleID, "' -  Status Code: ", response.statusCode)
//                     console.log(err);
//                     callback(err)
//                 } else {
//                     const $ = cheerio.load(data);
//                     $('.product-sizes__input').map(function (i, product) {
//                         if ($(product).attr('data-stock') == 'true') {
//                             var size = $(product).attr('data-size');
//                             if(size[size.length-1]=='W'){
//                                 size = size.substring(0, size.length - 1);
//                             }
//                             priceMap[size] = parseInt($(product).attr('data-amount')) / 100;
//                         }
//                         if (i == $('.product-sizes__input').length - 1) {
//                             shoe.resellPrices.stadiumGoods = priceMap;
//                             callback();
//                         }
//                     });
//                 }
//             });
//     }
// }


// module.exports = { getLink: getLink, getPrices: getPrices };