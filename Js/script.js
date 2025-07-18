//* Load a sound
var runSound = new Audio("resources/Sound/run.mp3");
runSound.loop = true;
var jumpSound = new Audio("resources/Sound/jump.mp3");
var deadSound = new Audio("resources/Sound/dead.mp3");

function keyCheck(event) {
  //* Enter
  if (event.which == 13) {
    if (runWorkerId == 0) {
      runWorkerId = setInterval(run, 100);
      runSound.play();

      moveBackgroundId = setInterval(moveBackground, 100);
      createBlockWorkerId = setInterval(createBlock, 100);
      moveBlockWorkerId = setInterval(moveBlock, 100);
      scoreWorkerId = setInterval(updateScore, 100);
    }
  }

  //* Space
  if (event.which == 32) {
    if (jumpWorkerId == 0) {
      clearInterval(runWorkerId);
      runSound.pause();

      runWorkerId = -1;
      jumpWorkerId = setInterval(jump, 100);
      jumpSound.play();
    }
  }
}

var player = document.getElementById("player");

//* Run
var runImageNumber = 1;
var runWorkerId = 0;

function run() {
  runImageNumber++;
  if (runImageNumber == 10) {
    runImageNumber = 1;
  }
  player.src = "resources/Runner/Run (" + runImageNumber + ").png";
}

//*Jump
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMarginTop = 380;
function jump() {
  jumpImageNumber++;

  if (jumpImageNumber <= 7) {
    playerMarginTop = playerMarginTop - 20;
    player.style.marginTop = playerMarginTop + "px";
  }

  if (jumpImageNumber >= 8) {
    playerMarginTop = playerMarginTop + 20;
    player.style.marginTop = playerMarginTop + "px";
  }

  if (jumpImageNumber == 13) {
    jumpImageNumber = 1;

    clearInterval(jumpWorkerId);
    jumpWorkerId = 0;
    runWorkerId = setInterval(run, 100);
    runSound.play();

    //*Starting jump
    if (scoreWorkerId == 0) {
      scoreWorkerId = setInterval(updateScore, 100);
    }

    if (moveBackgroundId == 0) {
      moveBackgroundId = setInterval(moveBackground, 100);
    }

    if (createBlockWorkerId == 0) {
      createBlockWorkerId = setInterval(createBlock, 100);
    }

    if (moveBlockWorkerId == 0) {
      moveBlockWorkerId = setInterval(moveBlock, 100);
    }
  }
  player.src = "resources/Runner/jump (" + jumpImageNumber + ").png";
}

//* Move Background
var background = document.getElementById("background");
var backgroundX = 0;
var moveBackgroundId = 0;
function moveBackground() {
  backgroundX = backgroundX - 20;
  background.style.backgroundPositionX = backgroundX + "px";
}

//* Create Block
var createBlockWorkerId = 0;
var blockMarginLeft = 500;
var blockNumber = 1;

function createBlock() {
  var block = document.createElement("div");
  block.className = "block";
  block.id = "block" + blockNumber;
  blockNumber++;
  var gap = Math.random() * (1000 - 400) + 400;

  blockMarginLeft = blockMarginLeft + gap;
  block.style.marginLeft = blockMarginLeft + "px";
  document.getElementById("background").appendChild(block);
}

//* Move Block
var moveBlockWorkerId = 0;

function moveBlock() {
  for (var i = 1; i <= blockNumber; i++) {
    var currentBlock = document.getElementById("block" + i); //? catch the block
    var currentBlockMarginLeft = currentBlock.style.marginLeft; //? margin left
    var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;

    currentBlock.style.marginLeft = newBlockMarginLeft + "px";

    if ((newBlockMarginLeft < 54) & (newBlockMarginLeft > 34)) {
      if (playerMarginTop > 320) {
        clearInterval(runWorkerId);
        runSound.pause();

        clearInterval(jumpWorkerId);
        jumpWorkerId = -1;

        clearInterval(moveBackgroundId);
        clearInterval(scoreWorkerId);
        clearInterval(createBlockWorkerId);
        clearInterval(moveBlockWorkerId);

        deadWorkerId = setInterval(dead, 100);
        deadSound.play();
      }
    }
  }
}

//! Boy Dead
var deadWorkerId = 0;
var deadImageNumber = 1;

function dead() {
  deadImageNumber++;

  if (deadImageNumber == 11) {
    deadImageNumber = 10;

    player.style.marginTop = "380px";
    document.getElementById("endScreen").style.visibility = "visible";
    document.getElementById("endScore").innerHTML = newScore;
  }
  player.src = "resources/Runner/Dead (" + deadImageNumber + ").png";
}

//* Score
var scoreId = document.getElementById("score");
var scoreWorkerId = 0;
var newScore = 0;

function updateScore() {
  newScore++;
  scoreId.innerHTML = newScore;
}

//* Page Reload
function reload() {
  location.reload();
}