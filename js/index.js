var baseurl = "https://api.coinmarketcap.com/v1/ticker/";

var coins = ['bitcoin', 'ethereum', 'ripple', 'nem', 'maidsafecoin', 'gridcoin'];
// An array of currently supported coins to choose from.
// To support a new coin, simply add it to this array and place an image of its logo
// in the img/ directory, as a png with the same name.

var tabs = ['overview'];
// An array of the tabs at the bottom of the screen. These represent only the
// coins which you are holding.

// --- SELECTOR FOR NEW CRYPTOCURRENCIES TO ADD TO PORTFOLIO ---
var addNewCoins = coins;
var addNewSelector = document.createElement("SELECT");
addNewSelector.setAttribute('id', 'addNewSelector');

for (i=0; i < addNewCoins.length; i++) {
    var option = document.createElement("option");
    option.text = addNewCoins[i];
    addNewSelector.add(option);
};
// -------------------------------------------------------------

// ------- CHECKBOX BUTTON TO CONFIRM NEW CRYPTOCURRENCY -------
var confirmCoinBtn = document.createElement("BUTTON");
confirmCoinBtn.setAttribute('id', 'confirmCoinBtn');
confirmCoinBtn.setAttribute('onclick', 'insertNewCrypto()');

var confirmCoinTxt = document.createTextNode("✓");
confirmCoinBtn.appendChild(confirmCoinTxt);
// -------------------------------------------------------------


function addNewCrypto() {
    // Creates a new dropdown menu to select a new currency to track, as well
    // as a checkbox button to confirm your selection.
    tabnav.appendChild(addNewSelector);
    tabnav.appendChild(confirmCoinBtn);
}

function insertNewCrypto() {
    // Called by the confirm checkbox button.
    // Removes dropdown and checkbox button, then adds the crypto to tab-nav
    tabs.push(addNewSelector.value);


    updateAssetDivs();
    newCryptoCleanUp();
    refreshNavTabs();
}

function newCryptoCleanUp() {
    // Clean up the dropdown and checkbox elements
    addNewSelector.parentNode.removeChild(addNewSelector);
    addNewSelector.selectedIndex = 0;
    addNewSelector.remove(addNewSelector.selectedIndex);

    confirmCoinBtn.parentNode.removeChild(confirmCoinBtn);
}

function refreshNavTabs() {
    // Update the navigation tabs at the bottom of the screen
    var tabnav = document.getElementById("tabnav");
    deleteNavTabs();

    for (i = 0; i < tabs.length; i++) {
        var newButton = document.createElement("BUTTON");
        var currentTab = tabs[i];
        newButton.setAttribute("class", "tablinks");

        var newText = document.createTextNode(currentTab);
        newButton.appendChild(newText);
        tabnav.appendChild(newButton);
    }
    var newPlusButton = document.createElement("BUTTON");
    newPlusButton.setAttribute("id", "plusButton");
    newPlusButton.setAttribute("onclick", "addNewCrypto()");
    newPlusButton.appendChild(document.createTextNode("+"));

    tabnav.appendChild(newPlusButton);
}

function deleteNavTabs() {
    while (tabnav.hasChildNodes()) {
        tabnav.removeChild(tabnav.lastChild);
    }
}
