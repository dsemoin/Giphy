    // create topics
 var topics =["chemistry","chemical reactions", "periodic table", "chemical bonding", "atoms"];
    //this adds to topic to the navbar when a search occurs
 function findNewTopic(topic){
    // this clears the old search and only displays the new one.
    $("#images").empty();
    //api key
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topic + "&api_key=yHnoNQjuXnKump88riakNpJIxijkF5JD&limit=10";
    //this is to get the api to work
      $.ajax({
      url: queryURL,
      method: "GET"
    //this tells javascript to show the response after the ajax call
 }).then(function(response) {
      console.log(response);
      var results = response.data;
  
  //this displays the results from the api key
 for (var i = 0; i < results.length; i++) {
     var topicDiv = $("<div class='item'>");
     var p = $("<p>").text("Rating: " + results [i].rating);
     var topicImage = $("<img>");
     topicImage.attr("src", results[i].images.fixed_height.url);
    // this makes the data still and animate
     topicImage.attr("data-still", results[i].images.fixed_height_still.url);
     topicImage.attr("data-animate", results[i].images.fixed_height.url); 
     topicImage.attr("class", "gif");
     topicImage.attr("data-state", "animate");
     $(topicImage).on("click", function() {
    //this stops and plays the gifs
  var state = $(this).attr('data-state');
  if  (state === "still"){
      $(this).attr('src', $(this).attr("data-animate"));
      $(this).attr('data-state', 'animate');
  }
  else {
      $(this).attr('src', $(this).attr("data-still"));
      $(this).attr('data-state', 'still');
  }
  });
    //this adds the images to the page
      topicDiv.append(p);
      topicDiv.append(topicImage);
      $("#images").prepend(topicDiv);
      }
  })
    
}

 //  create for loop function to create buttons
 topics.forEach(function(topic){
 var newButton = $("<button/>",  
 {
     text: topic,
     class: 'btn btn-primary topic',
     //gives an attribute to use in Ajax call
     "data-name": topic
 });
 $("#buttons").append(newButton);
 });
 
 
 //create function to get data when button is clicked
$(".topic").on("click", function() {
     //this empties the previous button once a new button is clicked.
        
     //data-name is assigned as attribute to each topic
        var topic = $(this).attr("data-name");
        findNewTopic(topic);
        
});

$('#searchButton').click(function () {
    var newTopic = $('#searchText').val();
    findNewTopic(newTopic);
    var newButton = $("<button/>",  
    {
        text: newTopic,
        class: 'btn btn-primary topic',
        //gives an attribute to use in Ajax call
        "data-name": newTopic
    });
    $("#buttons").append(newButton);
  
});