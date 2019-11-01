$(document).ready(function () {


  var baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  var apiKey = "kJPPIhi6djlErEDbbYV5YUdat43PAwGo";

  var baseballURL = baseUrl + "?q=" + "baseball" + "&api-key=" + apiKey;

  console.log(baseballURL);
  $.ajax({
    url: baseballURL,
    method: "GET"
  }).then(function (getInfo) {
    console.log(getInfo);
    var image1 = getInfo.response.docs[0].multimedia[0].url;
    console.log(image1);

    var showImage = $("<img>")
    
  });

});