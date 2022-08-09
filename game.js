//Arrays that contains the colours of the game and the game pattern of it
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
//Variables that contains the levels of the game, if it has started and the buttons that has clicked the user
var userClickedButtons = [];
var started = false;
var level = 0;

//Detect in the document if a key is pressed and starts the game with a next sequence.
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Function that detects if a button is pressed, if the game isnt started, starts the game and if its already started, plays an audio of that colour, we add an animation and we check the answer
$(".btn").click(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }else{
    var userChosenColour = this.getAttribute("id");
    userClickedButtons.push(userChosenColour);

    playAudio(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedButtons.length - 1);
  }
});


//Function that creates a new random sequence, increases the level and its title, adds a new animation to the button and play its audio.
function nextSequence() {
  userClickedButtons = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playAudio(randomChosenColour);
}

//Play the sound audio for the selected color.
function playAudio(colour) {
  if (buttonColors.includes(colour)) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
  }
}

//Animates the button when it is pressed.
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Checks if the answer is correct and generates a new sequence if it is. Else if isnt correct plays an wrong audio, a wrong animation, a new title and starts over the game.
function checkAnswer(currentLevel) {
  if (userClickedButtons[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedButtons.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
    playAudio("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 600);
    $("#level-title").text("Game Over- Press Any Key to Restart")
    startOver();
  }
}

//Restars the game and all its functions
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
