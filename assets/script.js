//Slideshow script to animate
$(document).ready(function(){
    $('.carousel').carousel({
      interval: 1000
    })
  });    
// Utelly API - best for determining what streaming service offers a given title

// Function to build Utelly query URL:
function buildUtellyURL() {
    var title = $("#movie-search").val().trim();

    // Setting up API parameters:
    var settings = {
        url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + title + "&country=us",
        method: "GET",
        headers: {
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": "d30cc4b8b9msh215308fd232e003p1db4bcjsn6b60f025c407"
        }
    }

    return settings;
}

// Function to update page with movie data
function updatePage(movieData) {

    // Error handler if movie isn't available for streaming
    if (movieData.results.length === 0) {
        $("#movie-section").html("Title not found, please enter another movie");
    }
    else {
        // Var for array of available locations to stream:
        var locations = movieData.results[0].locations;

        // Var for movie title
        var movieTitle = $("#movie-search").val().trim().toUpperCase();

        // Create header with title and append to page
        var titleHeader = $("<h2 id='movie-title'>");
        titleHeader.html(movieTitle);
        $("#movie-section").append(titleHeader);
        $("#movie-section").append($("<br>"));


        // Loop through different streaming services available and display name and link:
        for (var i = 0; i <= locations.length - 1; i++) {

            // Create div for response info
            var streamDiv = $("<div id='all-links'>");

            // Create div for name of streaming service and append to streamDiv
            var serviceDiv = $("<div id='service-name'>");
            serviceDiv.html("<strong>Available on: </strong>" + locations[i].display_name);
            streamDiv.append(serviceDiv);

            // Create div for link to streaming service and append to streamDiv
            var linkDiv = $("<div id='service-link'>");
            var link = $("<a>");

            link.attr("href", locations[i].url);
            link.attr("target", "_blank");
            link.text("Click here to stream!");

            linkDiv.text("Link: ");
            linkDiv.append(link);
            streamDiv.append(linkDiv);
            streamDiv.append($("<hr>"));

            // Append streamDiv to page
            $("#movie-links").append(streamDiv);
        }

        // Create OMDb query using movie title and call that API
        var omdbQuery = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=724592e7";

        $.ajax({
            url: omdbQuery,
            method: "GET"
        }).then(function (response) {

            // Create image for poster and append to page
            var poster = $("<img id='moviePic' style='height:200px'>");
            poster.attr("src", response.Poster);
            $("#movie-section").append(poster);

            // Create div for plot and append to page
            var plotDiv = $("<div id='plotDiv'>");
            plotDiv.html("<strong>Plot summary: </strong>" + response.Plot);
            $("#movie-section").append(plotDiv);

            // Create div for runtime and append to page
            var timeDiv = $("<div id='runtimeDiv'>");
            timeDiv.html("<strong>Runtime: </strong>" + response.Runtime);
            $("#movie-section").append(timeDiv);
        });
    }
}

// Click handler for search button
$("#searchButton").on("click", function (event) {
    event.preventDefault();



    // Empty movie div to start
    $("#movie-section").empty();
    $("#movie-links").empty();

    // Build query URL
    var UtellyQuery = buildUtellyURL();

    // Call API with page update method
    $.ajax(UtellyQuery).then(updatePage);
})


// Enter button handler for movie search
$("#movie-search").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchButton").click();
    }
})


///////////////////////FOOD SEARCH BELOW///////////////////////////////

/*When a user chooses an item from the dropdown menu the text in the drop down menu changes from 'Select food genre' to the food item chosen.
If another item is chosen the text will change again to this new food item. It reverts back to 'Select food genre' when the page refreshes.*/
$(".dropdown-menu a").on("click", function () {

    $("#dropdownMenuButton").text($(this).text());

});

/*The variables holding the latitude and longitude, taken from the City Geo-Location Lookup API, are initialized here*/
var longitude;
var latitude;

