$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });



  // This function handles events where a movie button is clicked
  $(".searchTV").on("click", function(event) {
    event.preventDefault();
    $("#episode-results").empty();
    // This line grabs the input from the textbox
    var show = $(".tv-input").val().trim();
    var queryURL = "http://api.tvmaze.com/search/shows?q=" + show + "&embed=episodes";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response[0].show);
      $("#results").html("<h2>" + response[0].show.name + "</h2>");
      $("#results").append("<img src='" + response[0].show.image.medium + "'>");
      $("#results").append("<p>" + response[0].show.summary + "</p>");
      $("#results").append("<p>" + response[0].show.network.name + "</p>");
      $("#results").append("<p>" + response[0].show.genres + "</p>");
      $("#results").append("<p>" + response[0].show.schedule.days + " " + response[0].show.schedule.time + "</p>");
      $("#results").append("<p>" + response[0].show.premiered + "</p>");
      $("#results").append("<p>" + response[0].show.status + "</p>");
      $("#results").append("<a target='_blank' href='" + response[0].show.officialSite + "'>" + response[0].show.officialSite + "</a>");
      $("#results").append("<br>");
      $("#results").append("<button class='btn btn-info'>Add to Watchlist</button>");
      $("#results").append("<button class='btn btn-info' id='episodes-btn'>Episodes</button>"); 
      $("#episodes-btn").click(function() {
        var showID = response[0].show.id;
        var episodesQuery = "http://api.tvmaze.com/shows/" + showID + "/episodes";
        console.log("button clicked - get ID# " + showID);
        $.ajax({
          url: episodesQuery,
          method: "GET"
        }).done(function(data) {
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            $("#episode-results").append("<h2>" + data[i].name + "</h2>");
          }
          
        });
      }); 
    });

     
  });

});
