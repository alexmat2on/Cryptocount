// COIN DATA OPERATIONS --------------------------------------------------------
// -----------------------------------------------------------------------------
function fetchCoinData() {
    // Return a promise containing the request to the CoinMarketCap API endpoint
    return get("https://api.coinmarketcap.com/v1/ticker?limit=0");
}

function updateData() {
    return new Promise(function(resolve, reject) {
        fetchCoinData().then(function(result) {
            localStorage.coinData = result;
            resolve(result);
        }, function(err) {
            reject(err);
            console.error("Update failure: ", err);
        })
    })
}

function populateIDs() {
    return new Promise(function (resolve, reject) {
        var coins = [];
        updateData().then(function (result) {
            coinData = JSON.parse(result);
            for (var i = 0; i < coinData.length; i++) {
                coins.push(coinData[i].id);
            }
            resolve(coins)
        }, function (err) {
            reject(err);
            conosle.error("Populate IDs failure: ", err);
        })
    })
}
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// Dropdown Menu ---------------------------------------------------------------
// -----------------------------------------------------------------------------
function fillDropdown() {
    for (var i=0; i < coinIDs.length; i++) {
        var button = document.createElement("button");
        var buttonAction = "addToPortfolio('" + coinIDs[i] + "');";

        button.setAttribute("onclick", buttonAction);
        button.setAttribute("class", "dropdown-option");

        button.innerHTML = coinIDs[i];
        addDropdownSelector.appendChild(button);
    }
}

function filterDropdown() {
    var searchString = coinSearch.value;
    var itemsArr = Array.prototype.slice.call(dropdownItems);

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
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// Tab Navigation Ops ----------------------------------------------------------
// -----------------------------------------------------------------------------
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

    if (!tabExists) {
        tabs.push(coinName);    // Create a new tab for it at the top
        localStorage.tabs = tabs;

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
    // Update the navigation tabs at the top of the screen

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

        // TO-DO: ICON code --- needs some work
        // ------------------------------
        // var imgPath = "img/" + currentTab + ".svg";
        //
        // loadImage(newIcon, imgPath);
        // console.log(newIcon);
        // console.log(newIcon.src);
        //
        // if (newIcon.src != null) {
        //     newIcon.setAttribute("height", "38px");
        //     newButton.appendChild(newIcon);
        // }

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

                var overview = document.getElementById(getCoinField("symbol", tabName)+"_overview");
                overview.parentNode.removeChild(overview);
            }
        }
        document.getElementById("overview_btn").click();
    }
}

// Asset Pages -----------------------------------------------------------------
// -----------------------------------------------------------------------------
function updateAssetDivs() {
    getTotalWorth();
    updateOverview();
    if (localStorage.totalWorth != null) {
        document.getElementById("totalWorth").innerHTML = "$" + localStorage.totalWorth;
    } else {
        document.getElementById("totalWorth").innerHTML = "$0";
    }

    for (var i=0; i < tabs.length; i++) {
        if (!document.getElementById(tabs[i])) {
            var newAsset = document.createElement("DIV");
            newAsset.setAttribute("id", tabs[i]);
            newAsset.setAttribute("class", "tabcontent");

            // Add a header with the name of asset on top
            var header = document.createElement("H2");
            header.appendChild(document.createTextNode(getCoinField("name", newAsset.id)));

            // Add a button to exit/remove the asset from the portfolio
            var deleteButton = document.createElement("BUTTON");
            deleteButton.appendChild(document.createTextNode("X"));
            deleteButton.setAttribute("class", "del-button");
            deleteButton.setAttribute("onclick", "deleteTab('" + newAsset.id + "');");

            // Add a smaller header with the current value of the asset
            var price = document.createElement("H4");
            price.setAttribute("id", newAsset.id+"_price");
            price.innerHTML = "Price: $" + getCoinField("price_usd", newAsset.id);

            var amount = document.createElement("P");
            amount.setAttribute("id", newAsset.id+"_amount");
            amount.innerHTML = localStorage.getItem(newAsset.id+"_amount");

            var worth = document.createElement("P");
            worth.setAttribute("id", newAsset.id+"_worth");
            worth.innerHTML = localStorage.getItem(newAsset.id+"_worth");

            // Add a table to list the purchase/sell history
            var txnTable = document.createElement("TABLE");
            txnTable.setAttribute("class", "txn_table");
            txnTable.setAttribute("id", newAsset.id+"_txn_table");
            var txnTableHeader = txnTable.createTHead();

            var row = txnTableHeader.insertRow(0);
            var rowForInsert = txnTable.insertRow();

            for (var j = 0; j < txnTableCols.length; j++) {
                var headerCell = row.insertCell(j);
                headerCell.innerHTML = txnTableCols[j];

                var newCell = rowForInsert.insertCell(j);
                newCell.innerHTML = txnTableInserts[j];
            }

            var submitCell = rowForInsert.insertCell();
            var submitOnClick = "addTxnToTable('" + newAsset.id + "')";
            submitCell.innerHTML = "<button onclick=" + submitOnClick + ">Submit</button>";

            // // Add a form to add an amount of assets you've obtained
            // var amountAddInput = document.createElement("INPUT");
            // amountAddInput.setAttribute("id", newAsset.id+"_amountAddInput");
            // amountAddInput.setAttribute("type","text");
            //
            // var addAcceptBtn = document.createElement("BUTTON");
            // var addAcceptBtnAction = "addAmount(" + newAsset.id + ");";
            // addAcceptBtn.appendChild(document.createTextNode("Add amount."));
            // addAcceptBtn.setAttribute("onclick",addAcceptBtnAction);
            //
            // // Add a form to remove an amount of assets you've obtained
            // var amountRemoveInput = document.createElement("INPUT");
            // amountRemoveInput.setAttribute("id", newAsset.id+"_amountRemoveInput");
            // amountRemoveInput.setAttribute("type", "text");
            //
            // var removeAcceptBtn = document.createElement("BUTTON");
            // var removeAcceptBtnAction = "removeAmount(" + newAsset.id + ");";
            // removeAcceptBtn.appendChild(document.createTextNode("Remove amount."));
            // removeAcceptBtn.setAttribute("onclick",removeAcceptBtnAction);

            // Add all the elements to newAsset.
            newAsset.appendChild(deleteButton);
            newAsset.appendChild(header);
            newAsset.appendChild(price);
            newAsset.appendChild(amount);
            newAsset.appendChild(worth);

            newAsset.appendChild(txnTable);
            newAsset.appendChild(document.createElement("BR"));

            // newAsset.appendChild(amountAddInput);
            // newAsset.appendChild(addAcceptBtn);
            //
            // newAsset.appendChild(document.createElement("BR"));
            // newAsset.appendChild(amountRemoveInput);
            // newAsset.appendChild(removeAcceptBtn);

            // Hide the new div, add it the array, and add it to the document
            newAsset.style.display = "none";
            assetDivs.push(newAsset);

            var containerDiv = document.getElementById("container");
            containerDiv.appendChild(newAsset);
        }
    }
}

