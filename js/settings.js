var settingsDiv = document.getElementById("settings");

// Declare this to avoid needing to click on the settings icon
// twice the first time the page is loaded
settingsDiv.style.display = "none";

function toggleSettings() {
    if (settingsDiv.style.display == "none") {
        settingsDiv.style.display = "block";
    }
    else {
        settingsDiv.style.display = "none";
    }
}

function exportData(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function resetData() {
    if(confirm("This will reset ALL of your data.\nAre you sure you want to continue?")) {
        localStorage.clear();
        location.reload();
    }
}
