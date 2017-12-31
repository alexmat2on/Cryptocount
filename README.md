# Cryptocount

A completely free desktop app that helps you keep track of your cryptocurrency assets. It uses
[CoinMarketCap](https://coinmarketcap.com/) to fetch live price data, as well
as Google's open-source [Material Design icon set](https://material.io/icons/)
for the UI.

There are no builds for it yet, but to test it, simply clone the repository,
`cd` into the `electron_app` directory, and then run:

```
npm install
npm start
```

Please note that this is still a work in progress, so bugs and rough edges are to
be expected!

## Current Features
* Free to use, free to modify
* No registration required
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
* Enable the ability to add different "collections" per cryptocurrency, where
    you can have different collections for different locations you're holding
    the crypto (i.e., you may have some on an exchange and some in a wallet)
* Make the tab pages more detailed; I plan on making it possible for users to
    input individual Buy/Sell transactions and list them all in a table on each asset's page.
* Add data visualizations with ChartJS on the Overview page.
* Allow the creation of multiple portfolios.

## Known Issues & Quick Fixes
* If the dropdown menu is empty, keep hitting the refresh button until it populates.
    This should only ever happen on the first run or if you've erased all data in
    Settings.
