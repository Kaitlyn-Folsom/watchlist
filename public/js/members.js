$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.name);
  });

  // This function handles events where a movie button is clicked
  $(".searchTV").on("click", function(event) {
    event.preventDefault();
    $("#episode-results").empty();
    // This line grabs the input from the textbox
    var show = $(".tv-input").val().trim();
    var showInfoQuery = "http://api.tvmaze.com/search/shows?q=" + show + "&embed=episodes";

    $.ajax({
      url: showInfoQuery,
      method: "GET"
    }).done(function(response) {
      console.log(response[0].show);
      $("#results").html("<h2>" + response[0].show.name + "</h2>");
      $("#results").append("<img src='" + response[0].show.image.medium + "'>");
      $("#results").append("<p>" + response[0].show.summary + "</p>");
      $("#results").append("<p>Network: " + response[0].show.network.name + "</p>");
      $("#results").append("<p>Genre: " + response[0].show.genres + "</p>");
      $("#results").append("<p>" + response[0].show.schedule.days + " " + response[0].show.schedule.time + "</p>");
      $("#results").append("<p>Premiere Date: " + response[0].show.premiered + "</p>");
      $("#results").append("<p>" + response[0].show.status + "</p>");
      
      if(response[0].show.officialSite !== null) {
        $("#results").append("<a target='_blank' href='" + response[0].show.officialSite + "'>" + response[0].show.officialSite + "</a>");
      } else {

      }
     
      $("#results").append("<br>");
      $("#results").append("<button class='btn btn-info'>Add to Watchlist</button>");

      var showID = response[0].show.id;
      var seasonsQuery = "http://api.tvmaze.com/shows/" + showID + "/seasons";
        $.ajax({
          url: seasonsQuery,
          method: "GET"
        }).done(function(data) {
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            var seasonID = data[i].id;
            console.log(seasonID);
            $("#episode-results").append("<button class='btn btn-info season-btn' id='" + i + "' data-id='" + seasonID + "'>Season: " + data[i].number + "</button>");

            

            var seasonBtn = $("#" + i);

            seasonBtn.click(function() {
              var seasonBtnID = $(this).attr("data-id");
              var episodesQuery = "http://api.tvmaze.com/seasons/" + seasonBtnID + "/episodes"; //number must be seasonID
              $.ajax({
                url: episodesQuery,
                method: "GET"
              }).done(function(episodes) {
                console.log(episodes);
                for (var i = 0; i < episodes.length; i++) {
                  $("#episodes").append("<p>" + episodes[i].name + "</p>");
                }
                
              });
              
            });
          }
        });
    });

  });

});
