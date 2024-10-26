export default class Slider {
  constructor() {
    this.btnPrevious = document.querySelector(".btn-previous");
    this.btnNext = document.querySelector(".btn-next");
    this.slides = document.querySelectorAll(".avatar-choice");
    this.slidesContainer = document.querySelector(".avatar-choices");
    this.currentSlideIndex = 0;

    this.updateSlidePosition();

    this.btnPrevious.addEventListener("click", () => this.changeSlide(-1));
    this.btnNext.addEventListener("click", () => this.changeSlide(1));

    window.addEventListener("resize", () => this.updateSlidePosition());

    this.handleAvatarClick();
  }

  getVisibleSlidesCount() {
    const containerWidth = this.slidesContainer.offsetWidth;
    const slideWidth = this.slides[0].offsetWidth;
    return Math.floor(containerWidth / slideWidth);
  }

  updateSlidePosition() {
    const slideWidth = this.slides[0].offsetWidth;
    this.slidesContainer.scrollTo({
      left: slideWidth * this.currentSlideIndex,
      behavior: "smooth",
    });
  }

  changeSlide(direction) {
    const totalSlides = this.slides.length;
    const visibleSlidesCount = this.getVisibleSlidesCount();
    const maxSlideIndex = totalSlides - visibleSlidesCount;

    this.currentSlideIndex =
      (this.currentSlideIndex + direction + totalSlides) % totalSlides;

    if (this.currentSlideIndex > maxSlideIndex) {
      this.currentSlideIndex = 0;
    }

    this.updateSlidePosition();
  }

  handleAvatarClick() {
    this.slides.forEach((slide) => {
      slide.addEventListener("click", () => this.changeAvatar(slide));
    });
  }

  changeAvatar(slide) {
    const choosenAvatar = document.querySelector(".img-avatar");
    const newAvatarSrc = slide.getAttribute("src");

    if (choosenAvatar) {
      choosenAvatar.setAttribute("src", newAvatarSrc);

      this.slides.forEach((s) => {
        s.classList.add("opacity-50");
      });

      slide.classList.remove("opacity-50");
    }
  }
}
