export default class Dialog {
  constructor() {
    this.dialogs = document.querySelectorAll(".dialog");
    this.btnsClose = document.querySelectorAll(".btn-close");

    // Initialisation des événements
    this.init();
  }

  // Méthode d'initialisation pour configurer tous les écouteurs d'événements
  init() {
    window.addEventListener("click", (e) => this.toggleDialog(e));

    this.dialogs.forEach((dialog) => {
      // Écouteur pour fermer la modale en cliquant à l'extérieur
      dialog.addEventListener("click", () => this.closingDialog(dialog));

      // Empêche la fermeture quand on clique à l'intérieur de la modale
      const children = dialog.querySelectorAll(":scope > *");
      children.forEach((child) => {
        child.addEventListener("click", (e) => e.stopImmediatePropagation());
      });
    });

    this.btnsClose.forEach((btn) =>
      btn.addEventListener("click", () => {
        this.dialogs.forEach((dialog) => this.closingDialog(dialog));
      })
    );
  }

  // Ouvrir ou fermer la modale selon sa visibilité
  toggleDialog(e) {
    const target = e.target;
    const dialogSelector = target.getAttribute("data-dialog");

    if (dialogSelector) {
      const dialog = document.querySelector(dialogSelector);

      if (dialog) {
        if (dialog.checkVisibility()) {
          this.closingDialog(dialog);
        } else {
          dialog.setAttribute("open", "");
        }
      }
    }
  }

  // Ajoute l'animation de fermeture et l'écouteur pour retirer l'attribut 'open' après l'animation
  closingDialog(dialog) {
    dialog.setAttribute("closing", "");
    dialog.addEventListener("animationend", () => this.closeDialog(dialog), {
      once: true,
    });
  }

  // Ferme la modale en retirant les attributs 'open' et 'closing'
  closeDialog(dialog) {
    dialog.removeAttribute("open");
    dialog.removeAttribute("closing");
  }
}
