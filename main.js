const startButton = document.querySelector("#start");
const endButton = document.querySelector("#stop");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#close");
const circles = document.querySelectorAll(".circle");
const scoreText = document.querySelector("#score");
const resultText = document.querySelector("#result");

let active = 0;
let score = 0;
let pace = 3000;
let rounds = -1;
// let rounds = 0;
let timer;

// let container = document.querySelector(".circles");

// console.log(container);

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickedCircle(i));
});

const clickedCircle = (i) => {
  // i += 1;
  console.log("circle was clicked", i);

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
  pace = pace - 10;

  if (rounds >= 1) {
    endGame();
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

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
closeButton.addEventListener("click", reloadGame);

// startButton.addEventListener("click", startGame);
// endButton.addEventListener("click", endGame);
// closeButton.addEventListener("click", reloadGame);
