export default class Dialog {
  constructor() {
    this.dialogs = document.querySelectorAll(".dialog");
    this.btnsClose = document.querySelectorAll(".btn-close");
    this.init();
  }

  init() {
    window.addEventListener("click", (e) => this.toggleDialog(e));

    this.btnsClose.forEach((btn) =>
      btn.addEventListener("click", (e) => this.closeDialogs(e))
    );
  }

  toggleDialog(e) {
    const target = e.target;
    const dialogSelector = target.getAttribute("data-dialog");
    const dialog = dialogSelector
      ? document.querySelector(dialogSelector)
      : null;

    if (dialog) {
      dialog.hasAttribute("open")
        ? this.closeDialog(dialog)
        : this.openDialog(dialog);
    }
  }

  openDialog(dialog) {
    dialog.setAttribute("open", "");
    dialog.addEventListener(
      "click",
      (e) => {
        if (e.target === dialog) this.closeDialog(dialog);
      },
      { once: true }
    );
  }

  closeDialogs(e) {
    e.stopPropagation();
    this.dialogs.forEach((dialog) => this.closeDialog(dialog));
  }

  closeDialog(dialog) {
    dialog.setAttribute("closing", "");
    dialog.addEventListener(
      "animationend",
      () => {
        dialog.removeAttribute("open");
        dialog.removeAttribute("closing");
      },
      { once: true }
    );
  }
}
