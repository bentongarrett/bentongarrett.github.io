var operations = [];
var answer = '';
var paperTape = [];

function userInput(userNum) {
  if (operations == answer) {
    operations = [];
    operations.push(userNum);
    $("#top-operation-panel").html(operations.join('').toString());
  } else if (operations != answer) {
    operations.push(userNum);
    $("#top-operation-panel").html(operations.join('').toString());
  }
}

function solveIt(data) {
  var symbolConvert = data.join('').toString().replace('x', '*').replace('÷', '/');
  console.log('Expression to evaluate: ' + symbolConvert);
  return eval(symbolConvert);
}

$(document).ready(function() {
  //Button row 1
  //AC
  $("#ac").click(function() {
    operations = [];
    $("#top-operation-panel").html(operations.join('').toString());
    $("#main-operation-panel").html(operations.join('').toString());
  });

  //Delete
  $("#backspace").click(function() {
    operations.pop();
    $("#top-operation-panel").html(operations.join('').toString());
  });

  //Divide
  $("#divide").click(function() {
    operations.push(" ÷ ");
    $("#top-operation-panel").html(operations.join('').toString());
  });

  //Multiply
  $("#multiply").click(function() {
    operations.push(" x ");
    $("#top-operation-panel").html(operations.join('').toString());
  });

  //Button row 2
  //Seven
  $("#seven").click(function() {
    userInput(7);
  });

  //Eight click handler
  $("#eight").click(function() {
    userInput(8);
  });

  //Nine
  $("#nine").click(function() {
    userInput(9);
  });

  //Subtract
  $("#subtract").click(function() {
    operations.push(" - ");
    $("#top-operation-panel").html(operations.join('').toString());
  });

  //Button row 3
  //Four
  $("#four").click(function() {
    userInput(4);
  });

  //Five
  $("#five").click(function() {
    userInput(5);
  });

  //Six
  $("#six").click(function() {
    userInput(6);
  });

  //Add
  $("#add").click(function() {
    operations.push(" + ");
    $("#top-operation-panel").html(operations.join('').toString());
  });

  //Button row 4
  //One
  $("#one").click(function() {
    userInput(1);
  });

  //Two
  $("#two").click(function() {
    userInput(2);
  });

  //Three
  $("#three").click(function() {
    userInput(3);
  });

  //Ans button code is inside the equals button code

  //Button row 5
  //Zero
  $("#zero").click(function() {
    userInput(0);
  });

  //Decimal
  $("#decimal").click(function() {
    userInput('.');
  });

  //Equals
  $("#equals").click(function() {
    answer = solveIt(operations);
    $("#clear-paper-tape").css("display", "inline");
    $("#paper-tape-operations").append('<li>' + operations.join('') + '</li>');
    operations = [];
    $("#paper-tape-answers").append('<li>= ' + answer + '</li>');
      if (Number.isNaN(answer)) {
        answer  = '';
      } else {operations.push(answer);}
    $("#main-operation-panel").html(answer);

    $("#ans").click(function() {
      $("#top-operation-panel").html(answer);
    });
  });

  window.addEventListener("keydown", checkKeyPressed, false);
  window.addEventListener("keyup", keysReleased, false);

  function checkKeyPressed(e) {
    //Delete
    if (e.keyCode == "67") {
      operations = [];
      $("#top-operation-panel").html(operations.join('').toString());
      $("#main-operation-panel").html(operations.join('').toString());
    }
    //Delete
    if (e.keyCode == "46") {
      operations.pop();
      $("#top-operation-panel").html(operations.join('').toString());
    }
    //Divide
    if (e.keyCode == "191" || e.keyCode == "111") {
      operations.push(" ÷ ");
      $("#top-operation-panel").html(operations.join('').toString());
    }
    //Seven
    if (e.keyCode == "55" || e.keyCode == "103") {
      userInput(7);
    }
    //Eight and multiply
    if (e.keyCode == "56" || e.keyCode == "104") {
      if (e.shiftKey) {
        userInput(' x ');
      } else {
        userInput(8);
      }
    }
    if (e.keyCode == "106") {
      userInput(' x ');
    }
    //Nine
    if (e.keyCode == "57" || e.keyCode == "105") {
      userInput(9);
    }
    //Subtract
    if (e.keyCode == "189" || e.keyCode == "109") {
      operations.push(" - ");
      $("#top-operation-panel").html(operations.join('').toString());
    }
    //Four
    if (e.keyCode == "52" || e.keyCode == "100") {
      userInput(4);
    }
    //Five
    if (e.keyCode == "53" || e.keyCode == "101") {
      userInput(5);
    }
    //Six
    if (e.keyCode == "54" || e.keyCode == "102") {
      userInput(6);
    }
    //Plus
    if (e.keyCode == "187") {
      if (e.shiftKey) {
        operations.push(" + ");
        $("#top-operation-panel").html(operations.join('').toString());
      }
    }
    if (e.keyCode == "107") {
      operations.push(" + ");
      $("#top-operation-panel").html(operations.join('').toString());
    }
    //One
    if (e.keyCode == "49" || e.keyCode == "97") {
      userInput(1);
    }
    //Two
    if (e.keyCode == "50" || e.keyCode == "98") {
      userInput(2);
    }
    //Three
    if (e.keyCode == "51" || e.keyCode == "99") {
      userInput(3);
    }
    //Zero
    if (e.keyCode == "48" || e.keyCode == "96") {
      userInput(0);
    }
    //Decimal
    if (e.keyCode == "190" || e.keyCode == "110") {
      userInput('.');
    }

    if (e.keyCode == "187" || e.keyCode == "13") {
      answer = solveIt(operations);
      $("#clear-paper-tape").css("display", "inline");
      $("#paper-tape-operations").append('<li>' + operations.join('') + '</li>');
      operations = [];
      $("#paper-tape-answers").append('<li>= ' + answer + '</li>');
      if (Number.isNaN(answer)) {
        answer  = '';
      } else {operations.push(answer);}
      $("#main-operation-panel").html(answer);

      $("#ans").click(function() {
        $("#top-operation-panel").html(answer);
      });
    }
  }

});

$("#paper-tape-toggle-button").click(function() {
  $("#paper-tape").toggle();
  $("#paper-tape-true").toggle();
  $("#paper-tape-false").toggle();
});

  $("#clear-paper-tape").click(function() {
    $("#paper-tape-operations").empty();
    $("#paper-tape-answers").empty();
    $("#clear-paper-tape").css("display", "none");
  });