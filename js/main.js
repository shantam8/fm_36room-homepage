let btnMobileMenu = document.querySelector("#btnMobileMenu");
let mainNavBar = document.querySelector("#mainNavBar");
let header = document.querySelector("header");
let body = document.querySelector("body");
let backdrop = document.querySelector("#backdrop");

let btnSliderLeft = document.querySelector(".btnSliderLeft");
let btnSliderRight = document.querySelector(".btnSliderRight");

let sliderImages = document.querySelectorAll(".sliderImage");
let slideTexts = document.querySelectorAll(".slideText");

let isMobileMenuOpen = false;
let mobileMenuTimer;
let sliderTimer;
let activeSlide = 0;
let nextSlide;

function toggleMobileMenu() {
  if (!mobileMenuTimer && isMobileMenuOpen) {
    // zumachen
    header.classList.remove("fadeIn");
    backdrop.classList.remove("fadeIn");
    mainNavBar.classList.remove("fadeIn");

    header.classList.add("fadeOut");
    body.classList.remove("overflowHidden");
    backdrop.classList.add("fadeOutBackdrop");
    btnMobileMenu.style.backgroundImage = 'url("../images/icon-hamburger.svg")';
    mainNavBar.classList.add("fadeOut");
    btnMobileMenu.setAttribute("aria-Label", "open menu");
    header.classList.remove("isOpen");

    mobileMenuTimer = setTimeout(() => {
      backdrop.classList.remove("fadeOutBackdrop");
      backdrop.classList.add("displayNone");
      header.classList.remove("fadeIn");
      header.classList.remove("fadeOut");
      mainNavBar.classList.add("displayNone");
      mainNavBar.classList.remove("fadeOut");
      mobileMenuTimer = "";
    }, 2000);
  } else {
    //aufmachen

    header.classList.add("isOpen");
    header.classList.add("fadeIn");
    body.classList.add("overflowHidden");
    backdrop.classList.remove("displayNone");
    backdrop.classList.add("fadeInBackdrop");
    btnMobileMenu.style.backgroundImage = 'url("../images/icon-close.svg")';
    mainNavBar.classList.remove("displayNone");
    mainNavBar.classList.add("fadeIn");
    btnMobileMenu.setAttribute("aria-Label", "close menu");
    mobileMenuTimer = setTimeout(() => {
      mobileMenuTimer = "";
    }, 2000);
  }

  isMobileMenuOpen = !isMobileMenuOpen;
}

function changeSlide(event) {
  console.log(activeSlide);
  if (
    !sliderTimer &&
    event.target.classList.contains("btnSliderLeft") &&
    activeSlide < 2
  ) {
    //links
    nextSlide = activeSlide + 1;
    sliderImages[activeSlide].classList.add("moveOutToLeft");
    sliderImages[nextSlide].classList.remove("displayNone");
    sliderImages[nextSlide].classList.add("moveInFromLeft");
    sliderTimer = setTimeout(() => {
      sliderImages[activeSlide].classList.remove("moveOutToLeft");
      sliderImages[activeSlide].classList.add("displayNone");
      sliderImages[nextSlide].classList.remove("moveInFromLeft");
      activeSlide++;
      nextSlide = "";
      sliderTimer = "";
    }, 3000);
  }

  if (
    !sliderTimer &&
    event.target.classList.contains("btnSliderRight") &&
    activeSlide > 0
  ) {
    nextSlide = activeSlide - 1;
    sliderImages[activeSlide].classList.add("moveOutToRight");
    sliderImages[nextSlide].classList.remove("displayNone");
    sliderImages[nextSlide].classList.add("moveInFromRight");
    sliderTimer = setTimeout(() => {
      sliderImages[activeSlide].classList.remove("moveOutToRight");
      sliderImages[activeSlide].classList.add("displayNone");
      sliderImages[nextSlide].classList.remove("moveInFromRight");
      activeSlide--;
      nextSlide = "";
      sliderTimer = "";
    }, 3000);
  }
}

function init() {
  btnMobileMenu.addEventListener("click", toggleMobileMenu);
  btnSliderLeft.addEventListener("click", changeSlide);
  btnSliderRight.addEventListener("click", changeSlide);
}

window.onload = init();
