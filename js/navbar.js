var tabs = ['overview'];
if (localStorage.getItem("tabs") !== null) {
    tabs = localStorage.getItem("tabs").split(",");
}
// An array of the tabs at the bottom of the screen. These represent only the
// coins which you are holding.

// --------- SELECTOR FOR NEW CRYPTOCURRENCIES TO ADD TO PORTFOLIO -------------
var addDropdownSelector = document.getElementById("add-dropdown-content");
var addDropdownSearch = document.getElementById("coin-search");
var addNewCoins = coins;
if (localStorage.getItem("addCoins") !== null) {
    addNewCoins = localStorage.getItem("addCoins").split(",");
}

for (var i=0; i < addNewCoins.length; i++) {
    var button = document.createElement("button");
    var buttonAction = "addToPortfolio('" + addNewCoins[i] + "');";

    button.setAttribute("onclick", buttonAction);
    button.setAttribute("class", "dropdown-option");

    button.innerHTML = addNewCoins[i];
    addDropdownSelector.appendChild(button);
};
// =============================================================================

refreshEverything();
document.getElementById("overview_btn").click();    // Select overview when page loads

function filterDropdown() {
    var coinSearch = document.getElementById("coin-search");
    var searchString = coinSearch.value;

    var items = document.getElementsByClassName("dropdown-option");
    var itemsArr = Array.prototype.slice.call(items);

    for (var i = 0; i < itemsArr.length; i++) {
        itemsArr[i].style.display = "none";
    }

    for (var i = 0; i < itemsArr.length; i++) {
        var currentItem = itemsArr[i].innerHTML;

        if (currentItem.indexOf(searchString) == 0) {
            itemsArr[i].style.display = "block";
        }
    }
}

function addToPortfolio(coinName) {
    // Add coinName to the portfolio.

    // re-add everything to the dropdown that the search cleared out.
    for (var i = 0; i < addDropdownSelector.length; i++) {
        addDropdownSelector[i].style.display = "block";
    }

    updateData();
    if (coinData) {
        // Ensure that coinData has data in it before adding an entry.
        tabs.push(coinName);    // Create a new tab for it at the bottom
        localStorage.setItem("tabs",tabs);

        // Remove the entry from the dropdown menu.
        for (var i = 0; i < addNewCoins.length; i++) {
            if (addNewCoins[i] == coinName) {
                addNewCoins.splice(i,1);
                
                // remove the i+1 child because the search bar is #1
                addDropdownSelector.removeChild(addDropdownSelector.children[i+1]);
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

function refreshEverything() {
    updateData();
    refreshNavTabs();
    getTotalWorth();
    updateAssetDivs();
    updateOverview();
}
