//User Clicked pattern
let userClickedPattern = [];
let level = 0;
let start = false;
//starting a game with keypress
$(document).keypress(function(e) {
  if(!start) {
    $("h1").text("Level " + level);
    nextSequence();
    start = true;
  }

})
//Creating a pattertn for the game to generate setInterval(function () {
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
function nextSequence() {
//Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];


  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
   playSound(randomChosenColour);
level ++;
   $("h1").text("Level " +level);


}


//detecting when any of the buttons are clicked

$(".btn").click(function() {
  let userChosenColour = $(this).attr("id"); //$(this) is used as a jqiry object with jquery attr method on it
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
  console.log("user clicked pattern is "+ userClickedPattern);
  console.log("game pattern is " + gamePattern);
  console.log("user chosen colour is " + userChosenColour);
})

//playing sound when user clicks a buttons

function playSound(name) {
  let audio = new Audio("sounds/"+name+ ".mp3" );
   audio.play();
}

//Adding animations to user clicks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 110)

}

//Checking users answer
function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel] ) {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}



function gameOver() {
  $("body").addClass("game-over");
 setTimeout(function() {
  $("body").removeClass("game-over");
}, 200);
}

function startOver() {
  level = 0;
  start = false;
  gamePattern = [];
}
