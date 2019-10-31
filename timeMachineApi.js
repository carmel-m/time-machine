// This page to collect APIs we need.

// movie poster api from 06-10
// var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

// NYT api from 06-16
// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

// event api from ticketmaster
// var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=55QQOGRsEvA5rseMYGRctNWtOAX1aj4p";

// music api from tastedive

/* q: the search query; consists of a series (at least one) of bands, movies, TV shows, podcasts, books, authors and/or games, separated by commas. Sometimes it is useful to specify the type of a certain resource in the query (e.g. if a movie and a book share the same title). You can do this by using the "band:", "movie:", "show:", "podcast:", "book:", "author:" or "game:" operators, for example: "band:underworld, movie:harry potter, book:trainspotting". Don't forget to encode this parameter.
type: query type, specifies the desired type of results. It can be one of the following: music, movies, shows, podcasts, books, authors, games. If not specified, the results can have mixed types.
info: when set to 1, additional information is provided for the recommended items, like a description and a related Youtube clip (when available). Default is 0.
limit: maximum number of recommendations to retrieve. Default is 20.
k: Your API access key.
callback: add when using JSONP, to specify the callback function.
var queryURL = "https://tastedive.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction";
*/

function displayMovieInfo() {

  var event = $(this).attr("data-name");
  var queryURL = "https://tastedive.com/api/similar?q=" + band + "%2C+pulp+fiction";

  // Creating an AJAX call for the specific event button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    // Creating a div to hold the event
    var eventDiv = $(".event");

    // Retrieving the URL for the image
    // var imgURL = 

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    eventDiv.append(image);

    // Putting the entire event above the previous events
    $("#events-view").prepend(eventDiv);
  });

}

$("#add-event").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var event = $("#event-input").val().trim();

  // Adding event from the textbox to our array
  events.push(event);

});

displayMovieInfo();


// $.ajax({
//   type: "GET",
//   url: "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=55QQOGRsEvA5rseMYGRctNWtOAX1aj4p",
//   async: true,
//   dataType: "json",
//   success: function (json) {
//     console.log(json);
//     // Parse the response.
//     // Do other things.
//   },
//   error: function (xhr, status, err) {
//     // This time, we do not end up here!
//   }
// });


