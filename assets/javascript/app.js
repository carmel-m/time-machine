$(document).ready(function () {

  //Set global variable(s)
  var year = "";

  //Function that clears all info so nothing appends/prepends 
  function clear() {
    $("#yearDump").empty();
    $("#topmovies").empty();
    $("#topshows").empty();
    $("#top-news").empty();
    $("#gifDump").empty();
    $(".alert").empty();
  }

  //Function that hides original index layout until search is initially started
  function hideSearch() {
    $("#navigation").hide();
    $("#image").hide();
    $("#NYT").hide();
    $("#giphy").hide();
    $("#moviesandshows").hide();
  }

  //Function that shows homepage 
  function showHome() {
    $("#headline").show();
    $("#search").show();
  }

  //Function that hides original index layout until search is initially started
  function showSearch() {
    $("#navigation").show();
    $("#image").show();
    $("#NYT").show();
    $("#moviesandshows").show();
    $("#giphy").show();

  }

  //Function that hides homepage
  function hideHome() {
    $("#headline").hide();
    $("#search").hide();
  }

  //Function for input validation
  function checkDate(year) {
    if (isNaN(year) || year < 1950 || year > 2019) {
      return false;
    }
    return true;
  }

  //Call these functions before on-click to display "homepage"
  hideSearch();
  showHome();

  //On-click of both search buttons
  $("#searchButton1, #searchButton2").on("click", function (event) {
    event.preventDefault();

    //Sets year variable to the year that was searched on index.html
    year = $(this).parent().find(".searchYear").val().trim();
    console.log(year);

    //If statement that makes sure user is inputting a valid year
    if (checkDate(parseInt(year))) {
      clear();
      hideHome();
      showSearch();

      //Moment.js
      //===================================================================================================
      var year2 = "01/01/" + year;
      var year3 = moment().diff(moment(year2), "years");
      var yearDisplay = "A snapshot of " + year3 + " years ago";
      var yearsAgo = $("<h3>");
      yearsAgo.text(yearDisplay);
      $("#yearDump").prepend(yearsAgo);
      console.log(yearsAgo);
      //===================================================================================================

      //On-click nyt headline section
      //===================================================================================================
      var nytURL = "https://api.nytimes.com/svc/archive/v1/" + year + "/11.json?api-key=0ArbXCzxyFGrfyavgsWmMGmFxb0qoVTb";

      //Ajax call to nyt to get some of the year's headlines
      $.ajax({
        url: nytURL,
        method: "GET"
      }).then(function (newsResponse) {
        console.log(newsResponse);
        for (var i = 0; i < 3; i++) {
          var headline = newsResponse.response.docs[i].headline.main;;
          var snippet = newsResponse.response.docs[i].snippet;
          var URL = newsResponse.response.docs[i].web_url;

          console.log(headline);
          console.log(snippet);
          console.log(URL);


          var newsDiv = $("<div>")
          newsDiv.attr("class", "rounded-top p-1");
          
          newsDiv.append("<h6><span>" + (i + 1) + ". " + " </span> " + headline + "</h6>");
          newsDiv.append("<p>" + snippet + "</p>");
          newsDiv.append("<a href=" + URL + ">Continue Reading</a>");
          $("#top-news").append(newsDiv);
        }
      });
      //===================================================================================================

      //On click giphy section
      //===================================================================================================
      var giphyURL = "https://api.giphy.com/v1/gifs/random?api_key=BYBsCAYxfGcNZA0LGOL6tw6AMo0HxPrS&tag=" + year + "&rating=G";

      $.ajax({
        url: giphyURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);

        var movingGif = response.data.images.fixed_height.url;
        var stillGif = response.data.images.fixed_height_still.url;
        var pageGif = $("<img>");

        pageGif.attr("class", "gif");
        pageGif.attr("src", stillGif);
        pageGif.attr("alt", "A random image from an appropriate year");
        pageGif.attr("data-still", stillGif);
        pageGif.attr("data-moving", movingGif);
        pageGif.attr("data-state", "still");

        //Prepending the pageGif to the images div
        $("#gifDump").prepend(pageGif);
      });
      //===============================================================================================

      //On-click movies section
      //===================================================================================================
      var moviedbURL = "https://api.themoviedb.org/3/discover/movie?primary_release_year=" + year + "&sort_by=popularity.desc&api_key=5519798d319118490262dd96bcfc5e34";

      //Ajax call to themoviedb to get a year's most popular movies
      $.ajax({
        url: moviedbURL,
        method: "GET"
      }).then(function (movieResponse) {
        console.log(movieResponse);

        //For loop that grabs title of top 4 movies of searched year
        for (let i = 0; i < 4; i++) {
          var movieDiv = $('<div>');
          movieDiv.addClass('movie');
          var movieImage = movieResponse.results[i].poster_path;
          var movieTitle = movieResponse.results[i].title;
          var movieImage = $("<img>").attr("src", "https://image.tmdb.org/t/p/w500" + movieImage);
          var movieTitleText = $("<p>").text((i + 1) + ": " + movieTitle);
          movieDiv.append(movieImage, movieTitleText)
          $("#topmovies").append(movieDiv);
        }
      });
      //===================================================================================================

      //On-click tv shows section
      //===============================================================================================
      var tvURL = "https://api.themoviedb.org/3/discover/tv?first_air_date_year=" + year + "&sort_by=popularity.desc&api_key=5519798d319118490262dd96bcfc5e34";
      console.log(tvURL);

      //Ajax call to themoviedb to get a year's most popular tv shows
      $.ajax({
        url: tvURL,
        method: "GET"
      }).then(function (showResponse) {
        console.log(showResponse);

        //For loop that grabs title of top 4 movies of searched year
        for (let i = 0; i < 4; i++) {
          var showDiv = $('<div>');
          showDiv.addClass('show');
          var showImage = showResponse.results[i].poster_path;
          var showTitle = showResponse.results[i].name;
          var showImageText = $("<img>").attr("src", "https://image.tmdb.org/t/p/w500" + showImage);
          var showTitleText = $("<p>").text((i + 1) + ": " + showTitle);
          showDiv.append(showImageText, showTitleText)
          $("#topshows").append(showDiv);
        };
      })
      //===================================================================================================

      //Will display a notification if user does not search within the parameters
    } else {
      $(".alert").text("Please enter a year between 1950 and 2019");
    }

  }); //End of on click submit=============================================================================

  //Function that starts/stops a gif when it is clicked
  function startStop() {
    var state = $(this).attr("data-state");
    var movingImage = $(this).attr("data-moving");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
      $(this).attr("src", movingImage);
      $(this).attr("data-state", "moving");
    }

    else if (state == "moving") {
      $(this).attr("src", stillImage);
      $(this).attr("data-state", "still");
    }
  }

  //On click that will start/stop a gif when clicked
  $(document).on("click", ".gif", startStop);

});
