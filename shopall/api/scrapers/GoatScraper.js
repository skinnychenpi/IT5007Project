const got = require('got');
const request = require('request');



async function getLink(styleID) {
    try {
    const response = await got.post('https://2fwotdvm2o-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.25.1%3Breact%20(16.9.0)%3Breact-instantsearch%20(6.2.0)%3BJS%20Helper%20(3.1.0)&x-algolia-application-id=2FWOTDVM2O&x-algolia-api-key=ac96de6fef0e02bb95d433d8d5c7038a', {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15',
        'Content-Type': 'application/json'
    },
    body: '{"requests":[{"indexName":"product_variants_v2","params":"distinct=true&maxValuesPerFacet=1&page=0&query=' + styleID + '&facets=%5B%22instant_ship_lowest_price_cents"}]}',
    http2: true,
    });
    var json = JSON.parse(response.body);

    var linkAndLowestResellPrice = {platform: "goat"};

    if (json.results[0].hits[0]) {
        if (json.results[0].hits[0].lowest_price_cents_usd / 100 != 0) {
          
            linkAndLowestResellPrice["lowestResellPrice"] = json.results[0].hits[0].lowest_price_cents_usd / 100;
        }
        linkAndLowestResellPrice["resellLinks"] = 'http://www.goat.com/sneakers/' + json.results[0].hits[0].slug;
    } else {
        linkAndLowestResellPrice["lowestResellPrice"] = -1;
        linkAndLowestResellPrice["resellLinks"] = "";
    }
    return linkAndLowestResellPrice;


    } catch (error) {
      let err = new Error("Could not connect to Goat while searching '" + styleID + "' Error: ", error)
      console.log(err);
    }
}


async function getPrices(resellLinks) {
    if (!resellLinks) {
      console.log("Can not find resell links at goat.");
    } else {
      let apiLink = resellLinks.replace('sneakers/', 'web-api/v1/product_variants?productTemplateId=');
      let priceMap = {};

      try {
        const response = await got(apiLink, {	
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; rv:20.0) Gecko/20121202 Firefox/20.0',
            'Content-Type': 'application/json',
          },
          
          http2: true,
        });
        var json = JSON.parse(response.body);
        for (var i = 0; i < json.length; i++) {
          if(json[i].shoeCondition == 'used') continue;
          if(priceMap[json[i].size]){
            priceMap[json[i].size] = json[i].lowestPriceCents.amount / 100 < priceMap[json[i].size] ? json[i].lowestPriceCents.amount / 100 : priceMap[json[i].size];
          }
          else{
            priceMap[json[i].size] = json[i].lowestPriceCents.amount / 100 ;
          }          
        }

        var convertedMap = {sizes:[], prices:[]};
        for (var key in priceMap) {
          convertedMap.sizes.push(key);
          convertedMap.prices.push(priceMap[key]);
        }
        return convertedMap;
      } catch (error) {
        console.log(error);
        let err = new Error("Could not connect to Goat while searching '" + shoe.styleID + "' Error: ", error)
        console.log(err);
      }
    }
}





async function getPictures(resellLinks, styleID) {
    if (!resellLinks) {
        console.log("Can not find resell links at goat.");
    } else {
        let apiLink = resellLinks.replace('sneakers', 'web-api/v1/product_templates');
        try {
            const response = await got(apiLink, {
                headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; rv:20.0) Gecko/20121202 Firefox/20.0',
                'Content-Type': 'application/json',
                },
                http2: true,
            });
            var json = JSON.parse(response.body);
            imageLinks = [];
            if (json.productTemplateExternalPictures) {
                if (json.productTemplateExternalPictures[0]) {
                imageLinks.push(json.productTemplateExternalPictures[0].mainPictureUrl);
                }
                if (json.productTemplateExternalPictures[2]) {
                imageLinks.push(json.productTemplateExternalPictures[2].mainPictureUrl);
                }
                if (json.productTemplateExternalPictures[5]) {
                imageLinks.push(json.productTemplateExternalPictures[5].mainPictureUrl);
                }
                if (json.productTemplateExternalPictures[7]) {
                imageLinks.push(json.productTemplateExternalPictures[7].mainPictureUrl);
                }
                if (json.productTemplateExternalPictures[3]) {
                imageLinks.push(json.productTemplateExternalPictures[3].mainPictureUrl);
                }
            }
            return imageLinks;

        } catch (error) {
            let err = new Error("Could not connect to Goat while grabbing pictures for '" + styleID + "' Error: ", error)
            console.log(err);
        }
    }
}


async function workFlow() {
    var dict = await getLink("FY2903");
    console.log(dict);
    var priceMap = await getPrices(dict["resellLinks"]);
    console.log(priceMap);
    // var imageLinks = getPictures(dict["resellLinks"], "FY2903");
    // console.log(imageLinks);
}

// workFlow();

module.exports = {getLink: getLink, getPrices: getPrices, getPictures: getPictures};
