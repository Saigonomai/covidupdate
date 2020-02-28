# Covid-19 Updater

## Link to Deployed Website
https://covid-update.herokuapp.com/

## What is this?
This is a webapp that contains some of the most recent Canadian relevant information in regards to the Covid-19 outbreak. It contains stats on a global scale and a Canadian scale, and interactive map that documents the current cases in Canada, and the most recent news about the epidemic all in one. 

## How to get started
The app has a navigation menu at the top with 3 options: Global Statistics, Canadian Interactive Map, and Latest News. The menu also has pinned Canadian stats about the outbreak. These stats can be refreshed with the button if necessary, but are automatically updated at 9pmEST every day using the John Hopkins University data on their [github](https://github.com/CSSEGISandData/COVID-19).

#### Global Statistics
This page is the main page and contains stats regarding the outbreak on a global level. Like with the Canadian ones that are pinned, these statistics are also automatically updated everyday and breakdown the number of cases, deaths, and recoveries.

#### Canadian Interactive Map
This page displays a map centered around Canada with markers that signify a location with cases of the outbreak. By clicking on the marker a small popup appears with information about the location and the number of cases. The map was made using the [MapBox API](https://www.mapbox.com/) and the react-map-gl library.

#### Latest News
This page loads 10 of the most recent news pieces that are related the Coronavirus outbreak. Each entry has its title, source, author, and a brief description. Clicking on an entry will bring you to the news article on the source's website. These articles are searched using the [News API](https://newsapi.org/) and then loaded in dynamically.
