# Netflix and Chilies

- A web application to search meal delivery options and streaming movies to accompany them.

- Contributors: Haley Alton, Vanessa Bautista, Sandra Arredondo, and Saular Moaddeli 

## Table of Contents

* Overview

* Usage

* Methods and Tech

* Check it Out!

## Overview

- This application is made of two pages, a landing page and a main page where the user can choose a movie to stream and food to be delivered. The main page includes two different columns, one for movies, and the other for food, based by genre.

- The landing page includes:
    - Title
    - Tagline
    - A button to enter the main webpage
    - Flexbox design
    - Photo/text layering

- Main page includes:
    - Carousel with three images and text layering
    - 2 cards for content
    - Sticky footer

- The movie column displays movie streaming information, including:
    - Movie title
    - Movie poster
    - Plot summary
    - Runtime
    - Streaming services the movie is available on
        - Including links to the movie on those streaming sites

- The food column displays restaurant information for the user's area, including:
    - An image of food by genre
    - Name of the restaurant
    - Restaurant address
    - Link to the restaurant's menu
    - Restaurant phone number

## Usage

- Upon loading of the landing page, the user will be presented with a button, to click, to enter the main page.

- When the main page is loaded, the user is presented with 2 columns, one for movies and one for food:
    - Movies:
        - This column begins with a text input box to type in a movie title 
        - The search can be executed by clicking a search button or pressing the Enter key
        - Once submitted, the movie column will populate with the appropriate information for the movie title that was searched
        - If the movie title that was searched is not valid, a notice will be displayed for the user: "Title not found, please enter another movie"

    - Food:
        - This column begins with 2 text input boxes
            - The first is for the user's city and state location
            - The second is for the user's zipcode
        - There is also a dropdown menu containing different types of food for the user to choose from
        - Upon filling in the location information and choosing a type of food, the food column will be populated with the pertinent information for food delivery in the user's area
        - If there is no food delivery option for the given location and style, a notice will be displayed for the user: "Awww! No Restaurants In Your Area Deliver!"
        - If city, state and/or zip code is not entered before selecting a food genre, a message will pop up for the user: "Enter your location and zipcode FIRST Please! You'll get your food soon enough!"

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
            - Haley handled initial html, the landing page, Flexbox functionality, some tweaks to main page styling
            - Vanessa handled additional html, bootstrap formating, connecting files, carousel on main page, opacity on landing page

- The back-end team for this project was made up of Sandra Arredondo and Saular Moaddeli
    - This team was responsible for creating the JS files for this application
        - Sandra handled coding and APIs for restaurant information
        - Saular handled coding and APIs for movie information
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
- Link to deployed application: https://saularjm.github.io/netflix-and-chilies/

