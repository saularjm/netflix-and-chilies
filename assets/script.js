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
            var movieTitle = movieData.results[0].name.toUpperCase();

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

            // Build query URL
            var UtellyQuery = buildUtellyURL();

            // Call API with page update method
            $.ajax(UtellyQuery).then(updatePage);
        })

        
        //////////////////////////////////////////////////////

        /*
        1. click event for dropdown menu so it toggles the options
        2. click event for selection, (and preventdefault) that grabs the id (that has the corresponding zomato food code)
        and then does an ajax call with the id (that has to be turned into an integer first)
        3. for every selection an ajax call populates the container div with 10 results
            a. each result gets a set of three (for now) divs + append to element
        */

        
          //click event for dropdown menu so it toggles the options:

        //   $('.dropdown').on("change", function(e){
        //       e.preventDefault();

        //     $(".dropdown-toggle").toggle();
        // });

          //if user clicks outside of dropdown it closes:

        //   $(document).on("click", function(){
        //       $(".dropdown-toggle").dropdown("toggle");
        //   })

          //if use clicks on a selection

          var integerId;
          //for loop to loop through an array that has the 16 numbers? 
          //first check if this onclick works and then see if it'll when i list the different ids 
          $("#1").on("click", function(e){
              e.preventDefault();

              $("#food-section").empty();

              var integerId = $(this).attr("id");
              console.log(integerId);//want id number as a number but string works too


            /*URL includes city id for Sacramento, entity type narrows down what type of location we're looking for restaurants in, category specifies what kind of service
        we're looking for - category 1 refers to delivery. Count specifies how many results to show on webpage. Cuisines is refrenced by a zomato specific food code*/
            
            var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=499&entity_type=city&category=1&sort=rating&count=4&cuisines=" + integerId;

            $.ajax({
                url: queryURL, 
                method: "GET",
                headers: {"user-key": "8aeaa8b6fb7879eccc32af42e280f916"} 
            }).then(function (response) {
                console.log(response);

                // var for array of restaurants returned by search
                var restaurant = response.restaurants;
                
                // var newDivFood = $("<div id='food-nest'></div>")

                // $("#food-section").append(newDivFood);

                var br = $("<br>")

                // Loop through and print restaurant info
                for (var i = 0; i < 4; i++) {
                    
                    var name = $("<div class='name'></div>").text("Restaurant name: " + restaurant[i].restaurant.name);
                    var menu = $("<div class='menu'></div>").text("Restaurant menu: " + restaurant[i].restaurant.menu_url);
                    var number = $("<div class='number'></div>").text("Restaurant phone number: " + restaurant[i].restaurant.phone_numbers);

                    $("#food-section").append(name, br, menu, br, number);

                
                
                }

            });
            
          });

          

        


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