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

function resetData() {
    if(confirm("This will reset ALL of your data.\nAre you sure you want to continue?")) {
        localStorage.clear();
        location.reload();
    }
}
