var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// TRIGGER FUNCTION
function nextSequence() {

  level++;
  userClickedPattern = [];
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(50).fadeIn(50);

  playSound(randomChosenColour);
}


// BUTTON FUNCTION
$(".btn").on("click", function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
});


// PLAY SOUND
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// ANIMATION FUNCTION
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}



// GAME STARTS FOR THE FIRST TIME
var level = 0;
var flag = false;

$(document).keypress(function(event) {
  if (!flag) {
    flag = true;
    nextSequence();
  }
  $("h2").text("");
});


// CHECK WINNING CONDITION
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    var count = 0;

    for (var i = 0; i < gamePattern.length; i++) {
      if (userClickedPattern[i] === gamePattern[i]) count++;
    }

    if (count === gamePattern.length) {
      console.log("Success");
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Fail");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}



// RESTART FUNCTION
function startOver(){
  level = 0;
  flag = false;
  gamePattern = [];
}
