var userClickedPattern=[];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started=false;
var level=0;


//Press a key to start

$(document).keypress(function() {
    if (!started) {
  
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

  

 
//UserClicked Pattern

$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    

    
    var audio= new Audio("sounds/"+userChosenColour+".mp3");
    audio.play();

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//Checking that the user click the currect option

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        playSound("wrong");
        
        $("body").addClass("game-over");

        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);


        startOver();
    }

}


//Auto Generated Pattern

function nextSequence(){
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4 );
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//For changing effect while user click
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  
//Start from first
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}