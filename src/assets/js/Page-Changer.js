import imgDesert from "../img/desert.png";
import imgMountain from "../img/mountain.jpg";
import imgBeach from "../img/beach.jpg";
import imgScore from "../img/score.svg";

export default class PageChanger {
  constructor() {
    this.scoreHtml = document.querySelector(".score");
    this.ecranAccueil = document.querySelector(".ecran-accueil");
    this.ecranJeu = document.querySelector(".ecran-jeu");
    this.ecranFin = document.querySelector(".ecran-fin");
    this.header = document.querySelector("header");
    this.welcome = document.querySelector(".welcome");
    this.result = document.querySelector(".result-wrapper");
    this.btnsSettings = document.querySelectorAll(".btn-settings");
    this.btnsStart = document.querySelectorAll(".btn-start");
    this.currentScreen = "accueil";
  }

  hideAllScreens() {
    this.ecranAccueil.classList.add("hidden");
    this.ecranAccueil.classList.remove("flex");
    this.ecranJeu.classList.add("hidden");
    this.ecranJeu.classList.remove("flex");
    this.ecranFin.classList.add("hidden");
    this.ecranFin.classList.remove("flex");
  }

  switchScreen(screenName) {
    this.hideAllScreens();
    this.currentScreen = screenName;

    switch (screenName) {
      case "game":
        this.ecranJeu.classList.remove("hidden");
        this.ecranJeu.classList.add("flex");
        this.header.style.backgroundImage = `url(${imgMountain})`;
        this.welcome.classList.add("hidden");
        this.result.classList.remove("hidden");
        this.result.classList.add("flex");
        this.scoreHtml.style.backgroundImage = `url(${imgScore})`;
        this.btnsStart.forEach((btn) => {
          btn.setAttribute("disabled", true);
        });
        this.btnsSettings.forEach((btn) => {
          btn.setAttribute("disabled", true);
        });
        break;

      case "end":
        this.ecranFin.classList.remove("hidden");
        this.ecranFin.classList.add("flex");
        this.header.style.backgroundImage = `url(${imgBeach})`;
        this.btnsStart.forEach((btn) => {
          btn.setAttribute("disabled", "");
        });
        this.btnsSettings.forEach((btn) => {
          btn.removeAttribute("disabled");
        });
        break;

      case "accueil":
        this.ecranAccueil.classList.remove("hidden");
        this.ecranAccueil.classList.add("flex");
        this.header.classList.remove("bg-beach");
        this.header.style.backgroundImage = `url(${imgDesert})`;
        this.welcome.classList.remove("hidden");
        this.result.classList.add("hidden");
        this.result.classList.remove("flex");
        this.btnsSettings.forEach((btn) => {
          btn.removeAttribute("disabled");
        });
        this.btnsStart.forEach((btn) => {
          btn.removeAttribute("disabled");
        });
    }
  }
}
