let btnMobileMenu = document.querySelector("#btnMobileMenu");
let mainNavBar = document.querySelector("#mainNavBar");
let header = document.querySelector("header");
let body = document.querySelector("body");
let backdrop = document.querySelector("#backdrop");

let btnSlidersLeft = document.querySelectorAll(".btnSliderLeft");
let btnSlidersRight = document.querySelectorAll(".btnSliderRight");

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
      }, 1000);
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
      }, 1000);
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
    sliderImages[activeSlide].classList.add("moveOutToLeftMobile");
    sliderImages[nextSlide].classList.remove("displayNone");
    sliderImages[nextSlide].classList.add("moveInFromLeftMobile");

    slideTexts[activeSlide].classList.add("moveOutToLeftMobile");
    slideTexts[nextSlide].classList.remove("displayNone");
    slideTexts[nextSlide].classList.add("moveInFromLeftMobile");

    sliderTimer = setTimeout(() => {
      sliderImages[activeSlide].classList.remove("moveOutToLeftMobile");
      sliderImages[activeSlide].classList.add("displayNone");
      sliderImages[nextSlide].classList.remove("moveInFromLeftMobile");

      slideTexts[activeSlide].classList.remove("moveOutToLeftMobile");
      slideTexts[activeSlide].classList.add("displayNone");
      slideTexts[nextSlide].classList.remove("moveInFromLeftMobile");

      activeSlide++;
      nextSlide = "";
      sliderTimer = "";
    }, 1000);
  }

  if (
    !sliderTimer &&
    event.target.classList.contains("btnSliderLeft") &&
    activeSlide > 0
  ) {
    nextSlide = activeSlide - 1;
    sliderImages[activeSlide].classList.add("moveOutToRightMobile");
    sliderImages[nextSlide].classList.remove("displayNone");
    sliderImages[nextSlide].classList.add("moveInFromRightMobile");

    slideTexts[activeSlide].classList.add("moveOutToRightMobile");
    slideTexts[nextSlide].classList.remove("displayNone");
    slideTexts[nextSlide].classList.add("moveInFromRightMobile");

    sliderTimer = setTimeout(() => {
      sliderImages[activeSlide].classList.remove("moveOutToRightMobile");
      sliderImages[activeSlide].classList.add("displayNone");
      sliderImages[nextSlide].classList.remove("moveInFromRightMobile");

      slideTexts[activeSlide].classList.remove("moveOutToRightMobile");
      slideTexts[activeSlide].classList.add("displayNone");
      slideTexts[nextSlide].classList.remove("moveInFromRightMobile");

      activeSlide--;
      nextSlide = "";
      sliderTimer = "";
    }, 1000);
  }
}

function toggleMobileMenuOnResize() {
  console.log("resizeFunction");

  if (isMobileMenuOpen) {
    console.log("1 ");

    if (window.innerWidth >= 480) {
      console.log("2 ");
      isMobileMenuOpen = !isMobileMenuOpen;

      body.classList.remove("overflowHidden");
      header.classList.remove("isOpen");

      btnMobileMenu.style.backgroundImage =
        'url("./images/icon-hamburger.svg")';
      btnMobileMenu.setAttribute("aria-Label", "open menu");

      backdrop.classList.remove("fadeInBackdrop");      
      backdrop.classList.add("displayNone");
      mainNavBar.classList.remove("fadeIn");
      mainNavBar.classList.remove("displayNone");
      document.querySelector(".emptyDiv").style.display = "block";

    } else {
      console.log("3");
    }
  } else {
    
    if (window.innerWidth >= 480) {
      console.log("4");
      mainNavBar.classList.remove("displayNone");

    }else{
      
      mainNavBar.classList.add("displayNone");
      console.log("5");
    }

  }
  console.log("isopopen: " + isMobileMenuOpen);
}

function init() {
  btnMobileMenu.addEventListener("click", toggleMobileMenu);
  btnSlidersLeft.forEach((element) => {
    element.addEventListener("click", changeSlide);
  });

  btnSlidersRight.forEach((element) => {
    element.addEventListener("click", changeSlide);
  });

  window.addEventListener("resize", toggleMobileMenuOnResize);

  if (window.innerWidth >= 480) {
    mainNavBar.classList.remove("displayNone");
  }
}

window.onload = init();
