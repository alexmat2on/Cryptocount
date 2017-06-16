var settingsDiv = document.getElementById("settings");

function toggleSettings() {
    if (settingsDiv.style.display != "none") {
        settingsDiv.style.display = "none";
    }
    else {
        settingsDiv.style.display = "block";
    }
}

function resetData() {
    if(confirm("This will reset ALL of your data.\nAre you sure you want to continue?")) {
        localStorage.clear();
        location.reload();
    }
}
