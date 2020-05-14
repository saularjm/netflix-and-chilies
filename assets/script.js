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
            serviceDiv.html("<strong>AVAILABLE ON: </strong>" + locations[i].display_name);
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


$(".dropdown-menu a").on("click", function () {

    $("#dropdownMenuButton").text($(this).text());

});



var longitude;
var latitude;

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



        longitude = response.Results[0].lon;

        console.log(longitude);

        latitude = response.Results[0].lat;

        console.log(latitude);



        renderFoodDivs(integerId, latitude, longitude, zipcodeValue);

    });



};


var integerId;
var zipcodeValue;
var cityValue;

$("#dropdownMenuButton ~ .dropdown-menu > a").on("click", function (e) {
    e.preventDefault();


    console.log("click");

    $("#food-section").empty();


    integerId = $(this).attr("id");


    cityValue = $("#city-search").val();
    zipcodeValue = $("#zip-search").val();

    console.log(integerId);//want id number as a number but string works too
    console.log(zipcodeValue);
    console.log(cityValue);



    renderingCoords(integerId, zipcodeValue, cityValue);




});


////add two more parameters in function for lat and lot and change zomato url
function renderFoodDivs(foodId, lat, lon, zipCode) {

    //DISPLAY FOOD TYPE 
    var foodPicId = "#foodPic-" + integerId;
    $(".food-display").children("img").hide();
    $(".food-display").children(foodPicId).show();

    /*URL includes city id for Sacramento, entity type narrows down what type of location we're looking for restaurants in, category specifies what kind of service
    we're looking for - category 1 refers to delivery. Count specifies how many results to show on webpage. Cuisines is refrenced by a zomato specific food code*/

    var queryURL = `https://developers.zomato.com/api/v2.1/search?q=${zipCode}&lat=${lat}&lon=${lon}&category=1&sort=rating&count=5&cuisines=${foodId}`;

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: { "user-key": "8aeaa8b6fb7879eccc32af42e280f916" }
    }).then(function (response) {
        console.log(response);

        zipcodeValue = null;
        cityValue = null;
        integerId = null; //sets them back to zero, like the emtpy method

        /*storing response from ajax call in a variable, to be referred to in the for loop*/
        var restaurant = response.restaurants;

        var foodSection = $("#food-section");

        var br;

        var hr;


        if (restaurant === undefined || restaurant.length == 0) {

            foodSection.html(`Awww! No Restaurants In Your Area Deliver!`);
        }
        else {
            // Loop through and print restaurant info
            for (var i = 0; i < restaurant.length; i++) {


                var name = $("<div>").addClass("rest-name").text(restaurant[i].restaurant.name).css({ "font-weight": "600", "font-size": "17px" });
                foodSection.append(name);


                var address = $("<div>").addClass("rest-address").text(restaurant[i].restaurant.location.address).css("font-size", "14px");
                foodSection.append(address);


                var emptyDiv = $("<div>").addClass("div");
                foodSection.append(emptyDiv);

                var linkMenu = $("<a>").addClass("link-menu").attr(
                    {
                        "href": restaurant[i].restaurant.menu_url,
                        "target": "_blank"
                    }
                ).text("Click Here for the Menu!");

                emptyDiv.append(linkMenu);


                var number = $("<div>").addClass("number").text(restaurant[i].restaurant.phone_numbers);
                foodSection.append(number);

                hr = $("<hr>");
                foodSection.append(hr);

                br = $("<br>")
                foodSection.append(br);


            }
        }

    });


}


