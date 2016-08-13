/*Chrome now has issues with cross origin HTTP/S requests.
To compensate, this script determines if the user is accessing the site via HTTP or HTTPS.
If HTTPS, the geolocation request must go through another server, crossorigin.me, which will make it work.
If HTTP, the location will be pulled from the user's IP. This is less accurate than the geolocation request as above, but it will function without the user needing to change the URL string to HTTPS.
*/
function httpsLocationURL() {
    navigator.geolocation.getCurrentPosition(function(position) {
    var latitudeGEO = position.coords.latitude;
    var longitudeGEO = position.coords.longitude;

    //Construct the necessary OpenWeather URL
    var weatherURL1 = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=';
    var weatherURL2 = '&lon=';
    var weatherURL3 = '&APPID=4bee96f340bd4c16c3b476b8848df9ae';
    var weatherURL = weatherURL1 + latitudeGEO + weatherURL2 + longitudeGEO + weatherURL3;
    console.log('HTTPS URL was constructed. applyWeatherInformation function is next.');
    console.log('Constructed URL: ' + weatherURL);

    applyWeatherInformation(weatherURL);
});
}

function httpLocationURL() {
    $.getJSON('http://ip-api.com/json', function(data) {
    
    //Alert the user that they are using HTTP, which may be less accurate
    $("#http-alert-message").show().delay(6000).fadeOut();
    
    //Log the JSON data
    console.log(data);
      
    var latitudeIP = data.lat;
    var longitudeIP = data.lon;
    console.log('User longitude: ' + longitudeIP);
    console.log('User latitude: ' + latitudeIP);

    //Construct the necessary OpenWeather URL
    var weatherURL1 = 'http://api.openweathermap.org/data/2.5/weather?lat=';
    var weatherURL2 = '&lon=';
    var weatherURL3 = '&APPID=4bee96f340bd4c16c3b476b8848df9ae';
    var weatherURL = weatherURL1 + latitudeIP + weatherURL2 + longitudeIP + weatherURL3;
    console.log('HTTP URL was constructed. applyWeatherInformation function is next.');
    console.log('Constructed URL: ' + weatherURL);

    applyWeatherInformation(weatherURL);
  });
}

if ("https:" == document.location.protocol) {
  httpsLocationURL();
} else if ("http:" == document.location.protocol) {
  httpLocationURL();
}

/*************
This function pulls the JSON information.
*************/
function applyWeatherInformation(weatherURL) {
  console.log('applyWeatherInformation function called. getJSON is next.');
  //Get OpenWeather JSON data and apply to HTML
  $.getJSON(weatherURL, function(weatherCall) {

    /*Error handling, mostly for explicit search.
    If the API doesn't return a city name, it's safe to assume it can't find one matching the search value.
    This code will unhide the previous search results, show an error message, and stop the function.
    */
    if (weatherCall.name == undefined) {
      $('.to-toggle').show(150, "swing");
      $("#search-error-message").show().delay(6000).fadeOut();
      return;
    }

    //Convert temperatures from Kelvin to Fahrenheit and Celsius
    var tempF = (((weatherCall.main.temp * 1.8) - 459.67).toFixed(1));
    var tempC = (((weatherCall.main.temp) - 273.15).toFixed(1));

    console.log('getJSON called. jQuery updates are next.');
    console.log(weatherCall);
    //Make relevant JSON information more readable
    var userCity = weatherCall.name;
    var userCountry = weatherCall.sys.country;
    var conditionDesc = weatherCall.weather[0].description;
    var conditionCode = weatherCall.weather[0].id;
    var iconCode = weatherCall.weather[0].icon;

    //fadeOut loading message
    $('#loading').fadeOut(25);

    //Apply information to HTML and show elements with animation
    $('#city-name').html('<p>' + userCity + ', ' + userCountry + '</p>').show(150, "swing");
    $('#unit-change').html('<p class="temperature">' + tempF + '<strong>°F</strong<></p>').show(150, "swing");
    $('#condition').html('<p>' + conditionDesc + '</p>').show(150, "swing");
    $('#condition-icon').html('<img class = "expand" src = "http://openweathermap.org/img/w/' + iconCode + '.png">').show(150, "swing");

    $('#main-title').show(150, "swing");
    $('#attribute').show(150, "swing");
    $('#search').show(150, "swing");

    //Temperature unit change button handler
    var isF = true;
    $("#unit-change").on("click", function() {
      if (isF) {
        $('#unit-change').html('<p class="temperature">' + tempC + '<strong>°C</strong></p>');
        isF = false;
        console.log('Temperature is currently displayed in Celsius.');
      } else {
        $('#unit-change').html('<p class="temperature">' + tempF + '<strong>°F</strong></p>');
        isF = true;
        console.log('Temperature is currently displayed in Fahrenheit.');
      }
    });

    //Weather background changer
    if (conditionCode >= 200 && conditionCode <= 232) {
      $('#outer').css('background-image', 'url("https://s32.postimg.org/edyc7gjk5/tstorm.jpg")');
    } else if (conditionCode >= 300 && conditionCode <= 321) {
      $('#outer').css('background-image', 'url("https://s32.postimg.org/t631ysphh/lightrain.jpg")');
    } else if (conditionCode >= 500 && conditionCode <= 531) {
      $('#outer').css('background-image', 'url("https://s32.postimg.org/41c1ldq11/rain.jpg")');
    } else if (conditionCode >= 600 && conditionCode <= 622) {
      $('#outer').css('background-image', 'url("https://s32.postimg.org/agb2i1wqt/snow.jpg")');
    } else if (conditionCode == 800) {
      $('#outer').css('background-image', 'url("https://s32.postimg.org/q9g0yijnp/clearsky.jpg")');
    } else if (conditionCode >= 801 && conditionCode <= 804) {
      $('#outer').css('background-image', 'url("https://s32.postimg.org/xqp8dq96t/cloudy.jpg")');
    }

  });
}

//Reusable code for an explicit search
function explicitSearch() {
  //Hide the previous weather result
  $('.to-toggle').hide(150, "swing");
  
  var searchValue = document.getElementById('search-value').value;
  console.log('String value click');
  
  var weatherURL = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=' + searchValue + '&APPID=4bee96f340bd4c16c3b476b8848df9ae';
  console.log('Search URL is ' + weatherURL);
  
  //Clear out the input field upon button click
  $('input[type="text"]').val('');

  applyWeatherInformation(weatherURL);
}

//Click handler for explicit search button
$('#search-button').click(explicitSearch);

//Send enter key to explicit search button click handler
$('#search').keypress(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if (code == 13) {
    $('#search-button').click();
  }
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