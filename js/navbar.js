var tabs = ['overview'];
if (localStorage.getItem("tabs") !== null) {
    tabs = localStorage.getItem("tabs").split(",");
}
// An array of the tabs at the bottom of the screen. These represent only the
// coins which you are holding.

// --------- SELECTOR FOR NEW CRYPTOCURRENCIES TO ADD TO PORTFOLIO -------------
var addDropdownSelector = document.getElementById("add-dropdown-content");
var addNewCoins = coins;
if (localStorage.getItem("addCoins") !== null) {
    addNewCoins = localStorage.getItem("addCoins").split(",");
}

for (var i=0; i < addNewCoins.length; i++) {
    var button = document.createElement("button");
    var buttonAction = "addToPortfolio('" + addNewCoins[i] + "');";
    button.setAttribute("onclick", buttonAction);
    button.innerHTML = addNewCoins[i];
    addDropdownSelector.appendChild(button);
};
// =============================================================================

refreshNavTabs();   // Refresh the nav tabs so Overview appears
updateOverview();
document.getElementById("overview_btn").click();    // Select overview

function addToPortfolio(coinName) {
    // Add coinName to the portfolio.
    updateData();
    if (coinData) {
        // Ensure that coinData has data in it before adding an entry.
        tabs.push(coinName);    // Create a new tab for it at the bottom
        localStorage.setItem("tabs",tabs);

        // Remove the entry from the dropdown menu
        for (var i = 0; i < addNewCoins.length; i++) {
            if (addNewCoins[i] == coinName) {
                addNewCoins.splice(i,1);
                addDropdownSelector.removeChild(addDropdownSelector.children[i]);
            }
        }
        localStorage.setItem("addCoins", addNewCoins);

        // Update the views
        updateAssetDivs();
        refreshNavTabs();

        // Select the newly added asset
        document.getElementById(coinName+"_btn").click();
    } else {
        alert("Could not connect to CoinMarketCap.com.\nPlease try again.");
    }
}

function refreshNavTabs() {
    // Update the navigation tabs at the bottom of the screen
    var tabnav = document.getElementById("tabnav");
    var tablinks = document.getElementsByClassName("tablinks");

    // Start at how many elements exist in the tabmenu so that we avoid
    // adding duplicate tabs.
    for (var i = tablinks.length; i < tabs.length; i++) {
        var newButton = document.createElement("BUTTON");
        var currentTab = tabs[i];
        var clickAction = "openTab(event," + currentTab + ")";
        newButton.setAttribute("class", "tablinks");
        newButton.setAttribute("id", currentTab+"_btn");
        newButton.setAttribute("onclick", clickAction);

        var newText = document.createTextNode(currentTab);
        newButton.appendChild(newText);
        tabnav.appendChild(newButton);
    }
}
