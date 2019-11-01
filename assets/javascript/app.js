$(document).ready(function () {

    //Set global variables
    var year = "";

    //on click of the search bar at top of page
    $("#search").on("click", function (event) {
        event.preventDefault();

        //===================================================================================================
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
        });

        //Works but gives entire archive that we need to make smaller
        //on click call to get nyt bestsellers
        //===================================================================================================
        var nytbooksURL = "https://api.nytimes.com/svc/books/v3/lists/" + year + "-11-01/hardcover-fiction/.json?api-key=0ArbXCzxyFGrfyavgsWmMGmFxb0qoVTb";

        //Only works till like 2010
        //ajax call to nyt to get some of the year's headlines
        $.ajax({
            url: nytbooksURL,
            method: "GET"
        }).then(function (booksResponse) {
            console.log(booksResponse);
        });
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


        //===================================================================================================
    });
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




