import imgDesert from "../img/desert.png";
import ScoreManager from "./ScoreManager";
import PageChanger from "./Page-Changer";
import BestScores from "./BestScores.js";

const pageChanger = new PageChanger();
const scoreManager = new ScoreManager();
const bestScoresInstance = new BestScores();

export default class Game {
  constructor() {
    this.currentQuestionIndex = 0;

    this.questionHtml = document.querySelector(".question");
    this.responsesHtml = document.querySelectorAll(".response");
    this.modaleContinue = document.querySelector(".modale-continue");
    document.querySelector(
      ".continue-screen"
    ).style.backgroundImage = `url(${imgDesert})`;
  }

  fetchGame(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.game = data;
        localStorage.setItem("oldGame", JSON.stringify(this.game));
        this.displayQuestion();
        pageChanger.switchScreen("game");
      })
      .catch((error) => {
        console.error("Erreur de fetch:", error);
      });
  }

  gameFromLocalStorage() {
    let oldGameData = localStorage.getItem("oldGame");
    if (oldGameData) {
      this.game = JSON.parse(oldGameData);
      this.currentQuestionIndex =
        JSON.parse(localStorage.getItem("currentQuestion")) || 0;
      return true;
    }
    return false;
  }

  verifyAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
      scoreManager.incrementScore();
    }

    this.currentQuestionIndex++;
    localStorage.setItem(
      "currentQuestion",
      JSON.stringify(this.currentQuestionIndex)
    );
    this.displayQuestion();
    scoreManager.displayScore(this.currentQuestionIndex);
  }

  decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  displayQuestion() {
    if (this.currentQuestionIndex >= this.game.results.length) {
      return this.endGame();
    }

    const question = this.game.results[this.currentQuestionIndex].question;
    this.questionHtml.innerHTML = this.decodeHtml(question);

    const correctAnswer = this.decodeHtml(
      this.game.results[this.currentQuestionIndex].correct_answer
    );
    let responses = this.game.results[
      this.currentQuestionIndex
    ].incorrect_answers.map((answer) => this.decodeHtml(answer));
    responses.push(correctAnswer);
    responses.sort(() => Math.random() - 0.5);

    this.responsesHtml.forEach((responseHtml) => {
      responseHtml.classList.remove("hidden");
      responseHtml.onclick = null;
    });

    if (responses.length === 2) {
      this.responsesHtml.forEach((responseHtml, index) => {
        if (index < 2) {
          responseHtml.classList.remove("hidden");
          responseHtml.textContent = responses[index];
          responseHtml.onclick = () =>
            this.verifyAnswer(responses[index], correctAnswer);
        } else {
          responseHtml.classList.add("hidden");
        }
      });
    } else {
      this.responsesHtml.forEach((responseHtml, index) => {
        responseHtml.classList.remove("hidden");
        responseHtml.textContent = responses[index];
        responseHtml.onclick = () =>
          this.verifyAnswer(responses[index], correctAnswer);
      });
    }

    scoreManager.updateProgressBar(this.currentQuestionIndex, this.game);
    scoreManager.displayScore(this.currentQuestionIndex);
  }

  endGame() {
    pageChanger.switchScreen("end");
    scoreManager.displayScore(this.currentQuestionIndex);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const userScore = {
      user: currentUser,
      score: scoreManager.calculateScorePercent(this.currentQuestionIndex),
      date: new Date().toISOString(),
    };

    bestScoresInstance.savedBestScores.push(userScore);
    bestScoresInstance.sortScores();

    localStorage.setItem(
      "bestScores",
      JSON.stringify(bestScoresInstance.savedBestScores)
    );

    this.resetGame();

    bestScoresInstance.displayBestScores();
  }

  resetGame() {
    this.resetLocalStorage();
    this.game = {};
    this.questionHtml.textContent = "";
    this.responsesHtml.forEach((response) => (response.textContent = ""));
  }

  resetLocalStorage() {
    localStorage.removeItem("oldGame");
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("score");
  }

  restartGame() {
    this.resetGame();
    this.currentQuestionIndex = 0;
    scoreManager.currentScore = 0;
    scoreManager.resetScores();
    scoreManager.resetProgressBar();
    localStorage.removeItem("currentUser");
    this.modaleContinue.setAttribute("closing", "");
    this.modaleContinue.removeAttribute("open");
    pageChanger.switchScreen("accueil");
  }

  continueGame() {
    this.modaleContinue.setAttribute("closing", "");
    this.modaleContinue.removeAttribute("open");
    scoreManager.displayScore(this.currentQuestionIndex);
    this.displayQuestion();
  }
}
