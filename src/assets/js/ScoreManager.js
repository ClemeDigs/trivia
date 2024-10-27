export default class ScoreManager {
  constructor() {
    this.scorePercentHtml = document.querySelector(".score");
    this.numberQuestionHtml = document.querySelector(".number-questions");
    this.progressHtml = document.querySelector(".progress");

    this.score = [];
    this.currentScore = 0;
    this.currentScorePercent = 0;
  }

  calculateScorePercent(currentQuestionIndex) {
    const storedScore = JSON.parse(localStorage.getItem("score"));

    if (storedScore !== null) {
      this.currentScore = storedScore;
    }

    if (currentQuestionIndex > 0) {
      this.currentScorePercent = Math.round(
        (this.currentScore * 100) / currentQuestionIndex
      );
      this.currentScorePercent = Math.min(this.currentScorePercent, 100);
    } else {
      this.currentScorePercent = 0;
    }

    localStorage.setItem("score", JSON.stringify(this.currentScore));

    return this.currentScorePercent;
  }

  displayScore(currentQuestionIndex) {
    this.numberQuestionHtml.textContent = currentQuestionIndex + " questions";
    this.scorePercentHtml.textContent =
      this.calculateScorePercent(currentQuestionIndex) + " %";
  }

  updateProgressBar(currentQuestionIndex, game) {
    this.progressHtml.style.width =
      (currentQuestionIndex * 100) / game.results.length + "%";
  }

  resetProgressBar() {
    this.progressHtml.style.width = 0 + "%";
  }

  resetScores() {
    this.currentScore = 0;
    localStorage.setItem("score", JSON.stringify(this.currentScore));
    this.numberQuestionHtml.textContent = 0 + " questions";
    this.scorePercentHtml.textContent = 0 + " %";
  }

  loadScoreFromLocalStorage() {
    const storedScore = JSON.parse(localStorage.getItem("score")) || [];
    this.score = storedScore;
    return this.score;
  }

  addScore(scorePercent, totalQuestions) {
    this.score.push(scorePercent);
    this.score.push(totalQuestions);
    this.saveScoreToLocalStorage();
  }

  incrementScore() {
    this.currentScore++;
    this.saveScoreToLocalStorage();
  }

  getCurrentScore() {
    return this.currentScore;
  }

  saveScoreToLocalStorage() {
    localStorage.setItem("score", JSON.stringify(this.currentScore));
  }
}
