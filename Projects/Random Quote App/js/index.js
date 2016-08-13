var randomQuoteIndex;

$( document ).ready(function() {
  getQuote();
});

function getRandomIndex(){
  randomQuoteIndex = Math.floor( Math.random() * 40 );
}

function getQuote() {
  getRandomIndex();
  $.getJSON("https://crossorigin.me/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40&callback=", function(data) {
    if ((data[randomQuoteIndex].content.length + data[randomQuoteIndex].title.length) <= 250){
      $("#quote-body").html(data[randomQuoteIndex].content);
      $("#quote-author").html("-" + data[randomQuoteIndex].title);
      selectColor();
    } else {
      getQuote();
    }
  });
}

$("#new-quote-button").click(function() {
  getQuote();
});

$("#tweet-button").click(function() {
  var currentQuote = '"' + $("#quote-body").text() + '" ' + $("#quote-author").text();
  window.open("https://twitter.com/intent/tweet?text=" + currentQuote);
});

//Color array and random selection function
var colorList = new Array("#226764", "#679B99", "#0D4D4B", "#2E4372", "#7788AA", "#AA8439", "#805B15", "#AA6B39");

var selectedColor = "";
function selectColor() {
  selectedColor = colorList[Math.floor(Math.random() * colorList.length)];
  $("#outer").css("background-color", selectedColor);
  $("#quote-div").css("color", selectedColor);
  $(".btn").css("background-color", selectedColor);
}