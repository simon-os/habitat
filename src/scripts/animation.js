import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import { scroller } from './locomitive-gsap.adapter';
import { 
  getRandomNumbersArray, 
  setIncreasingZIndex, 
  wrapWordsInTag 
} from './utils';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const defaultEase = "Power3.easeInOut";
const defaultDuration = 1;
const defaultStagger = 0.12;

export function runAnimations() {
  const wasLoaded = sessionStorage.getItem('introShown');

  if (document.body.dataset['page'] === 'home') {
    if (!wasLoaded) {
      introAnimation();
    }
    else { // no intro
      scroller.stop();
      
      gsap.set('.portfolio', {autoAlpha: 0})
      heroScreenAnimation(0, 1.08, false);
    
      scroller.update();
      ScrollTrigger.refresh();
    
      gsap.to('.header__logo', {
        filter: 'none',
      });
      gsap.to('.header__button', {
        filter: 'none',
      });
  
      // header
      gsap.fromTo('.header', {
        y: '15px',
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: .5,
        rotation: 0.01,
        ease: 'Power4.easeInOut',
        onComplete: () => {
          sessionStorage.setItem('introShown', true);
        }
      });
    }

    headerLogoAnimation();

    // brands
    setScrollAnimation({
      sel: '.brands__item', 
      x: 0, 
      y: 50, 
      animateOpacity: true, 
      duration: 1,
      ease: 'Power4.out', 
      start: 'top 80%'
    });

    // our team
    setScrollAnimation({
      sel: '.our-team .container', 
      x: 0, 
      y: 100, 
      animateOpacity: true, 
      duration: .9,
      ease: defaultEase, 
      start: 'top 60%'
    });
    ourTeamAnimation();

    // services
    servicesAnimation();
    setScrollAnimation({
      sel: '.services__pill-buttons', 
      x: 0, 
      y: 50, 
      animateOpacity: true, 
      duration: 1,
      ease: 'Power4.out', 
      start: 'top 80%'
    });

    // manifesto
    manifestoAnimation();
    manifestoImagesAnimation();

    // awards
    setScrollAnimation({
      sel: '.awards .container', 
      x: 0, 
      y: 50, 
      animateOpacity: true, 
      duration: 1,
      ease: 'Power4.out', 
      start: 'top 80%'
    });

    // stats
    setScrollAnimation({
      sel: '.stats .container', 
      x: 0, 
      y: 50, 
      animateOpacity: true, 
      duration: 1,
      ease: 'Power4.out', 
      start: 'top 80%'
    });

    // faq
    setScrollAnimation({
      sel: '.faq .container',
      x: 0, 
      y: 50,
      animateOpacity: true, 
      duration: 1,
      ease: 'Power4.out', 
      start: 'top 80%'
    });

    // footer section
    footerSectionAnimation();
  } 
  else {
    // header
    gsap.fromTo('.header', {
      y: '15px',
      autoAlpha: 0
    }, {
      y: 0,
      autoAlpha: 1,
      duration: .5,
      rotation: 0.01,
      ease: 'Power4.easeInOut',
    });
  }
}

