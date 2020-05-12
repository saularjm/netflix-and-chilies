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
            for (var i=0;i<=locations.length-1;i++) {

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
              }).then(function(response) {

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
        $("#searchButton").on("click", function(event) {
            event.preventDefault();

            // Empty movie div to start
            $("#movie-section").empty();
            $("#movie-links").empty();

            // Build query URL
            var UtellyQuery = buildUtellyURL();

            // Call API with page update method
            $.ajax(UtellyQuery).then(updatePage);
        })

        
        //////////////////////////////////////////////////////

        $(".dropdown-menu a").on("click", function(){

            $("#dropdownMenuButton").text($(this).text());

        });


        var cityValue;

        $("#city-search").on("keyup", function(e){

            var enter = e.which;

            if (enter === 13){

                e.preventDefault();

                console.log("keyup")

                var cityValue = $(this).val();

                //call the function within the if statement

                console.log(cityValue);

            }

        });


        ////////do this one
        function renderingCoords(cityName){


            //call renderFoodDivs function here(within the ajax call), pass the lon and lat variables in it

        };


          var integerId;
     

          $("#dropdownMenuButton ~ .dropdown-menu > a").on("click", function(e){
              e.preventDefault();

                console.log("click");

              $("#food-section").empty();


              integerId = $(this).attr("id");
              

              
              console.log(integerId);//want id number as a number but string works too
              //console.log(parseId)


            /*an if statement where renderFoodDivs will only be called if a city was typed in
            */
              renderFoodDivs(integerId);

          });

          


          //////keyup listener for future input element for inputing zipcode (to be entered into renderfood divs function)



          ////add two more parameters in function for lat and lot
          function renderFoodDivs(foodId){


                
            /*URL includes city id for Sacramento, entity type narrows down what type of location we're looking for restaurants in, category specifies what kind of service
            we're looking for - category 1 refers to delivery. Count specifies how many results to show on webpage. Cuisines is refrenced by a zomato specific food code*/
            
            var queryURL = `https://developers.zomato.com/api/v2.1/search?entity_id=499&entity_type=city&category=1&sort=rating&count=5&cuisines=${foodId}`;

            $.ajax({
                url: queryURL, 
                method: "GET",
                headers: {"user-key": "8aeaa8b6fb7879eccc32af42e280f916"} 
            }).then(function (response) {
                console.log(response);

                
                /*storing response from ajax call in a variable, to be referred to in the for loop*/
                var restaurant = response.restaurants;

                var foodSection = $("#food-section");

                var br;

                var hr;

                // Loop through and print restaurant info
                for (var i = 0; i < restaurant.length; i++) {

                    
                    var name = $("<div>").addClass("rest-name").text("Restaurant name: " + restaurant[i].restaurant.name);
                    foodSection.append(name);

                    br = $("<br>")
                    foodSection.append(br);

                    // var image = $("<img>").addClass("link-img").attr(
                    //     {
                    //     "src": restaurant[i].restaurant.featured_image,
                    //     "alt": "Menu Item"
                    //     });

                    // foodSection.append(image);


                    var emptyDiv = $("<div>").addClass("div");
                    foodSection.append(emptyDiv);

                    var linkMenu = $("<a>").addClass("link-menu").attr(
                        {
                        "href": restaurant[i].restaurant.menu_url,
                        "target": "_blank"
                        }
                    ).text("Click Here for the Menu!");

                    emptyDiv.append(linkMenu);

                    
                    br = $("<br>")
                    foodSection.append(br);


                    var number = $("<div>").addClass("number").text("Phone number: " + restaurant[i].restaurant.phone_numbers);
                    foodSection.append(number);
                    
                    hr = $("<hr>");
                    foodSection.append(hr);

                    br = $("<br>")
                    foodSection.append(br);
                    
                
                }

            });
          }

        


        // Zomato API
        // Sacramento entity_id = 499
        // entity_type = city
        // Category code for delivery = 1

        /* Cuisine codes: 16 
        American = 1, 
        Asian = 3, 
        BBQ = 193, 
        Breakfast = 182, 
        Burger = 168, 
        Chinese = 25, 
        Desserts = 100, 
        Fast Food = 40, 
        Healthy Food = 143, 
        Indian = 148, 
        Italian = 55, 
        Mexican = 73, 
        Pizza = 82, 
        Seafood = 83, 
        Sushi = 177, 
        Vegetarian = 308

        */

        // var selectedFood = {
        //     American: 1,
        //     Asian: 3,
        //     BBQ: 193,

        // };

          
        // var for type of food, have to search by zomato code
        //var cuisineCode = 25;

        // API call URL built with given cuisine code

        //do a drop down menu of the food
        //get all cuisine codes and put in drop down menu - only show the names (grab the names)
        //click event for drop down menu
            //clicking on initial drop down
            //clicking on a selection
        //clicking on menu opens up a modal


        ///as it cycles through response, it creates three new divs for every item and appends it behind the previous result