/*This function holds the ajax call from the City Geo-Location Lookup API, it is fed three parameters, integerId, zipcodeValue, cityName. All three come from the click
event for the dropdown menu. Only one is being fed into the url for the API, cityName comes from the cityValue variable that holds the value of the user input for city
and state on index2.html, and was captured by the click event. The response throws back longitude and latitude for this location. Both of these along with integerId and 
zipcodeValue are fed into the function renderFoodDivs (for the ajax call that renders the restaurant info for the user).*/
function renderingCoords(integerId, zipcodeValue, cityName) {

    var settings = {
        "url": `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${cityName}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
            "x-rapidapi-key": "4fabb19bebmsh9b17211c969e040p165516jsn9f94a2d4bc2a"
        }
    }

    $.ajax(settings).then(function (response) {
        console.log(response);

    /*longitude and latitude from the response, for the specified city and state*/
        longitude = response.Results[0].lon;
        latitude = response.Results[0].lat;

    /*calling the function renderFoodDivs to feed the longitude, latitude, integerId, and zipcodeValue into it. The variables are called in the same order
    they are listed as for the parameters for the function renderFoodDivs*/
        renderFoodDivs(integerId, latitude, longitude, zipcodeValue);

    });
};

/*Initializing the three variables that hold the values for the two input elements and the value for the chosen dropdown menu item*/
var integerId;
var zipcodeValue;
var cityValue;

/*Click event for the items on the dropdown menu, the Zomato API url will only accept the designated food codes per food genre, the dropdown menu items(food genres)
each have an id corresponding to this food code. When the item is selected from the dropdown menu, the var integerId grabs the value of the id. Values inserted into
the two input elements on index2.html are grabbed by two variables, zipcodeValue (for the zip code), and cityValue (city and state) when the click event triggers. 
The values for integerId and zipcodeValue are fed into the function renderingCoords along with cityValue into the City Geo-Location Lookup API url and create two variables 
in the same function for integerId and zipcodeValue so that the value from this click event can be carried to the function renderFoodDivs once the longitude and 
latitude are generated for the user's location.*/
$("#dropdownMenuButton ~ .dropdown-menu > a").on("click", function (e) {
    /*prevents the web browswer from doing what it usually does, prevents it form submitting the form*/
    e.preventDefault();

    /*With every new selection, the dynamically created divs in the function renderFoodDivs is emptied in the card element*/
    $("#food-section").empty();

    integerId = $(this).attr("id");

    cityValue = $("#city-search").val();
    zipcodeValue = $("#zip-search").val();

    /*To prevent the function renderingCoords from being fed the cityValue for cityName variable (for API url), this checks
    to see if values were entered into the input elements for zip code and city/state. Otherwise, the cityValue will be sent to
    renderingCoords and hence to renderFoodDivs function, where Zomato url will still work without the zipcode (that further narrows
    down the user's location*/
    if (integerId && zipcodeValue){

    renderingCoords(integerId, zipcodeValue, cityValue);

    }
    else {
        $("#food-section").text("Enter your location and zipcode FIRST Please! You'll get your food soon enough!")
    }

});


/*The values from renderingCoords are deposited here, integerId corresponds to the parameter foodId, latitude to lat, longitude to lon, and zipcodeValue to zipCode.*/
function renderFoodDivs(foodId, lat, lon, zipCode) {

    /*Once the click event triggers and the latitude and longitude are rendered for the specific city, state and zipcode, a picture specific to the food genre is 
    displayed. This is done by targeting the specific id per food selection. All pictures are hidden except for the corresponding food picture for the selected 
    food genre*/
    var foodPicId = "#foodPic-" + integerId;
    $(".food-display").children("img").hide();
    $(".food-display").children(foodPicId).show();

    /*URL includes zipcode (q), latitude (lat), longitude (lon), category specifies what kind of service - category 1 refers to delivery, sort specifies how the
    results are ordered - by rating, count refers to how many results appear - 5, cuisines refers to the food genre selected which corresponds to the specific Zomato
    food code.*/
    var queryURL = `https://developers.zomato.com/api/v2.1/search?q=${zipCode}&lat=${lat}&lon=${lon}&category=1&sort=rating&count=5&cuisines=${foodId}`;

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: { "user-key": "8aeaa8b6fb7879eccc32af42e280f916" }
    }).then(function (response) {
        console.log(response);

        /*This empties the variables so that they be used again if the user changes their location or food selection*/
        zipcodeValue = null;
        cityValue = null;
        integerId = null;

        /*storing response from ajax call in a variable, to be referred to in the for loop*/
        var restaurant = response.restaurants;

        /*cretes a variable to hold the id food-section, to be referred to in the for loop and if statement*/
        var foodSection = $("#food-section");

        /*initializes the variable to hold the element hr to be used in the for loop*/
        var hr;

        /*This if statement is in case there are no restaurants for the selected food genre*/
        if (restaurant === undefined || restaurant.length == 0) {

            foodSection.html(`Awww! No Restaurants In Your Area Deliver!`);
        }
        else {
            /*Loops through response to dynamically create divs for the id food-section, carried by the variable foodSection*/
            for (var i = 0; i < restaurant.length; i++) {

                /*Creates a div with the class of rest-name, text for the restaurants name is deposited. This div is then appended to the food-section div*/
                var name = $("<div>").addClass("rest-name").text(restaurant[i].restaurant.name);
                foodSection.append(name);

                /*Creates a div with the class of rest-address, text for the restaurants address is deposited. It is given a slightly smaller font-size for ease of 
                reading. This div is then appended to the food-section div*/
                var address = $("<div>").addClass("rest-address").text(restaurant[i].restaurant.location.address).css("font-size", "14px");
                foodSection.append(address);

                /*Creates a div with the class of div, this emptydiv is to append a link element that holds the href to a url that takes the user to a page that holds
                the menu for the restaurant. This emptydiv is appended to the food-section div first and then the a link element is appended to the emptydiv*/
                var emptyDiv = $("<div>").addClass("div");
                foodSection.append(emptyDiv);
                
                var linkMenu = $("<a>").addClass("link-menu").attr(
                    {
                        "href": restaurant[i].restaurant.menu_url,
                        "target": "_blank"
                    }
                ).text("Click Here for the Menu!");
                emptyDiv.append(linkMenu);

                /*Creates a div with the class of number, text for the restaurants phone number is deposited. This div is then appended to the food-section div*/
                var number = $("<div>").addClass("number").text(restaurant[i].restaurant.phone_numbers);
                foodSection.append(number);
                /*Creates a horizontal line element for after each restaurant, so section them off from each other*/
                hr = $("<hr>");
                foodSection.append(hr);

            }
        }
    });
}


