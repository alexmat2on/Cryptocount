var assetDivs = [];

updateAssetDivs();

function updateAssetDivs() {
    for (i=0; i < tabs.length; i++) {
        if (!document.getElementById(tabs[i])) {
            var newAsset = document.createElement("DIV");
            newAsset.setAttribute("id", tabs[i]);
            newAsset.setAttribute("class", "tabcontent");

            // Add a header with the name of asset on top
            var header = document.createElement("H2");
            header.appendChild(document.createTextNode(newAsset.id));
            newAsset.appendChild(header);

            var price = document.createElement("H4");
            price.setAttribute("id", newAsset.id+"_price");
            price.appendChild(document.createTextNode(getUSD(newAsset.id)));
            newAsset.appendChild(price);

            newAsset.style.display = "block";
            assetDivs.push(document.createElement);

            document.body.appendChild(newAsset);
        }
    }
}

function openCrypto(evt, crypt) {
    // Declare all variables
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
    console.log(crypt);
    document.getElementById(crypt).style.display = "block";
    evt.currentTarget.className += " active";
}
