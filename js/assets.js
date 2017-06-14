var assetDivs = [];

function updateAssetDivs() {
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

            var worth = document.createElement("P");
            worth.setAttribute("id", newAsset.id+"_worth");

            // Add a form to input the current amount of assets you hold
            var amountInput = document.createElement("INPUT");
            amountInput.setAttribute("id", newAsset.id+"_amountInput");
            amountInput.setAttribute("type","text");

            var acceptBtn = document.createElement("BUTTON");
            var acceptBtnAction = "addAmount(" + newAsset.id + ");";
            acceptBtn.appendChild(document.createTextNode("Add amount."));
            acceptBtn.setAttribute("onclick",acceptBtnAction);

            // Add all the elements to newAsset.
            newAsset.appendChild(header);
            newAsset.appendChild(price);
            newAsset.appendChild(amount);
            newAsset.appendChild(worth);
            newAsset.appendChild(amountInput);
            newAsset.appendChild(acceptBtn);

            // Hide the new div, add it the array, and add it to the document
            newAsset.style.display = "none";
            assetDivs.push(newAsset);

            var containerDiv = document.getElementById("container");
            containerDiv.insertBefore(newAsset, tabnav);
        }
    }
}

function openTab(evt, tabDiv) {
    // Select the specified Tab given by the argument.
    updateData(); // refresh current values every time a tab is clicked.
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
    tabDiv.style.display = "block";
    evt.currentTarget.className += " active";
}

function addAmount(assetDiv) {
    var asset = assetDiv.id;
    var textAmount = document.getElementById(asset+"_amountInput").value;

    var amountP = document.getElementById(asset+"_amount");
    var worthP = document.getElementById(asset+"_worth");

    amountP.innerHTML = "Amount: " + textAmount;
    worthP.innerHTML = "Worth: $" + getUSD(asset)*textAmount;
}
