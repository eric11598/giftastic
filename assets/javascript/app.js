var apikey = "AaROGpXAVa6N2SXY303PGYqP8HOkMNmo";

function encodeQueryData(data)
{
   var ret = [];
   for (var d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
   return ret.join("&");
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


function getGif(query) {
  console.log(query);
  query = query.replace(' ', '+');
  var params = { 'api_key': apikey, 'q': query};
  params = encodeQueryData(params);

  

  httpGetAsync('http://api.giphy.com/v1/gifs/search?' + params, function(data) {
    var gifs = JSON.parse(data);
    

    var random = Math.floor(Math.random() * 24) + 1  
    var targetgif = gifs.data[random].images.fixed_width.url;
    $('#timerText').append($("<br>"));
    $('#timerText').append($('<img>',{id:'gif',src: targetgif}));

  });

  
}

var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// Function for displaying movie data
function renderButtons() {

  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#gifsContainer").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("movie");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", movies[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(movies[i]);
    // Adding the button to the HTML
    $("#gifsContainer").append(a);
  }
}
function displayMovieInfo() {

    var gifs = $(this).attr("data-name");
    console.log(gifs);
}

// This function handles events where one button is clicked
$("#submit").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var movie = $("#addGif").val().trim();
  // The movie from the textbox is then added to our array
  movies.push(movie);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});

$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();

