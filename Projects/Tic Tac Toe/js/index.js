//Initialize the variables
var computerChoiceIndex;
var computerChoice;
var playerChoice;
var playerChoiceIndex;
var playerIsX = false;
var fillCount = 1;
var gameOver = false;
var winBoard = [
  {box: "box-1-1", value: ""},
  {box: "box-1-2", value: ""},
  {box: "box-1-3", value: ""},
  {box: "box-2-1", value: ""},
  {box: "box-2-2", value: ""},
  {box: "box-2-3", value: ""},
  {box: "box-3-1", value: ""},
  {box: "box-3-2", value: ""},
  {box: "box-3-3", value: ""},
];
//End initialize the variables

//Computer choice function
function computerChoose() {
  if (gameOver == false){
    computerChoiceIndex = Math.floor( Math.random() * winBoard.length );
    if (winBoard[computerChoiceIndex].value == ""){
      console.log("Computer choice: " + winBoard[computerChoiceIndex].box);

      if (playerIsX == false){
        winBoard[computerChoiceIndex].value = "X";
      } else {
        winBoard[computerChoiceIndex].value = "O";
      }

      console.log(winBoard);
      outputToHTML(winBoard[computerChoiceIndex].box, computerChoiceIndex, undefined, true);
      winCheck();
      fillCount++;

    } else {
      computerChoose();
    }
  }
}
//End computer choice function

//Player choice function
function playerChoose(playerChoiceIndex) {
  console.log("Player choice: " + winBoard[playerChoiceIndex].box);
  
  if (winBoard[playerChoiceIndex].value == "") {
      if (playerIsX){
        winBoard[playerChoiceIndex].value = "X";
      } else {
        winBoard[playerChoiceIndex].value = "O";
      }

    console.log(winBoard);
    outputToHTML(winBoard[playerChoiceIndex].box, playerChoiceIndex);
    winCheck();
    fillCount++;

    computerChoose();
  }
}
//End player choice function

//Initial X or O selection
$( "#x-button" ).click(function() {
  console.log("Player chose X.");
  playerIsX = true;
  $(".ticbox").show("fast");
  $("#selectors-row").hide("fast");
  computerChoose();
});

$( "#o-button" ).click(function() {
  console.log("Player chose O.");
  $(".ticbox").show("fast");
  $("#selectors-row").hide("fast");
  computerChoose();
});
//End initial X or O selection

//Output the player moves to the HTML/display
function outputToHTML(winBoardBox, winBoardIndex, override, isComputer){
  if (override !== undefined){
    $("#" + winBoardBox).html(override);
  } else {
    if (isComputer == true){
      $("#" + winBoardBox).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).html(winBoard[winBoardIndex].value);
    } else {
      $("#" + winBoardBox).html(winBoard[winBoardIndex].value);
    }
  }
}
//End HTML/display output

