var addDropdownSelector = document.getElementById("add-dropdown-content");

for (var i=0; i < addNewCoins.length; i++) {
    var button = document.createElement("button");
    var buttonAction = "addToPortfolio('" + addNewCoins[i] + "');";
    button.setAttribute("onclick", buttonAction);
    button.innerHTML = addNewCoins[i];
    addDropdownSelector.appendChild(button);
};

refreshNavTabs();
document.getElementById("overview_btn").click();

function addToPortfolio(coinName) {
    updateData();
    if (coinData) {
        // Ensure that coinData has data in it before adding an entry.
        tabs.push(coinName);
        localStorage.setItem("tabs",tabs);

        for (var i = 0; i < addNewCoins.length; i++) {
            if (addNewCoins[i] == coinName) {
                addNewCoins.splice(i,1);
                addDropdownSelector.removeChild(addDropdownSelector.children[i]);
            }
        }
        localStorage.setItem("addCoins", addNewCoins);

        updateAssetDivs();
        refreshNavTabs();

        document.getElementById(coinName+"_btn").click();
    } else {
        alert("Could not connect to CoinMarketCap.com.\nPlease try again.");
    }
}

function refreshNavTabs() {
    // Update the navigation tabs at the bottom of the screen
    var tabnav = document.getElementById("tabnav");
    var tablinks = document.getElementsByClassName("tablinks");

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
