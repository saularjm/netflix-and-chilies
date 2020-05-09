        // Utelly API - best for determining what streaming service offers a given title
        // Title to search for:
       
        var title = "space jam";

        // Setting up API parameters:
        var settings = {
            url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + title + "&country=us",
            method: "GET",
            headers: {
                "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
                "x-rapidapi-key": "d30cc4b8b9msh215308fd232e003p1db4bcjsn6b60f025c407"
            }
        }

        // OMDb query url
        var queryURL = "https://www.omdbapi.com/?t=" + title + "&apikey=724592e7";

        // Perform AJAX call for utelly:
        $.ajax(settings).then(function (response) {
            //console.log(response);
            if (response.results.length === 0) {
                console.log("No movie for you!");
            }
            else {
            // Var for array of available locations to stream:
            var locations = response.results[0].locations;

            // Loop through different streaming services available and print:
            for (var i=0;i<=locations.length-1;i++) {
                console.log("Available on: " + locations[i].display_name);
                console.log("Link: " + locations[i].url);
            }
        }
        });

        // AJAX call for OMDb
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response.Title);
              console.log(response.Plot);

              var poster = $("<img>");
              poster.attr("src", response.Poster);

              console.log(response.Poster);
              console.log(response.Runtime);
          })




        
        //////////////////////////////////////////////////////

        /*
        1. click event for dropdown menu so it toggles the options
        2. click event for selection, (and preventdefault) that grabs the id (that has the corresponding zomato food code)
        and then does an ajax call with the id (that has to be turned into an integer first)
        3. for every selection an ajax call populates the container div with 10 results
            a. each result gets a set of three (for now) divs + append to element
        */

        /*
          click event for dropdown menu so it toggles the options:

          $().on("click", function(){

            $(".dropdown-toggle").dropdown("toggle");
          });

          if user clicks outside of dropdown it closes:

          $(document).on("click", function(){
              $(.dropdown-toggle").dropdown("toggle");
          })

          if use clicks on a selection

          $("#1").on("click", function(e){
              e.preventDefault();

              var integerId = $(this).attr("id");
              console.log(intergerId);//want id number as a number but string works too


            /*URL includes city id for Sacramento, entity type narrows down what type of location we're looking for restaurants in, category specifies what kind of service
        we're looking for - category 1 refers to delivery. Count specifies how many results to show on webpage. Cuisines is refrenced by a zomato specific food code*/
            /*
            var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=499&entity_type=city&category=1&sort=rating&count=10&cuisines=" + integerId;

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

                // Loop through and print restaurant info
                for (var i = 0; i < 10; i++) {
                    
                    var name = $("<div class='name'></div>").text("Restaurant name: " + restaurant[i].restaurant.name);
                    var menu = $("<div class='menu'></div>").text("Restaurant menu: " + restaurant[i].restaurant.menu_url);
                    var number = $("<div class='number'></div>").text("Restaurant phone number: " + restaurant[i].restaurant.phone_numbers);

                    $("#food-section").append(name, menu, number);

                
                
                }

            });
            
          });

          

        */


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