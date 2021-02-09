window.onload = () => {
  //===========================//
  //===// Loading classes //===//
  //===========================//

  // - page transition
  const transitionElementTrBl = document.querySelector('.transition-tr-bl');
  const transitionElementTlBr = document.querySelector('.transition-tl-br');
  const transitionElementBrTl = document.querySelector('.transition-br-tl');
  const transitionElementBlTr = document.querySelector('.transition-bl-tr');

  // - popup
  const popupBtn = document.querySelectorAll('.show-popup');
  const popup = document.querySelector('.popup');

  //=============================//
  //===// Loading variables //===//
  //=============================//

  // Defining const for motion status check
  const motionCheck = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Defining variables array
  const durationsArray = [];
  const varArray = [
    '--transition-static',
    '--transition-time',
    '--popup-time',
    '--btn-anim-time',
    '--logo-anim-time',
    '--heart-show',
    '--heart-beat',
    '--anim-delay',
    '--all-anim-delay',
  ];

  // Defining const for global variables source and quantity of variable array
  const varGlobal = getComputedStyle(document.body);
  const varQuantity = varArray.length;

  // Inserting all time durations into durations array
  for (let i = 0; i < varQuantity; i++) {
    durationsArray[i] = varGlobal.getPropertyValue(varArray[i]);
  }

  //================================//
  //====// Variables formating //===//
  //================================//

  // Subtracting `s` letter from loaded string
  for (let i = 0; i < varQuantity; i++) {
    durationsArray[i] = durationsArray[i].substring(0, durationsArray[i].length - 1);
  }

  // Setting own variable for transition time
  const timeTransition = durationsArray[0] * 1000;

  // Setting style for console timing info
  for (let i = 0; i < varQuantity; i++) {
    if (durationsArray[i].indexOf('.') < '') durationsArray[i] = durationsArray[i] + '.0';
  }

  //===================================//
  //===// Reduced motion - Status //===//
  //===================================//

  motionCheck.addEventListener('change', consoleInit);

  function consoleInit() {
    if (!motionCheck || motionCheck.matches) {
      motionStatus = `OFF`;
      console.clear();
      consoleLog();
    } else {
      motionStatus = `ON`;
      console.clear();
      consoleLog();
    }
  }

  //====================//
  //====// Console //===//
  //====================//

  // Console log animation status & animations durations & delays

  consoleInit();

  function consoleLog() {
    console.log(`# Scripts were loaded correctly! (Time is given in seconds)`);
    console.log(`# Animations are ` + motionStatus + `\n\n`);
    console.log(`# Page transition:`);
    console.log(`  - static screen: ` + durationsArray[0]);
    console.log(`  - transition: ` + durationsArray[1]);
    console.log(`# Popup time: ` + durationsArray[2]);
    console.log(`# Button animation time: ` + durationsArray[3]);
    console.log(`# Logo animation time: ` + durationsArray[4]);
    console.log(`# Heart animation:`);
    console.log(`  - show: ` + durationsArray[5]);
    console.log(`  - beat: ` + durationsArray[6]);
    console.log(`# Delays:`);
    console.log(`  - anim: ` + durationsArray[7]);
    console.log(`  - all: ` + durationsArray[8]);
  }

  //====================//
  //===// Scripts //===//
  //===================//

  //===// Page transition //===//
  setTimeout(() => {
    transitionElementTrBl.classList.remove('transition--active-tr-bl');
  }, timeTransition);

  setTimeout(() => {
    transitionElementTlBr.classList.remove('transition--active-tl-br');
  }, timeTransition);

  setTimeout(() => {
    transitionElementBrTl.classList.remove('transition--active-br-tl');
  }, timeTransition);

  setTimeout(() => {
    transitionElementBlTr.classList.remove('transition--active-bl-tr');
  }, timeTransition);

  //===// Popup //===//

  //===// Popup show & close with button //===//
  popupBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
      const popupTarget = e.target.dataset.target;

      const popupElement = document.querySelector(popupTarget);
      if (popupElement != null) {
        popupElement.classList.toggle('popup--active');
      }
    });
  });

  //===// Popup close on escape key press //===//
  document.addEventListener('keydown', esc);
  function esc(e) {
    if (e.which === 27) {
      popup.classList.remove('popup--active');
    }
  }
};
