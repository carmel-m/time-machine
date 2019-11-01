$(document).ready(function () {
  // gets event from ticketmaster api and could be searched by year.
  var year = "";

  $("#search").on("click", function (event) {
    event.preventDefault();

    year = $("#searchYear").val().trim();
    console.log(year);

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=55QQOGRsEvA5rseMYGRctNWtOAX1aj4p&locale=*&startDateTime=" + year + "-01-01T00:00:00Z&endDateTime=" + year + "-12-31T23:59:59Z";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (getInfo) {
      console.log(getInfo);
    });

  });
})