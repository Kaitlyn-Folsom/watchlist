$(document).ready(function() {

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.name);
  });
  
  var allShowsQuery = "http://api.tvmaze.com/shows";

  $.ajax({
    url: allShowsQuery,
    method: "GET"
  }).done(function(shows) {
    console.log(shows);

    for (var i = 0; i < shows.length; i++) {
      var showID = shows[i].id;
      // console.log(shows[i]);
      // $("#shows-list").append("<p id=" + i + ">" + shows[i].name + "</p>");

      $("#shows-list").append("<p id=" + i + " data-id='" + showID + "'>" + shows[i].name +"</p>");

      var showLink = $("#" + i);
        
      $(showLink).click(function() {
        var episodeLinkID = $(this).attr("data-id");
        console.log("ID clicked: " + showID);
        // console.log(showID);
        var showInfo = "http://api.tvmaze.com/shows/" + episodeLinkID;
        console.log("hitting function");
        $.ajax({
          url: showInfo,
          method: "GET"
        }).done(function(showInfo) {
          console.log(showInfo);
        });
      });
    };
  });

});
