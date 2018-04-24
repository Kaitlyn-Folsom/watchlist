
$(document).ready(function() {

  getUserData();
  
  getAllShows();


});

// ===============
// FUNCTIONS
// ===============

function getUserData() {
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.name);
  });
}

function getAllShows() {
  var allShowsQuery = "http://api.tvmaze.com/shows";

  $.ajax({
    url: allShowsQuery,
    method: "GET"
  }).done(function(shows) {

    // sorting all shows alphabetically by title name
    shows.sort(function(a, b){
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });

    console.log(shows);
  
    for (var i = 0; i < shows.length; i++) {
     
      var showID = shows[i].id;

      var showGrid = $("#shows-list");
      showGrid.append("<a href='#'><h3 id='" + i + "' data-id='" + showID + "'>" + shows[i].name +"</h3><img src='" + shows[i].image.medium + "' alt='Show Poster'></a>");
      // showGrid.append("<h3 id=" + i + " data-id='" + showID + "'>" + shows[i].name +"</h3>");
      // showGrid.append("<img src='" + shows[i].image.medium + "' alt='Show Poster'>");
      // showGrid.append("</div></div>");
  
      var showLink = $("#" + i);
        
      $(showLink).click(function() {
        var episodeLinkID = $(this).attr("data-id");
        console.log("ID clicked: " + showID);
        // console.log(showID);
        var showInfo = "http://api.tvmaze.com/shows/" + episodeLinkID;
        $.ajax({
          url: showInfo,
          method: "GET"
        }).done(function(showInfo) {
          console.log(showInfo);
        });
      });
    };
  });

}
