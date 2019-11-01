$(document).ready(function () {
  //Set global variables
    var year = "";


    //on click of the search bar at top of page
    $("#search").on("click", function (event) {
        event.preventDefault();
        
        //
        //===================================================================================================
        //sets year variable to the year that was searched on index.html
        year = $("#searchYear").val().trim();
        console.log(year);
        

        var queryURL = "https://api.themoviedb.org/3/discover/movie?primary_release_year=" + year + "&sort_by=popularity.desc&api_key=5519798d319118490262dd96bcfc5e34";

        //ajax call to themoviedb to get a year's most popular movies
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        });
        //===================================================================================================


    });
  
//    var baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
//   var apiKey = "kJPPIhi6djlErEDbbYV5YUdat43PAwGo";

//   var baseballURL = baseUrl + "?q=" + "baseball" + "&api-key=" + apiKey;

//   console.log(baseballURL);
//   $.ajax({
//     url: baseballURL,
//     method: "GET"
//   }).then(function (getInfo) {
//     console.log(getInfo);
//     var image1 = getInfo.response.docs[0].multimedia[0].url;
//     console.log(image1);

//     var showImage = $("<img>")
    
//   });