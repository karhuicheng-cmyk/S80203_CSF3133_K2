// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Start the game after validating player name
function startGame() {
  let name = document.getElementById("playerName").value.trim();

  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  gameStarted = true;
  document.getElementById("welcomeMsg").innerHTML = "Welcome, " + name + "!";
  document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
}

// Randomly select rock, paper, or scissors for the computer
function getComputerChoice() {
  let choices = ["rock", "paper", "scissors"];
  let randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Play a single round and update DOM elements
function playRound(playerChoice) {
  if (!gameStarted) {
    alert("Click Start Game first.");
    return;
  }

  let computerChoice = getComputerChoice();
  roundCount++;

  // Update images for player and computer choices
  document.getElementById("playerImg").src = playerChoice + ".png";
  document.getElementById("computerImg").src = computerChoice + ".png";

  let roundResult = "";
  let resultElement = document.getElementById("result");

  // Determine the winner
  if (playerChoice === computerChoice) {
    roundResult = "Draw";
    draws++;
    resultElement.innerHTML = "Round " + roundCount + ": It's a Draw!";
    resultElement.style.color = "grey";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    roundResult = "Win";
    wins++;
    resultElement.innerHTML = "Round " + roundCount + ": You Win!";
    resultElement.style.color = "green";
  } else {
    roundResult = "Lose";
    losses++;
    resultElement.innerHTML = "Round " + roundCount + ": You Lose!";
    resultElement.style.color = "red";
  }

  // Update scoreboard
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = losses;
  document.getElementById("draws").innerHTML = draws;

  // Store result in array and add row to history table
  results.push(roundResult);
  let historyBody = document.getElementById("historyBody");
  historyBody.innerHTML +=
    "<tr>" +
    "<td>" + roundCount + "</td>" +
    "<td>" + playerChoice + "</td>" +
    "<td>" + computerChoice + "</td>" +
    "<td>" + roundResult + "</td>" +
    "</tr>";
}

// Calculate and display win percentage using a for loop
function showSummary() {
  if (results.length === 0) {
    alert("No rounds played yet.");
    return;
  }

  let winCount = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "Win") {
      winCount++;
    }
  }

  let winPercentage = Math.round((winCount / results.length) * 100);
  document.getElementById("summaryText").innerHTML =
    "You played " + results.length + " rounds and won " + winPercentage + "%.";
}

// Reset all scores, history, and messages back to initial state
function resetGame() {
  wins = 0;
  losses = 0;
  draws = 0;
  roundCount = 0;
  results = [];

  document.getElementById("wins").innerHTML = "0";
  document.getElementById("losses").innerHTML = "0";
  document.getElementById("draws").innerHTML = "0";
  document.getElementById("historyBody").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("summaryText").innerHTML = "";
}
