/*No longer necessary thanks to CrossOrigin.me: 
Give the user instructions on how to run this page if initially loaded in HTTPS*/
/*if("https:" == document.location.protocol)
	{
    $('#search-value').attr('placeholder', 'Sorry, this page does not work with HTTPS.');
    $("#https-instr").html('<img src="http://i.giphy.com/URTNdnEHmjNq8.gif">');
	}*/

$(document).ready(function() {
  
  //Introduce delay for prettier user interaction
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  //Capture button clicks and enter key, run relevant functions.
  $('#search-button').click(function() {
    $("#results-div").fadeOut(200);
    delay(function(){
      search()
    }, 200 );
  });
  $('#random-button').click(randomLink);
  $('#attribution-button').click(attributionLink);
  $('#search-value').keypress(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      $('#search-button').click();
    }
  });
  
  //Run search without user intervention/autocomplete
  $('#search-value').keyup(function() {
    delay(function(){
      $('#search-button').click();
    }, 200 );
  });

  /******
  *******
  THE SEARCH FUNCTION
  *******
  *******/
  function search() {
    //Display search div
    
    $("#results-div").html("");
    $("#results-div").fadeIn(700);
    
    //Declare user's search value for the sake of ease
    var searchValue = document.getElementById('search-value').value;
    console.log("The user's query is " + '"' + searchValue + '"');

    //Build the search URL to make the JSON query look a bit nicer
    var searchURL = ("https://crossorigin.me/http://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=" + searchValue + "&gpslimit=10&prop=pageimages%7Cpageterms&piprop=thumbnail&pithumbsize=50&pilimit=10&redirects=&wbptterms=description&format=json");
    console.log("The query URL is " + searchURL);

    //Call JSON data,
    $.ajax({
      dataType: "jsonp",
      url: searchURL,
      success: function(searchResults) {
        console.log((searchResults.query.pages).length + " search results successfully called.");

        //For each result, create a DIV and fill it with specified description and linked title
        for (i = 0; i < (searchResults.query.pages).length; i++) {
          if (searchResults.query.pages[i].terms !== undefined) {
            $("#results-div").append(
              '<div class="result text-left"><a target="_blank" href="https://en.wikipedia.org/?curid=' + searchResults.query.pages[i].pageid + '">' + '<h2>' + searchResults.query.pages[i].title + '</h2></a><p class="description">' + '\(...' + searchResults.query.pages[i].terms.description[0] + '...\)</div>'
            );
          } else {
            $("#results-div").append(
              '<div class="result text-left"><a target="_blank" href="https://en.wikipedia.org/?curid=' + searchResults.query.pages[i].pageid + '">' + '<h2>' + searchResults.query.pages[i].title + '</h2></a></div>'
            );
          }
        }
      }
    });
  }
  
  //Place Bootstrap tooltips at the bottom
  $('[data-toggle="tooltip"]').tooltip({
    placement: "bottom"
  });
  
  });

//Open random link when button pressed
function randomLink() {   
 window.open("https://en.wikipedia.org/wiki/Special:Random");
}

//Open attribution link when button pressed
function attributionLink() {
  window.open("https://www.linkedin.com/in/bentongarrett");
}

/*Generate a random Trianglify pattern and apply as background.
Thanks to qrohlf at Github for this awesome utility.
https://github.com/qrohlf/trianglify*/
var pattern = Trianglify({
        width: window.innerWidth,
        height: window.innerHeight
    });
$('body').css({
  "background-image": "url(" + pattern.png() + ")"
});

/*This removes the search box placeholder text when the field is in focus.
Conversely, it shows the placeholder when the field is not in focus.
Credit for this bit goes to Rohan Kumar at StackSocial (http://stackoverflow.com/questions/19676084/how-to-remove-placeholder-on-focus). Thanks!*/
$('input,textarea').focus(function(){
   $(this).data('placeholder',$(this).attr('placeholder'))
          .attr('placeholder','');
}) .blur(function(){
   $(this).attr('placeholder',$(this).data('placeholder'));
});