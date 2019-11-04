$(document).ready(function () {

    //Set global variables
    var year = "";

    //on click of the search bar at top of page
    $("#search").on("click", function (event) {
        event.preventDefault();

        //sets year variable to the year that was searched on index.html
        year = $("#searchYear").val().trim();
        console.log(year);

        //on click movie section
        //===================================================================================================
        var moviedbURL = "https://api.themoviedb.org/3/discover/movie?primary_release_year=" + year + "&sort_by=popularity.desc&api_key=5519798d319118490262dd96bcfc5e34";

        //ajax call to themoviedb to get a year's most popular movies
        $.ajax({
            url: moviedbURL,
            method: "GET"
        }).then(function (movieResponse) {
            console.log(movieResponse);

            //for loop that grabs title of top 10 movies of searched year
            for (i = 0; i < 10; i++) {
                var movieTitle = movieResponse.results[i].title;
                console.log(movieTitle);
                var movieTitleText = $("<p>").text((i + 1) + ": " + movieTitle);

                $("#topmovies").append(movieTitleText);

            }
        });
        //===================================================================================================

        //on click tv shows
        //===============================================================================================
        var tvURL = "https://api.themoviedb.org/3/discover/tv?first_air_date_year=" + year + "&sort_by=popularity.desc&api_key=5519798d319118490262dd96bcfc5e34";

        //ajax call to themoviedb to get a year's most popular tv shows
        $.ajax({
            url: tvURL,
            method: "GET"
        }).then(function (tvResponse) {
            console.log(tvResponse);

            // for loop that grabs title of top 10 movies of searched year
            for (i = 0; i < 10; i++) {
                var showTitle = tvResponse.results[i].name;
                console.log(showTitle);
                var showTitleText = $("<p>").text((i + 1) + ": " + showTitle);

                $("#topshows").append(showTitleText);

            }
        });
        //===================================================================================================

        //on click nyt headline section
        //===================================================================================================
        var nytURL = "https://api.nytimes.com/svc/archive/v1/" + year + "/11.json?api-key=0ArbXCzxyFGrfyavgsWmMGmFxb0qoVTb";
      
        //ajax call to nyt to get some of the year's headlines
        $.ajax({
           url: nytURL,
           method: "GET"
       }).then(function (newsResponse) {
           console.log(newsResponse);
           for (var i = 0; i < 5; i++) {
               var headline = newsResponse.response.docs[i].headline.main;;
               var snippet = newsResponse.response.docs[i].snippet;
               var URL = newsResponse.response.docs[i].web_url;
               console.log(headline);
               console.log(snippet);
               console.log(URL);
               var newsDiv = $("<div>");
               newsDiv.append("<h4><span>" + (i+1) + ". " + " </span> " + headline + "</h4>");
               newsDiv.append("<p>" + snippet + "</p>");
               newsDiv.append("<p>" + URL + "</p>");
               $("#top-news").append(newsDiv);
           }
        });
        //===================================================================================================
        
        //on click giphy section
        //===================================================================================================
        var giphyURL = "https://api.giphy.com/v1/gifs/random?api_key=BYBsCAYxfGcNZA0LGOL6tw6AMo0HxPrS&tag=" + year + "&rating=G";

        $.ajax({
            url: giphyURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.data.images.original_still.url);
            console.log(response.data.images.original.url);

            // Creating and storing an image tag
            var pageGif = $("<img>");
            pageGif.attr("src", response.data.images.original_still.url);
            pageGif.attr("alt", "A random image from an appropriate year");
            pageGif.attr("data-still", response.data.images.original_still.url);
            pageGif.attr("data-move", response.data.images.original.url);
            pageGif.attr("data-state", "still");
            pageGif.attr("class", "gif");

            // Prepending the pageGif to the images div
            $("#gifDump").prepend(pageGif);
        });
        //===============================================================================================



    }); //end of on click submit=============================================================================

    
    //on-click function to make pictures move
    $(".gif").on("click", function () {
        var movingGif = $(this).attr("data-state");
        //that should grab the "data-state" of the gif that was clicked on, and set it as a variable
        //so now, i'll have an "if statement" that should change it to "animate", otherwise it will reset to the default "still".
        if (movingGif === "still") {
            //so i expect this to toggle the "src" of the gif by looking inside the gif's attributes, then change the "data-state" attribute as well.
            $(this).attr("src", $(this).attr("data-move"));
            $(this).attr("data-state", "move");
        } else {
            //otherwise, it must be animated, thus, reset it to "still"
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});




