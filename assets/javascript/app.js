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
        }).then(function(movieResponse) {
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
        }).then(function(newsResponse) {
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
        }).then(function(booksResponse) {
            console.log(booksResponse);
        });
        //===================================================================================================



        //===================================================================================================
    });

});

  


