const startButton = document.querySelector("#start");
const endButton = document.querySelector("#stop");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#close");
const circles = document.querySelectorAll(".circle");

let active = 0;

let container = document.querySelector(".circles");

console.log(container);

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickedCircle(i));
});

const clickedCircle = (i) => {
  i += 1;
  console.log("circle was clicked", i);
};

const startGame = () => {
  console.log("game started");

  let nextActive = pickNew(active);

  circles[nextActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = nextActive;
  console.log("active circle:", active + 1);
  timer = setTimeout(startGame, 1000);

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
  overlay.style.visibility = "visible";
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
