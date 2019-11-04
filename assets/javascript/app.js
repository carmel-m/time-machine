$(document).ready(function () {
  // gets event from ticketmaster api and could be searched by year.
  var year = "";

  $("#search").on("click", function (event) {
    event.preventDefault();

    year = $("#searchYear").val().trim();
    console.log(year);
    if (1960 <= year && year < 1980){
      $("body").removeClass();
      $("body").addClass("theme1");
    } else if (1980 <= year && year < 2000){
      $("body").removeClass();
      $("body").addClass("theme2");
    } else if (2000 <= year && year < 2020){
      $("body").removeClass();
      $("body").addClass("theme3");
    }
    // var queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=55QQOGRsEvA5rseMYGRctNWtOAX1aj4p&locale=*&startDateTime=" + year + "-01-01T00:00:00Z&endDateTime=" + year + "-12-31T23:59:59Z";

    // var queryURL = "https://www.eventbriteapi.com/v3/users/me/?token=Z6Z72REZVY3INVG46IID"
    // var queryURL = "https://www.eventbriteapi.com/v3/events/search?start_date.range_start=" + year + "-01-01T00:00:00Z&start_date.range_end=" + year + "-12-31T23:59:59Z&token=Z6Z72REZVY3INVG46IID";
    // console.log(queryURL)

    // var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q={query}&fq={pub_year= "+ year +"}&api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M"

    var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M&fq=pub_year:("' + year + '")';
    
    // var myAPIkey = "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M"
    // var searchByYear = "pub_year";
    
    // /articlesearch.json?q={query}&fq={filter}

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (getInfo) {
      console.log(getInfo);
    });

  });
})
