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
            }
        }
        });

        // AJAX call for OMDb
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response.Plot);
              console.log(response.Poster);
              console.log(response.Runtime);
          })

        // Zomato API
        // Sacramento entity_id = 499
        // entity_type = city
        // Category code for delivery = 1

        // Cuisine codes: American = 1, Asian = 3, BBQ = 193, Breakfast = 182, Burger = 168, Chinese = 25, Desserts = 100, Fast Food = 40, Healthy Food = 143, Indian = 148, Italian = 55, Mexican = 73, Pizza = 82, Seafood = 83, Sushi = 177, Vegetarian = 308

        // var for type of food, have to search by zomato code
        var cuisineCode = 25;

        // API call URL built with given cuisine code
        var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=499&entity_type=city&category=1&sort=rating&cuisines=" + cuisineCode;

        // AJAX call
        $.ajax({
            url: queryURL, 
            method: "GET",
            headers: {"user-key": "8aeaa8b6fb7879eccc32af42e280f916"} 
        }).then(function (response) {
            console.log(response);

            // var for array of restaurants returned by search
            var restaurant = response.restaurants;

            // Loop through and print restaurant info
            for (var i=0;i<=5;i++) {
                console.log("Restaurant name: " + restaurant[i].restaurant.name);
                console.log("Restaurant menu: " + restaurant[i].restaurant.menu_url);
                console.log("Restaurant phone number: " + restaurant[i].restaurant.phone_numbers);
            }
        })