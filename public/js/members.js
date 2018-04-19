

$(document).ready(function() {

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.name);
    });

    // Display today's day
    getDay();

    // Display show info on search button click
    $(".searchTV").on("click", function(event) {
      searchBar();
    });

});  // End document ready

// ===============
// FUNCTIONS
// ===============

function searchBar() {
  event.preventDefault();

    // clear show info 
    $("#episode-results").empty();

    // This line grabs the input from the textbox
    var show = $(".tv-input").val().trim();

    // API get show info query
    var showInfoQuery = "http://api.tvmaze.com/search/shows?q=" + show + "&embed=episodes";

    $.ajax({
      url: showInfoQuery,
      method: "GET"
    }).done(function(response) {
      console.log(response[0].show);
      $(".tv-input").val("");
      $("#show-img").html("<img src='" + response[0].show.image.medium + "' alt='Show Poster'>");
      $("#show-title").text(response[0].show.name);
      $("#show-description").html("<p>" + response[0].show.summary + "</p>");
      $("#network").html("<p><strong>Network: </strong>" + response[0].show.network.name + "</p>");
      $("#genre").html("<p><strong>Genre: </strong>" + response[0].show.genres + "</p>");
      $("#results").html("<p>" + response[0].show.schedule.days + " " + response[0].show.schedule.time + "</p>");
      $("#premiere").html("<p><strong>Premiere Date: </strong>" + response[0].show.premiered + "</p>");
      $("#results").html("<p>" + response[0].show.status + "</p>");
  
      // if the show has an external site display link
      if(response[0].show.officialSite !== null) {
        $("#site-link").html("<a target='_blank' href='" + response[0].show.officialSite + "'>" + response[0].show.officialSite + "</a>");
      // else display nothing
      } else {
        $("#site-link").empty();
      }

      // If show is on air display "Add to watchlist" button
      if (response[0].show.status == "Running") {
        $(".watchlist-btn").html("<a class='btn btn-outline-warning add-to-watchlist-btn'>Add to Watchlist</a>");
      // else display nothing
      } else {
        $(".watchlist-btn").empty();
      }



      getSeasons();

        function getSeasons() {
          var showID = response[0].show.id;
          var seasonsQuery = "http://api.tvmaze.com/shows/" + showID + "/seasons";

          $.ajax({
            url: seasonsQuery,
            method: "GET"
          }).done(function(seasons) {
            console.log(seasons);

            for (var i = 0; i < seasons.length; i++) {
              var seasonID = seasons[i].id;
              console.log(seasonID);
              $("#season-btns").append("<button class='btn btn-warning season-btn' id='" + i + "' data-id='" + seasonID + "'>Season: " + seasons[i].number + "</button>");

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
            } // End for loop
          }); // End seasonsQuery Ajax call
        } // End getSeasons function

    }); // End getShow Ajax call
} // End searchBar function

// Get the current day and display on the page
function getDay() {
  let day;
  switch (new Date().getDay()) {
      case 0:
          day = "Sunday";
          break;
      case 1:
          day = "Monday";
          break;
      case 2:
          day = "Tuesday";
          break;
      case 3:
          day = "Wednesday";
          break;
      case 4:
          day = "Thursday";
          break;
      case 5:
          day = "Friday";
          break;
      case 6:
          day = "Saturday";
          break;
      default:
  }
  console.log(day);
  $("#time").html("<p>Today is " + day + "</p>");
};