//Win checker
function winCheck(){
  console.log("Fill count: " + fillCount);
  var xOrO = ["X", "O"];
  for (i = 0; i < xOrO.length; i++){
    var currentCheck = xOrO[i];
    
      //First row horizontal match
    if (winBoard[0].value == currentCheck && winBoard[1].value == currentCheck && winBoard[2].value == currentCheck){
      console.log("Match 1");
      $("#box-1-1, #box-1-2, #box-1-3").addClass("winning-boxes");
      winInform(currentCheck);
      //Second row horizontal match
    } else if (winBoard[3].value == currentCheck && winBoard[4].value == currentCheck && winBoard[5].value == currentCheck){
      console.log("Match 2");
      $("#box-2-1, #box-2-2, #box-2-3").addClass("winning-boxes");
      winInform(currentCheck);
      //Third row horizontal match
    } else if (winBoard[6].value == currentCheck && winBoard[7].value == currentCheck && winBoard[8].value == currentCheck){
      console.log("Match 3");
      $("#box-3-1, #box-3-2, #box-3-3").addClass("winning-boxes");
      winInform(currentCheck);
      //First column vertical match
    } else if (winBoard[0].value == currentCheck && winBoard[3].value == currentCheck && winBoard[6].value == currentCheck){
      console.log("Match 4");
      $("#box-1-1, #box-2-1, #box-3-1").addClass("winning-boxes");
      winInform(currentCheck);
      //Second column vertical match
    } else if (winBoard[1].value == currentCheck && winBoard[4].value == currentCheck && winBoard[7].value == currentCheck){
      console.log("Match 5");
      $("#box-1-2, #box-2-2, #box-3-2").addClass("winning-boxes");
      winInform(currentCheck);
      //Third column vertical match
    } else if (winBoard[2].value == currentCheck && winBoard[5].value == currentCheck && winBoard[8].value == currentCheck){
      console.log("Match 6");
      $("#box-1-3, #box-2-3, #box-3-3").addClass("winning-boxes");
      winInform(currentCheck);
      //First diagonal match
    } else if (winBoard[0].value == currentCheck && winBoard[4].value == currentCheck && winBoard[8].value == currentCheck){
      console.log("Match 7");
      $("#box-1-1, #box-2-2, #box-3-3").addClass("winning-boxes");
      winInform(currentCheck);
      //Second diagonal match
    } else if (winBoard[2].value == currentCheck && winBoard[4].value == currentCheck && winBoard[6].value == currentCheck){
      console.log("Match 8");
      $("#box-1-3, #box-2-2, #box-3-1").addClass("winning-boxes");
      winInform(currentCheck);
    } else if (fillCount == 9){
      console.log("Draw");
      winInform(undefined, true);
    }
  }
}
//End win checker

/*Needs to be:
Any of the previous win conditions are not met AND all the boxes have values
*/

//Win celebrate!
function winInform (letterWon, isDraw){
  gameOver = true;
  if (isDraw == undefined){
  //Win 1
    if (letterWon == "X" && playerIsX == true){
      $("#win-celebrate").html("You won!");
      $("#win-celebrate").show("fast");
      console.log("Win 1");
      setTimeout(resetBoard(), 1000);
    //Win 2
    } else if (letterWon == "X" && playerIsX == false){
      $("#win-celebrate").html("You lost :/");
      $("#win-celebrate").show("fast");
      console.log("Win 2");
      setTimeout(resetBoard(), 1000);
    //Win 3
    } else if (letterWon == "O" && playerIsX == false){
      $("#win-celebrate").html("You won!");
      $("#win-celebrate").show("fast");
      console.log("Win 3");
      setTimeout(resetBoard(), 1000);
    //Win 4
    } else if (letterWon == "O" && playerIsX == true){
      $("#win-celebrate").html("You lost :/");
      $("#win-celebrate").show("fast");
      console.log("Win 4");
      setTimeout(resetBoard(), 1000);
    }
  } else {
      $("#win-celebrate").html("Draw!");
      $("#win-celebrate").show("fast");
      setTimeout(resetBoard(), 1000);
  }
}
//End win celebrate

//Reset the board
function resetBoard(){
  return function(){
    for (i = 0; i < winBoard.length; i++){
      $("#" + winBoard[i].box).removeClass("winning-boxes");
      gameOver = false;
      winBoard[i].value = "";
      playerIsX = false;
      fillCount = 0;
      outputToHTML(winBoard[i].box, i, "&nbsp;");
      $("#win-celebrate").hide("slow");
      $(".ticbox").hide("fast");
      $("#selectors-row").show("fast");
    }
  }
}
//End reset the board

//Player button click handler
$("#box-1-1").click(function() {
  playerChoose(0);
});
$("#box-1-2").click(function() {
  playerChoose(1);
});
$("#box-1-3").click(function() {
  playerChoose(2);
});
$("#box-2-1").click(function() {
  playerChoose(3);
});
$("#box-2-2").click(function() {
  playerChoose(4);
});
$("#box-2-3").click(function() {
  playerChoose(5);
});
$("#box-3-1").click(function() {
  playerChoose(6);
});
$("#box-3-2").click(function() {
  playerChoose(7);
});
$("#box-3-3").click(function() {
  playerChoose(8);
});
//End player button click handler