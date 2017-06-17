# Cryptocount

A completely free (as in beer *and* [speech](https://www.gnu.org/philosophy/free-sw.en.html))
web app that helps you keep track of your cryptocurrency assets. It uses
[CoinMarketCap](https://coinmarketcap.com/) to fetch live price data, as well
as Google's open-source [Material Design icon set](https://material.io/icons/)
for the UI.

Using it is as simple as going [here](https://alexmat2on.github.io/Cryptocount/),
or downloading the project and opening `index.html` in your browser of choice.

Please note that this is still a work in progress, so bugs and rough edges are to
be expected!

## Current Features
* Free to use, free to modify
* No registration required
* Entirely static; can run anywhere
* Supports every cryptocurrency on CoinMarketCap
* Simple and smooth UI/UX
* Clear overview page showing a summary of your assets
* Tab navigation to view details about individual assets
* Tabs will show the asset's logo if I've added the image in the project files, and
    normal text otherwise
* Refresh button to explicitly refresh everything (note, price data should also
    get updated automatically when you click through tabs)

## Planned Ideas & Features
* The Settings page will allow you to import/export app data, clear app data,
and perhaps change themes (if I write alternative themes).
* Make the tab pages more detailed; I plan on making it possible for users to
    input individual Buy/Sell transactions and list them all in a table on each asset's page.
* Add data visualizations with ChartJS on the Overview page.
* Allow the creation of multiple portfolios.
* Allow the creation of custom assets (stocks, precious metals, etc). The user will need to
    enter in updated market values of the custom asset manually.
* Package as an Electron app for simple desktop usage.
* Store user data on the SAFE Network.

## Known Issues & Quick Fixes
* If the dropdown menu is empty, keep hitting the refresh button until it populates.
    This should only ever happen on the first run or if you've erased all data in
    Settings.
