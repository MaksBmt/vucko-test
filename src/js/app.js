
//============================================================================================================================================================================================================================================
// import Popup from "./files/popup.js";
// import OpenMenu from "./files/openMenu.js";
// import Swiper from 'swiper/bundle';  //! - после установки через npm

// if (document.querySelector('.header') !== null) {
//     const nav = document.querySelector('.header__wrap');

//     const toggleNav = new OpenMenu(nav, 'header__button', 'header__wrap--closed', 'header__wrap--opened');
//     toggleNav.toggle();
//   }

// import { correctMarginMain } from "./files/functions.js"

// const TOP = 160;
// if (document.querySelector('.popup') !== null) {
//     // const popup = document.querySelector('.popup');

//     document.querySelector('.link__popup').addEventListener('click', (evt) => {
//         const popupTop = window.scrollY + TOP;
//         const popup = new Popup(document.querySelector('.popup'), 'popup__close', 'popup__show', popupTop);
//         evt.preventDefault();
//         popup.setPopup();
//         popup.setOverlay();
//         //   popup.setClosePopupTimeOut(3000)
//     });
// }

// correctMarginMain();

//?==== пример подключения ==========
// if (document.documentElement.clientWidth < 1365) {
//     new Swiper('.presentation__swiper', {

//       pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//         type: 'fraction'  //? если нужны цифры
//       },

//       navigation: {
//         nextEl: '.navigation__btn--next',
//         prevEl: '.navigation__btn--prev',
//       },
//     });
// }
//? ===========================================

//? ====== скролл при клике до нужного блока ========

// const promo = document.querySelector('.promo')
// const btnPromo = document.querySelector('.header__btn--promo');
// btnPromo.addEventListener('click', (evt) => {

//   evt.preventDefault();
//   promo.scrollIntoView({
//     behavior: "smooth",
//     block: "start"
//   });
// });

//?===================================================

import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


const heightWindow = document.documentElement.clientHeight;
const widthWindow = document.documentElement.clientWidth;
const widthMain = document.querySelector('.main').clientWidth
const titleH1 = document.querySelector('h1');
// const icons
const rectH1 = titleH1.getBoundingClientRect();
const header = document.querySelector('header');
const animeShowreel = document.querySelector('.showreel--scroll')
// console.log(animeShowreel);

const transformStartH1 = (heightWindow / 2) - (rectH1.height / 2);

titleH1.style.transform = `translateY(${transformStartH1 + 'px'})`;


gsap.set('.icon__wrap', {
  skewX: function (i, el) {
    return -14 + i * 4
  }
});


const tl = gsap.timeline();
tl.to('.icon__wrap', {
  scaleY: 1,
  duration: 0.9,
  stagger: -0.04,
})
  .to('.icon__wrap', {
    skewX: 0,
    duration: 1,
    stagger: -0.05
  }, "-=1")
  .to(titleH1, {
    y: 0,
    // delay: 1.6,  //задержка
    duration: 1,
  })
  .to(header, {
    opacity: 1,
    duration: 1
  }, "-=0.4")
  .to('.main__wrapper', {
    opacity: 1,
    y: 0,
    duration: 0.8
  }, "-=1.4")
  .to('.showreel--static', {
    scale: 1,
    duration: 1
  }, "-=1.5")
  .to('.main__string', {
    scaleY: 1,
    duration: 0.8
  }, "-=1.4");

gsap.to('.showreel--scroll', {
  scale: 1,
  duration: 0.4,
  delay: 2
})

// document.addEventListener("DOMContentLoaded", (event) => {
//   gsap.registerPlugin(ScrollTrigger);
//   if (widthWindow > 768) {
//     gsap.to('.showreel--scroll',{
//       // scrollTrigger: ".body",

//       scrollTrigger: {
//         trigger: '.showreel--scroll',
//         toggleActions: "restart pause reverse pause",
//         start: "1px bottom",
//       },
//       scrab: true,
//       x:-50,

//     })

//   }

//   // gsap code here!
// });
// const scaleMax = (widthMain - 140) / animeShowreel.clientWidth;//!
const scaleMax = (widthMain - 140) - animeShowreel.clientWidth;
const MAX_SCROLL = 700;
const TOP_VIDEO = 125;
// console.log(widthMain,scaleMax);

// const deltaScale = scaleMax / MAX_SCROLL; //!
const deltaScale = MAX_SCROLL / scaleMax;
const videoScrollBox = animeShowreel.querySelector('video');
const widthVideoScrollBox = videoScrollBox.clientWidth;
// console.log(deltaScale);

const scroll = { offset: 0, widthVideoScrollBox: videoScrollBox.clientWidth, deltaWidth: 0 }


if (widthWindow > 768) {
  window.addEventListener('scroll', () => {
    // const offsetNew = Math.floor(window.scrollY);
    const offsetNew = window.scrollY;
    // const offsetScale = deltaScale * offsetNew;//!
    // const offsetScale = 0;

    if (((offsetNew * widthMain - 140) / MAX_SCROLL) < (widthMain - 140 - widthVideoScrollBox)) {
      // offsetScale = (offsetNew * widthMain - 140) / MAX_SCROLL;
      scroll.deltaWidth = (offsetNew * widthMain - 140) / MAX_SCROLL;

    } else {
      scroll.deltaWidth = widthMain - 140 - widthVideoScrollBox;
    }

    if (scroll.deltaWidth < widthMain - 140 - widthVideoScrollBox) {
      console.log('w',scroll.widthVideoScrollBox <= widthMain - 140);
      
      animeShowreel.style.top = offsetNew + TOP_VIDEO + 'px';
    } else {
      // animeShowreel.style.top = window.scrollY + 'px';
    }

    // const deltaWidthVideo = (scroll.widthVideoScrollBox - widthVideoScrollBox * offsetScale) / 2//!

    // console.log('новая ширина -', scroll.widthVideoScrollBox, 'ширина поля - ', widthMain - 140);

    // if (scroll.offset < MAX_SCROLL) {
    // if (scroll.widthVideoScrollBox < widthMain - 140) {
    gsap.to(videoScrollBox, {
      // width: widthVideoScrollBox * offsetScale, //!
      width: scroll.deltaWidth + widthVideoScrollBox,
      duration: 0.1
    });

    // gsap.to(animeShowreel, {
    //   x: deltaWidthVideo,
    //   duration: 0.1
    // })
    // }

    // animeShowreel.querySelector('.showreel__title').style.cssText = 'translate: none;rotate: none;scale: none; opacity: 1;transform: translate(0px, 0px);'
    // }
    scroll.offset = offsetNew;
    scroll.widthVideoScrollBox = videoScrollBox.clientWidth;
  })
}