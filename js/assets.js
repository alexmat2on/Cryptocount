var assetDivs = [];

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
            header.appendChild(document.createTextNode(newAsset.id));

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
            newAsset.appendChild(header);
            newAsset.appendChild(price);
            newAsset.appendChild(amount);
            newAsset.appendChild(worth);
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

// function openTab(evt, tabDiv) {
//     // Select the specified Tab given by the argument.
//     console.log(tabDiv);
//
//     refreshEverything();
//     var i, tabcontent, tablinks;
//
//     // Get all elements with class="tabcontent" and hide them
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     }
//
//     // Get all elements with class="tablinks" and remove the class "active"
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//
//     // Show the current tab, and add an "active" class to the button that opened the tab
//     tabDiv.style.display = "block";
//     evt.currentTarget.className += " active";
// }

function openTab(evt, tabName) {
    // Select the specified Tab given by the argument.
    console.log(tabName);

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

function addAmount(assetDiv) {
    // Add a new amount of an asset to the portfolio.
    var asset = assetDiv.id;
    var addAmount = document.getElementById(asset+"_amountAddInput");

    var textAmount = addAmount.value;
    textAmount = +textAmount + +localStorage.getItem(asset+"_amount");

    localStorage.setItem(asset+"_amount", textAmount);
    localStorage.setItem(asset+"_worth", textAmount*getUSD(asset));

    var amountP = document.getElementById(asset+"_amount");
    var worthP = document.getElementById(asset+"_worth");

    amountP.innerHTML = "Amount: " + localStorage.getItem(asset+"_amount");
    worthP.innerHTML = "Worth: $" + localStorage.getItem(asset+"_worth");

    addAmount.value = "";
}

function removeAmount(assetDiv) {
    // Remove some amount of an asset from the portfolio.
    var asset = assetDiv.id;
    var removeAmount = document.getElementById(asset+"_amountRemoveInput");

    var textAddAmount = localStorage.getItem(asset+"_amount");
    var textRemoveAmount = removeAmount.value;
    var textAmount = textAddAmount - textRemoveAmount;

    localStorage.setItem(asset+"_amount", textAmount);
    localStorage.setItem(asset+"_worth", textAmount*getUSD(asset));

    var amountP = document.getElementById(asset+"_amount");
    var worthP = document.getElementById(asset+"_worth");

    amountP.innerHTML = "Amount: " + localStorage.getItem(asset+"_amount");
    worthP.innerHTML = "Worth: $" + localStorage.getItem(asset+"_worth");

    removeAmount.value = "";
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
