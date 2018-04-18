$(document).ready(function() {
  var allShowsQuery = "http://api.tvmaze.com/shows";

  $.ajax({
    url: allShowsQuery,
    method: "GET"
  }).done(function(shows) {
    console.log(shows);

    for (var i = 0; i < shows.length; i++) {

      //Arrange all show names in alphabetical order

      console.log(shows[i]);
      $("#shows-list").append("<p>" + shows[i].name + "</p>");
    }
  });
})
