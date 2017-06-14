var assetDivs = [];

updateAssetDivs();

function updateAssetDivs() {
    for (i=0; i < tabs.length; i++) {
        var newAsset = document.createElement("DIV");
        newAsset.setAttribute("id", tabs[i]);
        newAsset.setAttribute("class", "tabcontent");

        // Add a header with the name of asset on top
        var header = document.createElement("H2");
        header.appendChild(document.createTextNode(newAsset.id));
        newAsset.appendChild(header);

        newAsset.style.display = "none";
        assetDivs.push(document.createElement);
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
