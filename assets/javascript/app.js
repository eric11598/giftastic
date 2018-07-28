$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

var apikey = "AaROGpXAVa6N2SXY303PGYqP8HOkMNmo";

function off(div) {
  document.getElementById(div).style.display = "none";
}



function stop(div) {

  var state = $(div).attr("data-state");

  if (state === "still") 
  {
    $(div).attr("src", $(div).attr("data-animate"));
    $(div).attr("data-state", "animate");
  } 
  else 
  {
    $(div).attr("src", $(div).attr("data-still"));
    $(div).attr("data-state", "still");
  }
};

function favorite(div) {
  console.log(div);
  var temp = '#'+(div).substring(0, div.length-8);
  $(div).appendTo("#favoriteContainer");
  $(temp).appendTo("#favoriteContainer");
}




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
          amountGifs++;
          
        else
        {
          var targetgif = gifs.data[i].images.fixed_height.url;
          console.log(gifs.data[i].images.fixed_height.width);

          var divname = gifs.data[i].id;


          

          $('<div/>', {
            id: divname,
            class: 'gifContainer',
          }).appendTo('#gifContainer');

          $('<div/>', {
            id: divname+'overlay',
            class: 'overlay',
            text: 'hi',
            onclick: "off(this.id)",
          }).appendTo('#'+divname);

          $('<img/>', {
            id: divname +'Image',
            'data-still': gifs.data[i].images.fixed_height_still.url,
            'data-animate': targetgif,
            'data-state': "still",
            class: 'gif',
            onclick: "stop(this)",  
            src: gifs.data[i].images.fixed_height_still.url,
          }).appendTo('#'+divname);


          $('<button/>', {
            id: divname +'Favorite',
            class: 'btn btn btn-info btn-sm',
            text: 'Favorite',
            onclick: "favorite(this.id)",  
          }).appendTo('#'+divname);

          $('<button/>', {
            id: divname +'Info',
            class: 'btn btn-warning btn-sm',
            text: 'Info', 
          }).appendTo('#'+divname);

          
        


          $('#'+divname+"Download").click(function(e) {

          });

          $('#'+divname+"Info").click(function(e) {
            var gifIndex;
            var temp = (this.id).substring(0, this.id.length-4);

            for(i=0; i < gifs.data.length; i++)
            {
              console.log(gifs.data[i].id +"=="+temp);
              if(gifs.data[i].id === temp)
                gifIndex = i;
            }
            document.getElementById(temp+'overlay').style.display = "block";
            $('#'+temp+'overlay').text('Name: '+gifs.data[gifIndex].title);
            $('#'+temp+'overlay').append('<br> Rating: '+gifs.data[gifIndex].rating);
            $('#'+temp+'overlay').append('<br> ID: '+gifs.data[gifIndex].id);
            $('#'+temp+'overlay').append('<br> Url: '+gifs.data[gifIndex].bitly_gif_url);
            $('#'+temp+'overlay').append('<br> Source: '+gifs.data[gifIndex].source);


            
            console.log(gifs.data[gifIndex].title); 
          });

        }
   
    }

  });

  
}


var games = ["Deus Ex", "Metal Gear Solid", "Borderlands", "Counter-Strike"];


function renderButtons() {


  $("#buttonContainer").empty();

  
  for (var i = 0; i < games.length; i++) {

   
    var a = $("<button>");
    a.addClass("btn btn-success");
    a.attr("data-name", games[i]);
    a.text(games[i]);
    $("#buttonContainer").append(a);
  }
}
function displayGif() {

    var gifs = $(this).attr("data-name");
    getGif(gifs);
}

$("#submit").on("click", function(event) {

  event.preventDefault();

  var game = $("#addGif").val().trim();

  games.push(game);

  renderButtons();
});

$(document).on("click", ".btn-success", displayGif);

renderButtons();


