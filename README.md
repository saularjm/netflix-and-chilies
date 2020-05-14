# Netflix and Chilies

- A web application to search meal delivery options and streaming movies to accompany them.

- Contributors: Haley Alton, Vanessa Bautista, Sandra Arredondo, and Saular Moaddeli 

## Overview

- This application includes a landing page, with a title and introduction for the application and a button to enter the main webpage.

- This application displays movie streaming information, including:
    - Movie title
    - Movie poster
    - Plot summary
    - Runtime
    - Streaming services the movie is available on
        - Including links to the movie on those streaming sites

- This application also displays restaurant information for the user's area, including:
    - Image of genre of food
    - Name of the restaurant
    - Restaurant address
    - Link to the restaurant's menu
    - Restaurant phone number

## Usage

- Upon loading the landing page, the user will be presented with a button to click to enter the main webpage.

- When the main page is loaded, the user is presented with 2 columns, one for movies and one for food:
    - Movies:
        - This column begins with a text input box to type in a movie title 
        - The search can be executed by clicking a search button or pressing the Enter key
        - Once submitted, the movie column will populate with the appropriate information for the movie title that was searched
        - If the movie title that was searched is not valid, a notice will be displayed for the user

    - Food:
        - This column begins with 2 text input boxes
            - The first is for inputting the user's city and state location
            - The second is for inputting the user's zipcode
        - There is also a dropdown menu containing different genres of food for the user to choose between
        - Upon filling in the location information and choosing a type of food, the food column will be populated with the pertinent information for food delivery in the user's area
        - If there is no food delivery option for the given location and style, a notice will be displayed for the user

## Methods and Tech

- The front-end team for this project was made up of Haley Alton and Vanessa Bautista
    - This team was responsible for creating the HTML index pages and the accompanying CSS style files
    - The technologies they employed include:
        - Bootstrap, including:
            - Flex Box
            - Popper.js
            - Bootstrap JavaScript plugins
        - Typekit fonts
        - Custom CSS styling by Haley and Vanessa

- The back-end team for this project was made up of Sandra Arredondo and Saular Moaddeli
    - This team was responsible for creating the JS files for this application
    - The technologies the employed include:
        - JavaScript
        - JQuery
        - AJAX
            - APIs used:
                - Utelly - Movie streaming services
                - Zomato - Restaurants
                - OMDb - Movie poster/plots
                - City Geo-Location Lookup - Convert city location to latitude and longitude

### Check it out!
- Link to deployed application:  

