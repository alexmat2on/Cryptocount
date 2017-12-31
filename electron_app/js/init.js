// initialize

// 0th: DOM variables
// -----------------------------------------------------------------------------
var addDropdownSelector = document.getElementById("add-dropdown-content");
var dropdownItems = document.getElementsByClassName("dropdown-option");
var coinSearch = document.getElementById("coin-search");

var tabnav = document.getElementById("tabnav");
var tablinks = document.getElementsByClassName("tablinks");
// -----------------------------------------------------------------------------

// 1st: update the coin data
var coinUpdates = updateData();
var coinData;
coinUpdates.then(function(result) {
    coinData = JSON.parse(result);
});

// 2nd: populate an array of all coin IDs
//      array of all coin IDs from CoinMarketCap
var coinIDs;
if (localStorage.coinIDs) {
    coinIDs = localStorage.coinIDs.split(",");
}

if (coinIDs != null) {
    fillDropdown();
} else {
    populateIDs().then(function (coins) {
        coinIDs = coins;
        localStorage.coinIDs = coins;

        // 3rd: populate the search bar
        fillDropdown();
    });
}

// 4th: Tabs (array of tabs at top of screen)
var tabs = ['overview'];
if (localStorage.tabs != null) {
    tabs = localStorage.tabs.split(",");
}

// 5th: Asset content pages
var assetDivs = [];
var txnTableCols = ["Date", "Buy/Sell", "Amount", "Price (BTC)", "Price (USD)"];
var txnTableInserts =
    [
        "<input type='date'></input>",
        "<select name='buySell'><option value='buy'>Buy</option><option value='sell'>Sell</option></select>",
        "<input type='text'></input>",
        "<input type='text'></input>",
        "<input type='text'></input>"
    ];
var txnTableColIsNumeric = [false, false, true, true];


// Finally...
coinUpdates.then(function() {
    refreshNavTabs();
    updateAssetDivs();
    updateOverview();
    document.getElementById("overview_btn").click();    // Select overview when page loads
})
