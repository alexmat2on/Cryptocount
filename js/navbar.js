var tabs = ['overview'];
if (localStorage.getItem("tabs") !== null) {
    tabs = localStorage.getItem("tabs").split(",");
}
// An array of the tabs at the bottom of the screen. These represent only the
// coins which you are holding.

// --------- SELECTOR FOR NEW CRYPTOCURRENCIES TO ADD TO PORTFOLIO -------------
var addDropdownSelector = document.getElementById("add-dropdown-content");
var addDropdownSearch = document.getElementById("coin-search");

updateData();
refreshDropdown();

function refreshDropdown() {
    if (addDropdownSelector.children.length == 1) {
        for (var i=0; i < coins.length; i++) {
            var button = document.createElement("button");
            var buttonAction = "addToPortfolio('" + coins[i] + "');";

            button.setAttribute("onclick", buttonAction);
            button.setAttribute("class", "dropdown-option");

            button.innerHTML = coins[i];
            addDropdownSelector.appendChild(button);
        };
    }
}
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

    // check to see if tab is already open
    var tabExists = false;
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i] == coinName) {
            tabExists = true;
        }
    }

    updateData();
    if (coinData && !tabExists) {
        // Ensure that coinData has data in it before adding an entry.
        tabs.push(coinName);    // Create a new tab for it at the bottom
        localStorage.setItem("tabs",tabs);

        // Update the views
        updateAssetDivs();
        refreshNavTabs();

        localStorage.setItem(coinName+"_amount", "0");
        localStorage.setItem(coinName+"_worth", "0");

        // Select the newly added asset
        document.getElementById(coinName+"_btn").click();
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
        var clickAction = "openTab(event,'" + currentTab + "')";
        newButton.setAttribute("class", "tablinks");
        newButton.setAttribute("id", currentTab+"_btn");
        newButton.setAttribute("onclick", clickAction);

        var newText = document.createTextNode(currentTab);
        var newIcon = document.createElement("IMG");
        newIcon.id = currentTab+"_ico";

        var imgPath = "img/" + currentTab + ".svg";

        loadImage(newIcon, imgPath);
        newIcon.setAttribute("height", "38px");
        newButton.appendChild(newIcon);
        newButton.appendChild(newText);

        tabnav.appendChild(newButton);
    }
}

function deleteTab(tabName) {
    if (confirm("Delete this asset from your portfolio?\nAll data for this asset will be lost.")) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i] == tabName) {
                tabs.splice(i,1);
                localStorage.setItem("tabs", tabs);

                var button = document.getElementById(tabName+"_btn");
                button.parentNode.removeChild(button);

                var overview = document.getElementById(getTicker(tabName)+"_overview");
                overview.parentNode.removeChild(overview);
            }
        }
        refreshEverything();
        document.getElementById("overview_btn").click();
    }
}

function loadImage(img, path) {
    var downloadingImage = new Image();

    downloadingImage.onload = function(){
        img.src = this.src;

        // Remove the text label
        var imgChildren = img.parentNode.childNodes;
        img.parentNode.removeChild(imgChildren[1]);
    };

    downloadingImage.src = path;
}

function refreshEverything() {
    updateData();
    refreshNavTabs();
    refreshDropdown();
    getTotalWorth();
    updateAssetDivs();
    updateOverview();
}
