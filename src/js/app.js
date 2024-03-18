import { gsap } from "gsap";
import OpenMenu from "./files/openMenu.js";

if (document.querySelector('.header') !== null) {
  const nav = document.querySelector('.header__wrap');

  const toggleNav = new OpenMenu(nav, 'header__button', 'header__wrap--closed', 'header__wrap--opened');
  toggleNav.toggle();
}

const heightWindow = document.documentElement.clientHeight;
const widthWindow = document.documentElement.clientWidth;
const widthMain = document.querySelector('.main').clientWidth;
const titleH1 = document.querySelector('h1');

const rectH1 = titleH1.getBoundingClientRect();
const header = document.querySelector('header');
const animeShowreel = document.querySelector('.showreel--scroll');
let animeShowreelWidth = 0;
const transformStartH1 = (heightWindow / 2) - (rectH1.height / 2);

titleH1.style.transform = `translateY(${transformStartH1 + 'px'})`;

gsap.set('.icon__wrap', {
  skewX: function (i, el) {
    return -14 + i * 4;
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

setTimeout(() => {
  animeShowreelWidth = animeShowreel.getBoundingClientRect().width;
}, 3000)

const MAX_SCROLL = 700;
const TOP_VIDEO = 125;
const EDGE_PADDING = 140;
const WRAP_PADDING = 30;

const videoScrollBox = animeShowreel.querySelector('video');
const widthVideoScrollBox = videoScrollBox.clientWidth;
const widthFillArea = widthMain - EDGE_PADDING;
const widthEnlargement = widthFillArea - widthVideoScrollBox;

const leftMinCursor = EDGE_PADDING / 2;
const leftShowreel = animeShowreel.getBoundingClientRect().x - EDGE_PADDING / 2 - WRAP_PADDING;

const scroll = {
  offset: 0,
  deltaWidth: 0,
  leftShowreel: leftShowreel,
  deltaWidthVideo: 0,
}

const mouse = {
  x: null
}

const updateCoordinates = (evt) => {
  mouse.x = evt.clientX;
};

document.querySelector('.main').addEventListener('mousemove', (evt) => {
  updateCoordinates(evt);
  const delta = mouse.x - leftShowreel + scroll.deltaWidthVideo;

  if (mouse.x < leftShowreel - scroll.deltaWidthVideo && mouse.x > leftMinCursor) {

    gsap.to(animeShowreel, {
      x: delta,
      duration: 0.2,
      delay: 0.05
    });
  }
  setTimeout(() => {
    scroll.deltaWidthVideo = animeShowreel.getBoundingClientRect().width - animeShowreelWidth;
  }, 250);

});

if (widthWindow > 768) {
  window.addEventListener('scroll', () => {
    header.style.transform = `translateY(${window.scrollY}px)`;

    const offsetNew = window.scrollY;

    if (((offsetNew * widthFillArea) / MAX_SCROLL) < widthEnlargement) {
      scroll.deltaWidth = (offsetNew * widthFillArea) / MAX_SCROLL;
    } else {
      scroll.deltaWidth = widthEnlargement;
    }

    if (scroll.deltaWidth < widthEnlargement) {
      animeShowreel.style.top = offsetNew + TOP_VIDEO + 'px';
    }

    gsap.to(videoScrollBox, {
      width: scroll.deltaWidth + widthVideoScrollBox,
      duration: 0.1
    });


    setTimeout(() => {
      const pointX = animeShowreel.getBoundingClientRect().x;

      if (pointX < EDGE_PADDING / 2) {
        gsap.to(animeShowreel, {
          x: scroll.deltaWidth - widthEnlargement - WRAP_PADDING,
          duration: 1
        })
      }
    }, 120);

    scroll.offset = offsetNew;
  });
}