function addTxnToTable(assetName) {
    var table = document.getElementById(assetName + "_txn_table");
    var tableRows = table.rows;
    var numRows = tableRows.length;

    var newRow = table.insertRow(numRows - 1);

    var newVals = [];
    var clearToInsert = true;

    for (var i = 0; i < tableRows[0].cells.length; i++) {
        var userVals = tableRows[numRows].cells[i].firstChild.value;

        if (txnTableColIsNumeric[i]) {
            if (!Number(userVals)) {
                alert("Amounts must be numbers!");
                clearToInsert = false;
                break;
            } else if (Number(userVals) < 0) {
                alert("Amounts must be positive!");
                clearToInsert = false;
                break;
            }
            userVals = Number(userVals);
        }
        newVals.push(userVals);
        console.log("test");
    }

    if (clearToInsert) {
        if (newVals[1] == "buy") {
            addAmount(assetName, newVals[2]);
        } else {
            removeAmount(assetName, newVals[2]);
        }

        for (var i = 0; i < tableRows[0].cells.length; i++) {
            var cell = newRow.insertCell();
            cell.innerHTML = newVals[i];
        }
    }
}

function addAmount(asset, amount) {
    // Add a new amount of an asset to the portfolio.

    amount = +amount + +localStorage.getItem(asset+"_amount");

    localStorage.setItem(asset+"_amount", amount);
    localStorage.setItem(asset+"_worth", amount*getCoinField("price_usd", asset));

    var amountP = document.getElementById(asset+"_amount");
    var worthP = document.getElementById(asset+"_worth");

    amountP.innerHTML = "Amount: " + localStorage.getItem(asset+"_amount");
    worthP.innerHTML = "Worth: $" + localStorage.getItem(asset+"_worth");
}

function removeAmount(asset, amount) {
    // Remove some amount of an asset from the portfolio.

    var currentAmount = localStorage.getItem(asset+"_amount");
    var newAmount = currentAmount - amount;

    localStorage.setItem(asset+"_amount", newAmount);
    localStorage.setItem(asset+"_worth", newAmount*getCoinField("price_usd", asset));

    var amountP = document.getElementById(asset+"_amount");
    var worthP = document.getElementById(asset+"_worth");

    amountP.innerHTML = "Amount: " + localStorage.getItem(asset+"_amount");
    worthP.innerHTML = "Worth: $" + localStorage.getItem(asset+"_worth");
}

function getTotalWorth() {
    var total = 0;
    for (var i=1; i < tabs.length; i++) {
        total = +total + +localStorage.getItem(tabs[i]+"_worth");
    }
    localStorage.setItem("totalWorth", total);
    return total;
}

function updateOverview() {
    for (var i=1; i < tabs.length; i++) {
        var newP = document.getElementById(getCoinField("symbol", tabs[i])+"_overview");
        if (newP == null) {
            newP = document.createElement("P");
            newP.setAttribute("id", getCoinField("symbol", tabs[i])+"_overview");
            newP.setAttribute("style", "font-size: 28px");
            document.getElementById("overview").appendChild(newP);
        }
        newP.innerHTML = getCoinField("symbol", tabs[i]) + ": $" + localStorage.getItem(tabs[i]+"_worth");
    }
}

// HELPER FUNCTIONS ------------------------------------------------------------
// -----------------------------------------------------------------------------
function getCoinField(field, coinName) {
    for (var i=0; i < coinData.length; i++) {
        if (coinData[i].id == coinName || coinData[i].name == coinName) {
            return coinData[i][field];
            break;
        }
    }
}

function openTab(evt, tabName) {
    // Select the specified Tab given by the argument.

    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function loadImage(img, path) {
    // TO-DO: Fix this so icon wont attach if filename does not exist.
    var downloadingImage = new Image();

    downloadingImage.onload = function(){
        img.src = this.src;

        // Remove the text label
        var imgChildren = img.parentNode.childNodes;
        img.parentNode.removeChild(imgChildren[1]);
    };

    downloadingImage.onerror = function() {
        Error("Load image failure");
    }

    downloadingImage.src = path;
}

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}
