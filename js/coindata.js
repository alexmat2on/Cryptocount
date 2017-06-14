var baseurl = "https://api.coinmarketcap.com/v1/ticker/";
var coinData;
if (localStorage.getItem("coinData") !== null) {
    coinData = JSON.parse(localStorage.getItem("coinData"));
}
// Data about every coin on CoinMarketCap. updateData(); will refresh the values

function updateData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            coinData = JSON.parse(this.responseText);
            localStorage.setItem("coinData", this.responseText);
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
