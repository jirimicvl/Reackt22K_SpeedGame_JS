const startButton = document.querySelector("#start");
const endButton = document.querySelector("#stop");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#close");
const circles = document.querySelectorAll(".circle");
const scoreText = document.querySelector("#score");
const resultText = document.querySelector("#result");

let myMusic = new sound("sounds/tetrisPS3.mp3");
let bump = new sound("sounds/bump.mp3");

let active = 0;
let score = 0;
let pace = 1500;
let rounds = -3; // 3 chances
// let rounds = 0;
let timer;


const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickedCircle(i));
});

const clickedCircle = (i) => {
  // i += 1;
  console.log("circle was clicked", i);
  bump.play();

  if (i !== active) {
    endGame();
  } else {
    score++;
    rounds--;

    scoreText.textContent = score;
  }
};

const startGame = () => {
  console.log("game started");
  myMusic.play();
  

  startButton.style.display = "none";
  endButton.style.display = "inline";

  for (let i = 0; i < circles.length; i++) {
    circles[i].style.pointerEvents = "auto";
  }

  let nextActive = pickNew(active);

  circles[nextActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = nextActive;
  console.log("active circle:", active);
  timer = setTimeout(startGame, pace);
  pace = pace - 30;

  if (rounds >= 1) {
    myMusic.pause();
    endGame();
    // myMusic.pause();
  }
  rounds++;
  console.log("rounds", rounds);

  function pickNew(active) {
    let nextActive = getRndInt(0, 3);

    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
};

const endGame = () => {
  console.log("game ended");
  clearTimeout(timer);
  overlay.style.visibility = "visible";
  resultText.textContent = `Your Final score was ${score}`;
};

const reloadGame = () => {
  window.location.reload();
};

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

// const startGameMusic = () => {
//       startSound = new sound("sound/arcade.wav");
//       startSound.play();
//     };

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
closeButton.addEventListener("click", reloadGame);

// function sound(src) {
//   this.sound = document.createElement("audio");
//   this.sound.src = src;
//   this.sound.setAttribute("preload", "auto");
//   this.sound.setAttribute("controls", "none");
//   this.sound.style.display = "none";
//   document.body.appendChild(this.sound);
//   this.play = function () {
//     this.sound.play();
//   };
//   this.stop = function () {
//     this.sound.pause();
//   };

//   const startGameMusic = () => {
//     startSound = new sound("sound/arcade.wav");
//     startSound.play();
//   };
// }
