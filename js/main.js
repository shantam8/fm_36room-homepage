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
  if (mobileMenuTimer == null) {
    if (isMobileMenuOpen) {
      // zumachen
      header.classList.remove("isOpen");
      body.classList.remove("overflowHidden");
      backdrop.classList.remove("fadeInBackdrop");
      backdrop.classList.add("fadeOutBackdrop");
      btnMobileMenu.style.backgroundImage =
        'url("./images/icon-hamburger.svg")';
      btnMobileMenu.setAttribute("aria-Label", "open menu");
      mainNavBar.classList.add("fadeOut");
      mainNavBar.classList.remove("fadeIn");

      mobileMenuTimer = setTimeout(() => {
        console.log("timer zu");
        backdrop.classList.remove("fadeOutBackdrop");
        backdrop.classList.add("displayNone");
        mainNavBar.classList.add("displayNone");
        mainNavBar.classList.remove("fadeOut");
        document.querySelector(".emptyDiv").style.display = "block";
        mobileMenuTimer = null;
      }, 2000);
    } else {
      //aufmachen
      document.querySelector(".emptyDiv").style.display = "none";
      header.classList.add("isOpen");
      body.classList.add("overflowHidden");
      backdrop.classList.remove("displayNone");
      backdrop.classList.add("fadeInBackdrop");
      btnMobileMenu.style.backgroundImage = 'url("./images/icon-close.svg")';
      btnMobileMenu.setAttribute("aria-Label", "close menu");
      mainNavBar.classList.remove("displayNone");
      mainNavBar.classList.add("fadeIn");
      mobileMenuTimer = setTimeout(() => {
        mobileMenuTimer = null;
      }, 2000);
    }
    isMobileMenuOpen = !isMobileMenuOpen;
  }
}

function changeSlide(event) {
  console.log(activeSlide);
  if (
    !sliderTimer &&
    event.target.classList.contains("btnSliderRight") &&
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
    event.target.classList.contains("btnSliderLeft") &&
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
