//Initialize the variables
var sessionLengthM = 25;
var remainingSessionTime = 0;
var breakLengthM = 5;
var remainingBreakTime = 0;
var sessionRunning = false;
var sessionPaused = false;
var breakRunning = false;
var breakPaused = false;
var startSessionTimer;
var startBreakTimer;

//Once the page is ready, apply the default session lengths above to the displays
$( document ).ready(function() {
  $('#session-increment-display').html(sessionLengthM);
  remainingSessionTime = sessionLengthM * 60;
  $('#break-increment-display').html(breakLengthM);
  remainingBreakTime = breakLengthM * 60;
});

/*The session timer function.*/
function sessionTimer() {
  if (remainingSessionTime == 0){
    console.log("Session timer reached 0. Beginning break, length " + breakLengthM + ".");
    clearInterval(startSessionTimer);
    remainingBreakTime = breakLengthM * 60;
    startBreakTimer = setInterval(breakTimer, 1000);
    $("#session-label").css("background-color", "");
    sessionRunning = false;
  } else {
    remainingSessionTime--;
    var remainingSessionPercentage = ((1 - (remainingSessionTime/(sessionLengthM * 60))) * 100);
    $(".progress-bar").css("width", remainingSessionPercentage + '%');
    $(".progress-bar").css("background-color", "#4CAF50");
    $("#progress-percentage").html(convertSecondsToMinutes(remainingSessionTime));
    $("#session-label").css("background-color", "#e9e9e9");
    console.log(remainingSessionPercentage.toFixed(2) + '% session time elapsed: ' + remainingSessionTime + " seconds remaining.");
    sessionRunning = true;
  }
}

/*The break timer function.*/
function breakTimer() {
  if (remainingBreakTime == 0){
    console.log("Break timer reached 0. Beginning session, length " + sessionLengthM + ".");
    clearInterval(startBreakTimer);
    remainingSessionTime = sessionLengthM * 60;
    startSessionTimer = setInterval(sessionTimer, 1000);
    $("#break-label").css("background-color", "");
    breakRunning = false;
  } else {
    remainingBreakTime--;
    var remainingBreakPercentage = ((remainingBreakTime/(breakLengthM * 60)) * 100);
    $(".progress-bar").css("width", remainingBreakPercentage + '%');
    $(".progress-bar").css("background-color", "#FFC107");
    $("#progress-percentage").html(convertSecondsToMinutes(remainingBreakTime));
    $("#break-label").css("background-color", "#e9e9e9");
    console.log((100 - remainingBreakPercentage).toFixed(2) + '% break time elapsed: ' + remainingBreakTime + " seconds remaining.");
    breakRunning = true;
  }
}

/*BEGIN Session decrement and increment button handlers*/
$("#session-decrementer").click(function() {
  if (sessionLengthM >= 2){
    sessionLengthM--;
    remainingSessionTime = sessionLengthM * 60;
    $('#session-increment-display').html(sessionLengthM);
    console.log('Session Length: ' + convertSecondsToMinutes(remainingSessionTime));
  }
});

$("#session-incrementer").click(function() {
  sessionLengthM++;
  remainingSessionTime = sessionLengthM * 60;
  $('#session-increment-display').html(sessionLengthM);
  console.log('Session Length: ' + convertSecondsToMinutes(remainingSessionTime));
});

$("#break-decrementer").click(function() {
  if (breakLengthM >= 2){
    breakLengthM--;
    remainingBreakTime = breakLengthM * 60;
    $('#break-increment-display').html(breakLengthM);
    console.log('Break Length: ' + convertSecondsToMinutes(remainingBreakTime));
  }
});

$("#break-incrementer").click(function() {
  breakLengthM++;
  remainingBreakTime = breakLengthM * 60;
  $('#break-increment-display').html(breakLengthM);
  console.log('Break Length: ' + convertSecondsToMinutes(remainingBreakTime));
});
/*END Session decrement and increment button handlers*/

/*Session button handler*/
$("#session-button").click(function() {
  $("#reset-button").prop("disabled",false);
  /*Option 1*/ if (sessionRunning == false && breakRunning == false && breakPaused == false && sessionPaused == false){
    startSessionTimer = setInterval(sessionTimer, 1000);
    console.log('Option 1 session started.');
    sessionRunning = true;
    $("#session-button").html("Pause");
  } /*Option 2*/ else if (sessionRunning == false && breakRunning == true){
    clearInterval(startBreakTimer);
    breakRunning = false;
    breakPaused = true;
    $("#session-button").html("Resume");
    console.log('Option 2 break paused.');
  } /*Option 3*/ else if (sessionRunning == true && breakRunning == false){
    clearInterval(startSessionTimer);
    sessionRunning = false;
    sessionPaused = true;
    $("#session-button").html("Resume");
    console.log('Option 3 session paused.');
  } /*Option 4*/else if (sessionPaused == false && breakPaused == true){
    startBreakTimer = setInterval(breakTimer, 1000);
    breakPaused = false;
    $("#session-button").html("Pause");
    console.log('Option 4 break resumed.');
  } /*Option 5*/else if (sessionPaused == true && breakPaused == false){
    startSessionTimer = setInterval(sessionTimer, 1000);
    sessionPaused = false;
    $("#session-button").html("Pause");
    console.log('Option 5 session resumed.');
  }
});

//Reset button handler
$("#reset-button").click(function() {
  console.log("Reset requested.")
  clearInterval(startSessionTimer);
  clearInterval(startBreakTimer);
  sessionRunning = false;
  breakRunning = false;
  sessionPaused = false;
  breakPaused = false;
  $("#session-label").css("background-color", "");
  $("#break-label").css("background-color", "");
  $(".progress-bar").css("width", "0%");
  $("#progress-percentage").html("");
  //var sessionLengthM = 25;
  //var breakLengthM = 5;
  remainingSessionTime = sessionLengthM * 60;
  remainingBreakTime = breakLengthM * 60;
  $('#session-increment-display').html(sessionLengthM);
  $('#break-increment-display').html(breakLengthM);
  $("#session-button").html("Start");
  $("#reset-button").prop("disabled",true);
});

/*Convert seconds into a more readable format. Credit for this bit goes to Gumbo at Stack Overflow. Thanks!
http://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds*/
function convertSecondsToMinutes(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;

  function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  var finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
  return finalTime;
}