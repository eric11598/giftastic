$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

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
  console.log("lol"+query);
  query = query.replace(' ', '+');
  var params = { 'api_key': apikey, 'q': query};
  params = encodeQueryData(params);

  

    httpGetAsync('https://api.giphy.com/v1/gifs/search?' + params, function(data) {
    var gifs = JSON.parse(data);
    

    var amountGifs = 10;

    console.log(gifs.data);
    
    for (i = 0; i<amountGifs; i++)
    {

      if(gifs.data[i].images.fixed_height.width < 150)
      {
        amountGifs++;
        //i++;
      }
      else
      {
        var targetgif = gifs.data[i].images.fixed_height.url;
        console.log(gifs.data[i].images.fixed_height.width);

        var divname = gifs.data[i].id;


        jQuery('<div/>', {
          id: divname,
          class: 'gifContainer',
        }).appendTo('#gifContainer');

        jQuery('<div/>', {
          id: divname+'overlay',
          class: 'overlay',
          text: 'hi',
          onclick: "off()",
        }).appendTo('#'+divname);

        jQuery('<img/>', {
          id: divname +'Image',
          class: 'gif',  
          src: targetgif,
        }).appendTo('#'+divname);

        jQuery('<button/>', {
        id: divname +'Download',
        class: 'btn btn-secondary btn-sm',
        text: 'Download',  
        }).appendTo('#'+divname);

        jQuery('<button/>', {
          id: divname +'Favorite',
          class: 'btn btn btn-info btn-sm',
          text: 'Favorite',  
        }).appendTo('#'+divname);

        jQuery('<button/>', {
          id: divname +'Info',
          class: 'btn btn-warning btn-sm',
          text: 'Info',  
        }).appendTo('#'+divname);

        


        $('#'+divname+"Download").click(function(e) {

        });

        $('#'+divname+"Info").click(function(e) {
          
          var temp = (this.id).substring(0, this.id.length-4);
          console.log("#"+temp+"overlay");
          document.getElementById(temp+"overlay").style.display = "block";
        });

        $('#'+divname+"Favorite").click(function(e) {
          
          console.log(this.id);
          var temp = (this.id).substring(0, this.id.length-8);
          console.log("#"+temp);
          $("#"+temp).appendTo("#favoriteContainer");
        });

        


      }
    /*
      
      function on() {
        document.getElementById(divname+"overlay").style.display = "block";
      }
      
      function off() {
        document.getElementById(divname+"overlay").style.display = "none";


      $('#gifContainer').append($('<img>',{id:'gif',src: targetgif}));

      
      $(divname).attr('data-toggle', 'tooltip');
      //$("#gifContainer").attr('data-toggle', 'tooltip');
      $(divname).append($('<h2>',{id:'rating',src: gifs.data[i].rating}));

      $("#gifContainer").append(divname);*/
      
    }

  });

  
}


var games = ["Deus Ex", "Metal Gear Solid", "Borderlands", "Counter-Strike"];

// Function for displaying movie data
function renderButtons() {

  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttonContainer").empty();

  // Looping through the array of movies
  for (var i = 0; i < games.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("btn btn-success");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", games[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(games[i]);
    // Adding the button to the HTML
    $("#buttonContainer").append(a);
  }
}
function displayGif() {

    console.log("YOU ARE HERE NOW GAYBOY");
    var gifs = $(this).attr("data-name");
    getGif(gifs);
}

// This function handles events where one button is clicked
$("#submit").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var game = $("#addGif").val().trim();
  // The movie from the textbox is then added to our array
  games.push(game);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});

$(document).on("click", ".btn-success", displayGif);

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();


