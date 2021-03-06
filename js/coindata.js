var coins = [];
if (localStorage.getItem("coins") !== null) {
    coins = localStorage.getItem("coins").split(",");
}
// An array of currently supported coins to choose from.
// To support a new coin, simply add it to this array and place an image of its logo
// in the img/ directory, as a png with the same name.

var baseurl = "https://api.coinmarketcap.com/v1/ticker/";
// The CoinMarkCap API

var coinData;
if (localStorage.getItem("coinData") !== null) {
    coinData = JSON.parse(localStorage.getItem("coinData"));
}

function updateData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            coinData = JSON.parse(this.responseText);
            localStorage.setItem("coinData", this.responseText);

            if (coins.length == 0) {    // Prevent the dropdown from repeating
                for (var i = 0; i < coinData.length; i++) {
                    coins.push(coinData[i].id);
                }
                localStorage.setItem("coins", coins);
            }
        }
    };
    xhttp.open("GET", baseurl, true);
    xhttp.send();
}

function getUSD(coinName) {
    for (var i = 0; i < coinData.length; i++) {
        if (coinData[i].id == coinName || coinData[i].name == coinName) {
            return coinData[i].price_usd;
            break;
        }
    }
}

function getTicker(coinName) {
    for (var i = 0; i < coinData.length; i++) {
        if (coinData[i].id == coinName || coinData[i].name == coinName) {
            return coinData[i].symbol;
            break;
        }
    }
}

function getFullName(coinName) {
    for (var i = 0; i < coinData.length; i++) {
        if (coinData[i].id == coinName || coinData[i].name == coinName) {
            return coinData[i].name;
            break;
        }
    }
}

updateData();
