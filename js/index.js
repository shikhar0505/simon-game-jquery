let buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$("body").on("keypress", function () {
  if (!gameStarted) {
    updateGameHeader();
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");

  animateButtonClick(userChosenColor);
  playSound(userChosenColor);

  if (gameStarted) {
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 500);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    resetGameHeader();

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  level++;
  userClickedPattern = [];

  updateGameHeader();

  let randNum = Math.floor(Math.random() * 4) // 0-3
  let randomChosenColor = buttonColors[randNum];

  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

  setTimeout(function () {
    nextSequence();
  }, 500);
}

function updateGameHeader() {
  $("#level-title").text("Level " + level);
}

function resetGameHeader() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
}

function animateButtonClick(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}