// Intro
function introAnimation() {
  const cases = document.querySelectorAll('.cases__item');
  const caseIndexes = getRandomNumbersArray(4, 1, cases.length + 1, true);
  CustomEase.create("customSine", "M0,0 C0,0 0,0 0.001,0 0.172,0.012 0.208,0.022 0.27,0.04 0.455,0.093 0.458,0.192 0.512,0.51 0.512,0.514 0.513,0.518 0.514,0.522 0.516,0.531 0.517,0.54 0.518,0.549 0.588,1.108 0.519,0.949 1,1")

  const y = '-107%';
  const scale = 1.09;
  const duration = 1.9;
  const delayStep = 1.08;
  const ease = 'customSine';

  let delay = 0;
  let zIndex = caseIndexes.length;

  // intro cases
  gsap.set('main', {opacity: 0}); // hide content
  gsap.set('.portfolio', {autoAlpha: 0});
  scroller.stop();

  gsap.set('.cases__item', {scale: 1.05});

  gsap.to('.cases', {
    autoAlpha: 1,
    duration: duration
  });

  gsap.to(`.cases__item:nth-child(${caseIndexes[0]})`, {
    y: y,
    duration: duration,
    delay: delay += delayStep,
    rotation: 0.01,
    scale: scale,
    ease: ease,
  });
  gsap.set(`.cases__item:nth-child(${caseIndexes[0]})`, {
    zIndex: zIndex--
  });

  gsap.to(`.cases__item:nth-child(${caseIndexes[1]})`, {
    y: y,
    duration: duration,
    delay: delay += delayStep,
    rotation: 0.01,
    scale: scale,
    ease: ease,
  });
  gsap.set(`.cases__item:nth-child(${caseIndexes[1]})`, {
    zIndex: zIndex--
  });

  gsap.to(`.cases__item:nth-child(${caseIndexes[2]})`, {
    y: y,
    duration: duration,
    delay: delay += delayStep,
    rotation: 0.01,
    scale: scale,
    ease: ease,
  });
  gsap.set(`.cases__item:nth-child(${caseIndexes[2]})`, {
    zIndex: zIndex--
  });

  gsap.to('.cases', {
    y: y,
    duration: duration,
    delay: delay += delayStep,
    rotation: 0.01,
    ease: ease,
  });
  gsap.set(`.cases__item:nth-child(${caseIndexes[2]})`, {
    autoAlpha: 0,
    delay: delay
  });

  // header
  gsap.fromTo('.header', {
    y: '15px',
    autoAlpha: 0
  }, {
    y: 0,
    autoAlpha: 1,
    duration: .5,
    delay: delay += delayStep + .5,
    rotation: 0.01,
    ease: 'Power4.easeInOut',
    onComplete: () => {
      sessionStorage.setItem('introShown', true);
    }
  });

  // show content
  gsap.set('main', {opacity: 1, delay: delay})

  // hero-screen
  heroScreenAnimation(delay, delayStep, true);
}

function heroScreenAnimation(delay, delayStep, firstLoad) {
  wrapWordsInTag('sub', 'span', '.hero-screen__heading');
  setIncreasingZIndex('.hero-screen__heading span');

  gsap.from('.hero-screen__heading sub', .4, {
    y: '100%',
    ease: 'Power4.inOut',
    stagger: .045,
    delay: delay += delayStep / 2
  })
  gsap.fromTo('.hero-screen__text', .8, {
    autoAlpha: 0,
  }, {
    autoAlpha: 1,
    ease: 'Power4.inOut',
    delay: delay += delayStep
  })

  if (!firstLoad) delayStep = 0.3;

  // Portfolio block
  setTimeout(() => {
    gsap.set('.portfolio', {autoAlpha: 1})
    scroller.start(); // turn on scroll
    
    setScrollAnimation({
      sel: '.project__image',
      x: 0, 
      y: 100, 
      animateOpacity: true, 
      duration: .9
    });

    setScrollStaggerAnimation({
      containerSel: '.project__inner', 
      sel: '> *', 
      x: 0, 
      y: 30, 
      staggerVal: .1, 
      animateOpacity: true
    });
  }, (delay += delayStep - .15) * 1000)
}

// Header
function headerLogoAnimation() {
  const logoContainer = document.querySelector('.header__logo');
  const duration = .2;
  const ease = 'Power2.inOut';

  scroller.update()
  ScrollTrigger.refresh();

  gsap.set('.header__logo .letter', {
    autoAlpha: 0
  })

  gsap.timeline({
    scrollTrigger: {
      start: 100,
      toggleActions: "play none none reverse",
      trigger: 'main',
    }
  })
    .to('.header__logo .svg-logo-full', {
      x: '-35%',
      autoAlpha: 0,
      ease: ease,
      duration: duration
    })
    .to('.header__logo .letter', {
      autoAlpha: 1,
      delay: -(duration + .2),
      ease: ease,
      duration: duration
    })
    .to('.header__logo .dot', {
      autoAlpha: 1,
      x: -55,
      delay: -duration,
      duration: duration + .02,
      ease: ease
    })
    .to('.header__logo', { // width of the link field
      onComplete: () => logoContainer.classList.add('header__logo--sm'),
      onReverseComplete: () => logoContainer.classList.remove('header__logo--sm')
    })
}

// Our team
let ourTeamHorizontalLength, ourTeamOffset;
let ourTeam = document.querySelector('.our-team__inner');

