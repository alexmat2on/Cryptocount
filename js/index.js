var coins = ['bitcoin', 'ethereum', 'ripple', 'nem', 'maidsafecoin', 'gridcoin'];
// An array of currently supported coins to choose from.
// To support a new coin, simply add it to this array and place an image of its logo
// in the img/ directory, as a png with the same name.

var tabs = ['overview'];
if (localStorage.getItem("tabs") !== null) {
    tabs = localStorage.getItem("tabs").split(",");
}
// An array of the tabs at the bottom of the screen. These represent only the
// coins which you are holding.

// --- SELECTOR FOR NEW CRYPTOCURRENCIES TO ADD TO PORTFOLIO ---
var addNewCoins = coins;
if (localStorage.getItem("addCoins") !== null) {
    addNewCoins = localStorage.getItem("addCoins").split(",");
}
