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

function updateAssetDivs() {
    if (localStorage.totalWorth !== null) {
        document.getElementById("totalWorth").innerHTML = "$" + localStorage.totalWorth;
    }
    for (var i=0; i < tabs.length; i++) {
        if (!document.getElementById(tabs[i])) {
            var newAsset = document.createElement("DIV");
            newAsset.setAttribute("id", tabs[i]);
            newAsset.setAttribute("class", "tabcontent");

            // Add a header with the name of asset on top
            var header = document.createElement("H2");
            header.appendChild(document.createTextNode(getFullName(newAsset.id)));

            // Add a button to exit/remove the asset from the portfolio
            var deleteButton = document.createElement("BUTTON");
            deleteButton.appendChild(document.createTextNode("X"));
            deleteButton.setAttribute("class", "del-button");
            deleteButton.setAttribute("onclick", "deleteTab('" + newAsset.id + "');");

            // Add a smaller header with the current value of the asset
            var price = document.createElement("H4");
            price.setAttribute("id", newAsset.id+"_price");
            price.innerHTML = "Price: $" + getUSD(newAsset.id);

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

            for (var i = 0; i < txnTableCols.length; i++) {
                var headerCell = row.insertCell(i);
                headerCell.innerHTML = txnTableCols[i];

                var newCell = rowForInsert.insertCell(i);
                newCell.innerHTML = txnTableInserts[i];
            }

            var submitCell = rowForInsert.insertCell();
            var submitOnClick = "addTxnToTable('" + newAsset.id + "')";
            submitCell.innerHTML = "<button onclick=" + submitOnClick + ">Submit</button>";

            // Add a form to add an amount of assets you've obtained
            var amountAddInput = document.createElement("INPUT");
            amountAddInput.setAttribute("id", newAsset.id+"_amountAddInput");
            amountAddInput.setAttribute("type","text");

            var addAcceptBtn = document.createElement("BUTTON");
            var addAcceptBtnAction = "addAmount(" + newAsset.id + ");";
            addAcceptBtn.appendChild(document.createTextNode("Add amount."));
            addAcceptBtn.setAttribute("onclick",addAcceptBtnAction);

            // Add a form to remove an amount of assets you've obtained
            var amountRemoveInput = document.createElement("INPUT");
            amountRemoveInput.setAttribute("id", newAsset.id+"_amountRemoveInput");
            amountRemoveInput.setAttribute("type", "text");

            var removeAcceptBtn = document.createElement("BUTTON");
            var removeAcceptBtnAction = "removeAmount(" + newAsset.id + ");";
            removeAcceptBtn.appendChild(document.createTextNode("Remove amount."));
            removeAcceptBtn.setAttribute("onclick",removeAcceptBtnAction);

            // Add all the elements to newAsset.
            newAsset.appendChild(deleteButton);
            newAsset.appendChild(header);
            newAsset.appendChild(price);
            newAsset.appendChild(amount);
            newAsset.appendChild(worth);

            newAsset.appendChild(txnTable);
            newAsset.appendChild(document.createElement("BR"));

            newAsset.appendChild(amountAddInput);
            newAsset.appendChild(addAcceptBtn);

            newAsset.appendChild(document.createElement("BR"));
            newAsset.appendChild(amountRemoveInput);
            newAsset.appendChild(removeAcceptBtn);

            // Hide the new div, add it the array, and add it to the document
            newAsset.style.display = "none";
            assetDivs.push(newAsset);

            var containerDiv = document.getElementById("container");
            containerDiv.appendChild(newAsset);
        }
    }
}

function openTab(evt, tabName) {
    // Select the specified Tab given by the argument.

    refreshEverything();
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

function tableToArray(asset) {
    var tableArray = [];
    
}

function addAmount(asset, amount) {
    // Add a new amount of an asset to the portfolio.

    amount = +amount + +localStorage.getItem(asset+"_amount");

    localStorage.setItem(asset+"_amount", amount);
    localStorage.setItem(asset+"_worth", amount*getUSD(asset));

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
    localStorage.setItem(asset+"_worth", newAmount*getUSD(asset));

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
        var newP = document.getElementById(getTicker(tabs[i])+"_overview");
        if (newP == null) {
            newP = document.createElement("P");
            newP.setAttribute("id", getTicker(tabs[i])+"_overview");
            newP.setAttribute("style", "font-size: 28px");
            document.getElementById("overview").appendChild(newP);
        }
        newP.innerHTML = getTicker(tabs[i]) + ": $" + localStorage.getItem(tabs[i]+"_worth");
    }
}
