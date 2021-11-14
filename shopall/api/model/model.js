var Sneaker = function Sneaker() {
    // Members:
    this.shoeName = "";
    this.brand = "";
    this.silhoutte = "";
    this.styleID = ""; 
    this.retailPrice = -1;
    this.releaseDate = "";
    this.description = "";
    this.imageLinks =  [];
    this.thumbnail  = "";
    this.urlKey = "";
    this.make  = "";
    this.colorway  = "";
    this.resellLinks = {
            stockX: "",
            goat: "",
            flightClub: ""
        };
    this.lowestResellPrice = {
            stockX: -1,
            goat: -1,
            flightClub: -1
        };
    this.resellPrices = {
            stockX: {sizes:[], prices:[]},
            goat: {sizes:[], prices:[]},
            flightClub: {sizes:[], prices:[]}
        };
}

module.exports = Sneaker;