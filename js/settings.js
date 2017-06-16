var settingsDiv = document.getElementById("settings");

function openSettings() {

}

function resetData() {
    if(confirm("This will reset ALL of your data.\nAre you sure you want to continue?")) {
        localStorage.clear();
        location.reload();
    }
}
