var assetDivs = [];

updateAssetDivs();

function updateAssetDivs() {
    for (var i=0; i < tabs.length; i++) {
        if (!document.getElementById(tabs[i])) {
            var newAsset = document.createElement("DIV");
            newAsset.setAttribute("id", tabs[i]);
            newAsset.setAttribute("class", "tabcontent");

            // Add a header with the name of asset on top
            var header = document.createElement("H2");
            header.appendChild(document.createTextNode(newAsset.id));
            newAsset.appendChild(header);

            // Add a smaller header with the current value of the asset
            var price = document.createElement("H4");
            price.setAttribute("id", newAsset.id+"_price");
            price.appendChild(document.createTextNode(getUSD(newAsset.id)));
            newAsset.appendChild(price);

            // Hide the new div, add it the array, and add it to the document
            newAsset.style.display = "none";
            console.log(assetDivs.push(newAsset));
            document.body.appendChild(newAsset);
        }
    }
}

function openTab(evt, tabDiv) {
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
    tabDiv.style.display = "block";
    evt.currentTarget.className += " active";
}
