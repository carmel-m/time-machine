$(document).ready(function () {

    //Set global variables
    var year = "";


    $("#search").on("click", function (event) {
        event.preventDefault();
        
        year = $("#searchYear").val().trim();
        console.log(year);
        
        var queryURL = "https://api.themoviedb.org/3/discover/movie?primary_release_year=" + year + "&sort_by=popularity.desc&api_key=5519798d319118490262dd96bcfc5e34";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        });



    });




});