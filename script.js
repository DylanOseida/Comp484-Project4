let timerStarted = false;
let canGuess = true;
let nIntervId;
let minutesCount = 0;
let secondsCount = 0;
let hundredthsCount = 0;
let totalHundredthsCount = 0;
let rectangles = [];

let curindex = 0;
const maxQuestions = 6;
let score = 0;

// Array of locations
const locations = [
{
    // My assigned location
    name: "Kurland Lecture Hall",
    lat: 34.236715979752056,
    lng: -118.52827143932966,
  },
  {
    name: "Arbor Court",
    lat: 34.24116122914107,
    lng: -118.52992044892473,
  },
  {
    name: "Sequioa Hall",
    lat: 34.2406871205974,
    lng: -118.5282174566079,
  },
  {
    name: "University Library",
    lat: 34.24029455906699,
    lng: -118.52918925397185,
  },
  {
    name: "Charles H. Noski Auditorium",
    lat: 34.24266147073476,
    lng: -118.5313972058777,
  },
  {
    name: "Orange Grove Pond",
    lat: 34.236756164769126,
    lng: -118.52606318665944,
  },
];

// Timer
function addLeadingZero(num) {
  return num < 10 ? `0${num}` : num;
}

function runTimer() {
  if (!nIntervId) {
    nIntervId = setInterval(function () {
      document.querySelector(".timer").innerHTML =
        addLeadingZero(minutesCount) +
        ":" +
        addLeadingZero(secondsCount) +
        ":" +
        addLeadingZero(hundredthsCount);
      hundredthsCount++;
      totalHundredthsCount++;
      if (hundredthsCount >= 100) {
        secondsCount++;
        hundredthsCount = 0;
      }
      if (secondsCount >= 60) {
        minutesCount++;
        secondsCount = 0;
      }
    }, 10);
  }
}

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    runTimer();
  }
}

function stopTimer() {
  clearInterval(nIntervId);
  nIntervId = null;
}

function resetTimer() {
  stopTimer();
  timerStarted = false;
  minutesCount = 0;
  secondsCount = 0;
  hundredthsCount = 0;
  totalHundredthsCount = 0;
  document.querySelector(".timer").innerHTML = "00:00:00";
}

// Quiz functionality
function showNextQuestion() {
  const quizItem = document.getElementById("quiz-item");

  if (curindex === maxQuestions) {
    quizItem.innerHTML += "<span style='font-size: 18px;'>Game finished!</span><br>";
    stopTimer();
    return;
  }

  // Append the next location instead of replacing
  quizItem.innerHTML += locations[curindex].name + "<br>";
}

function resetGame() {
  resetTimer();
  curindex = 0;
  score = 0;
  document.getElementById("quiz-item").innerHTML = "";
  document.getElementById("score-item").innerHTML = "";

  showNextQuestion();
  rectangles.forEach((rectangle) => {
    rectangle.setMap(null);
  });
  rectangles = [];
}