function ourTeamAnimation() {
  if (!ourTeam) return;
  ourTeamCalculate();

  gsap.to(ourTeam, {
    x: () => -(ourTeamHorizontalLength + ourTeamOffset),
    ease: 'none', 
    scrollTrigger: {
      trigger: '.our-team',
      start: () => `top top+=${window.innerHeight > 790 ? 60 : 15}`,
      end: () => `+=${ourTeam ? ourTeam.offsetWidth * 3 : 0}`,
      scrub: 0.1,
      pin: '.our-team',
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  });

  ScrollTrigger.addEventListener('refreshInit', ourTeamCalculate);
}

function ourTeamCalculate() {
  if (!ourTeam) return;

  ourTeamOffset = window.innerWidth / 6.5;
  ourTeamHorizontalLength = ourTeam.scrollWidth - window.innerWidth;
}

// Services
let servicesHorizontalLength;
let services = document.querySelector('.services__inner');
let servicesItems = document.querySelectorAll('.services-item');

function servicesAnimation() {
  const opacity = 0.2;

  if (!services) return;
  servicesCalculate();

  ScrollTrigger.matchMedia({
    "(max-width: 811px)": function () {
      gsap.set(servicesItems, {clearProps: "all"});

      servicesItems.forEach(item => {
        gsap.from(item, {
          autoAlpha: opacity,
          scrollTrigger: {
            trigger: item,
            start: 'top center+=180',
            end: '+=250',
            scrub: true,
          }
        })
      });
    },

    "(min-width: 812px)": function () {
      gsap.set(servicesItems, {clearProps: "all"});

      let scrollTween = gsap.to(services, { // horizontal scroll
        x: () => -servicesHorizontalLength,
        ease: 'none', // IMPORTANT
        scrollTrigger: {
          trigger: '.services .wrapper',
          scrub: 0.1,
          pin: '.services .wrapper',
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          start: () => `top top+=${window.innerHeight > 800 ? 190 : 140}`,
          end: () => `+=${services ? services.offsetWidth * 1.2 : 0}`,
        }
      });

      const images = document.querySelectorAll('.services__image');
      gsap.set(images, {autoAlpha: 0});
      gsap.set(images[0], {autoAlpha: 1}); // first image visible

      servicesItems.forEach((item, i) => { // inner items
        gsap.from(item, {
          autoAlpha: opacity,
          scrollTrigger: {
            trigger: item,
            scrub: true,
            containerAnimation: scrollTween,
            start: () => `left right-=${item.offsetWidth * 0.5}`,
            end: () => `+=${item.offsetWidth * .35}`,
            onLeave: () => changeImages(i, images, .65),
            onLeaveBack: () => changeImages(i - 1, images, .65),
          }
        })
      });
    },

  });

  ScrollTrigger.addEventListener('refreshInit', servicesCalculate);
}

function changeImages(i, images, duration) {
  gsap.to(images, duration, {
    autoAlpha: 0,
  });
  gsap.to(images[i], duration, {
    autoAlpha: 1,
  });
}

function servicesCalculate() {
  if (!services) return;

  servicesHorizontalLength = services.scrollWidth - servicesItems[0].scrollWidth;
}

// Manifesto
function manifestoAnimation() {
  const items = document.querySelectorAll('.manifesto__item');
  const squares = document.querySelectorAll('.manifesto__item-square .fill');

  if (!items) return;

  const duration = .35;
  const opacity = 0.2;
  const ease = 'customSine';

  ScrollTrigger.matchMedia({
    "(max-width: 811px)": function () {
      gsap.set(items, {clearProps: "all"});
      gsap.set(squares, {clearProps: "all"});

      items.forEach((item, i) => {
        gsap.from(item, { // items
          autoAlpha: opacity,
          duration: duration,
          scrollTrigger: {
            trigger: item,
            start: 'top center',
            toggleActions: 'play none none none',
            ease: ease,
          }
        })

        gsap.from(squares[i], { // squares
          y: '100%',
          duration: duration,
          scrollTrigger: {
            trigger: item,
            start: 'top center',
            toggleActions: 'play none none none',
            ease: ease,
          }
        })
      });
    },

    "(min-width: 812px)": function () {
      gsap.set(items, {clearProps: "all"});
      gsap.set(squares, {clearProps: "all"});

      items.forEach((item, i) => {
        gsap.from(item, { // items
          autoAlpha: opacity,
          duration: duration,
          scrollTrigger: {
            trigger: item,
            start: 'top center',
            end: () => `+=${item.scrollHeight}`,
            toggleActions: 'play reverse play reverse',
            ease: ease,
          }
        })

        gsap.from(squares[i], { // squares
          y: '100%',
          duration: duration,
          scrollTrigger: {
            trigger: item,
            start: 'top center',
            end: () => `+=${item.scrollHeight}`,
            toggleActions: 'play reverse play reverse',
            ease: ease,
          }
        })
      });
    },
  });
}

function manifestoImagesAnimation() {
  const images = document.querySelectorAll('.manifesto-images .image');
  const text = document.querySelector('.manifesto-images p');
  const items = [];

  if (!images.length) return;

  const duration = 1;
  let delay = -.78;
  const offset = .01;
  const ease = 'customSine';

  ScrollTrigger.matchMedia({
    "(max-width: 811px)": function () {
      items.push(images[2]);
      items.push(images[0]);
      items.push(images[1]);
      items.push(text);
      items.push(images[3]);
      items.push(images[4]);

      gsap.set(items, {autoAlpha: 0})

      let tl = gsap.timeline({
        defaults: {duration: duration, delay: delay},
        scrollTrigger: {
          trigger: '.manifesto-images__inner',
          start: 'top center',
          toggleActions: 'play none none none',
          ease: ease,
        }
      });

      items.forEach((item, i) => {
        tl.to(item, {
          autoAlpha: 1,
          duration: duration,
          delay: (i === 0) ? 0 : delay -= offset
        })
      });
    },

    "(min-width: 812px)": function () {
      items.push(images[2]);
      items.push(images[0]);
      items.push(images[1]);
      items.push(images[4]);
      items.push(images[3]);
      items.push(text);

      gsap.set(items, {autoAlpha: 0})

      let tl = gsap.timeline({
        defaults: {duration: duration, delay: delay},
        scrollTrigger: {
          trigger: '.manifesto-images__inner',
          start: 'top center',
          toggleActions: 'play none none none',
          ease: ease,
        }
      });

      items.forEach((item, i) => {
        if (i === items.length - 1) { // last elem (text)
          tl.to(item, {
            autoAlpha: 1,
            delay: 0,
            duration: 0.7
          })
          return;
        }

        tl.to(item, {
          autoAlpha: 1,
          duration: duration,
          delay: (i === 0) ? 0 : delay -= offset
        })
      });
    },
  })
}

// Footer section
function footerSectionAnimation() {
  if (document.body.dataset['page'] !== 'home') {
    gsap.to('.header__logo', {
      filter: 'none',
    })

    gsap.to('.header__button', {
      filter: 'none',
    })

    return;
  }

  gsap.to('.footer-section', {
    scrollTrigger: {
      trigger: '.footer-section',
      start: () => `top top+=${window.innerHeight / 50}`,

      onEnter: () => {
        gsap.to('.header__logo', {
          filter: 'invert(1)',
        })
        gsap.to('.header__button', {
          filter: 'invert(1)',
        })
      },
      onLeaveBack: () => {
        gsap.to('.header__logo', {
          filter: 'none',
        })
        gsap.to('.header__button', {
          filter: 'none',
        })
      }
    }
  })

  // footer
  gsap.from('.footer-section__inner', {
    autoAlpha: .1,

    scrollTrigger: {
      trigger: '.footer-section',
      start: `top-=${window.innerHeight * 0.2} center`,
      end: `+=${window.innerHeight * 0.6}`,
      scrub: true,
    }
  })
}

// Default scroll animations
function setScrollAnimation(options) {
  const {
    sel, x, y, animateOpacity, 
    duration, ease, start
  } = options;

  const items = document.querySelectorAll(sel);
  if (!items) return;

  items.forEach(item => {
    gsap.timeline({
      scrollTrigger: {
        start: start ?? 'top 95%',
        toggleActions: "play none none none",
        trigger: item,
      }
    })
      .from(item, {
        y: y ?? 0,
        x: x ?? 0,
        autoAlpha: animateOpacity ? 0 : 1,
        ease: ease ?? defaultEase,
        duration: duration ?? defaultDuration,
      });
  })
}

function setScrollStaggerAnimation(options) {
  const {
    containerSel, sel, x, y, ease, 
    animateOpacity, duration, staggerVal 
  } = options;

  // container is also a trigger for nested elements
  const container = document.querySelectorAll(containerSel)
  if (!container) return;

  container.forEach(container => {
    const items = container.querySelectorAll(`${containerSel} ${sel}`);
    if (!items) return;

    gsap.timeline({
      scrollTrigger: {
        start: 'top 95%',
        toggleActions: "play none none none",
        trigger: container,
      }
    })
      .from(items, {
        y: y ?? 0,
        x: x ?? 0,
        autoAlpha: animateOpacity ? 0 : 1,
        stagger: staggerVal ?? defaultStagger,
        ease: ease ?? defaultEase,
        duration: duration ?? defaultDuration,
      });
  })
}
