// Where the 'ticker' parameter is the name of the cryptocurrency
// to retrieve the data about.
// Eg. 'bitcoin', 'ethereum', etc.

function getUSD(ticker) {
    var xhttp = new XMLHttpRequest();
    var coinData;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            coinData = JSON.parse(this.responseText);
            document.getElementById("btc").innerHTML = '$' + coinData[0].price_usd;
        }
    };
    xhttp.open("GET", baseurl + ticker + "/", true);
    xhttp.send();
}
