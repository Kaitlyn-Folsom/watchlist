$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    console.log("user data function");
  });



  // This function handles events where a movie button is clicked
  $(".searchTV").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var show = $(".tv-input").val().trim();
    var queryURL = "http://api.tvmaze.com/search/shows?q=" + show;

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
    });
  });

});
