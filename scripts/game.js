// array for button colors
let buttonColors = ["red","blue", "green", "yellow"];

// empty arrays for gamePattern and userClickedPattern
let gamePattern = [];
let userClickedPattern = [];
// Variable to keep track of whether or not the game has started
let gameStarted = false;
let counter = 0

$(document).on("touchend" function(e)
{
  e.preventDefault();
  if(!gameStarted){
    $("#level-title").text("Level " + counter);
    nextSequence();
    gameStarted = true;
}
});
$(document).keypress(function(){
  if(!gameStarted){
    $("#level-title").text("Level " + counter);
    nextSequence();
    gameStarted = true;

  }
});

// jquery event handler for when the button is clicked
$(".btn").click(function(){
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  // calls the checkAnswer function, then checks the index of the last answer in the nextSequence
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success")

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }  else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
      $("h1").text("Game Over, you lose!");
    }, 200);
    setTimeout(function () {

      restart();
    }, 1000);
  }
}

// function that chooses the next sequence and adds it to the game pattern array
function nextSequence(){

userClickedPattern = [];

  counter++;
  $("#level-title").text("Level " + counter);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // choses random button and flashes it so player knows what the next sequence is
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

// function to handle the sound
function playSound(name){
  var audio = new Audio ("sounds/" + name + ".mp3")
  audio.play();
}

// function that adds and removes the class .pressed to the squares
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function restart(){
  $("h1").text("Press A Key to Start")
  counter = 0;
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
}
