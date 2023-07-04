import LocomotiveScroll from 'locomotive-scroll';
import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const scrollerContainer = document.querySelector('[data-scroll-container]');

export const scroller = new LocomotiveScroll({
  el: scrollerContainer,
  smooth: true,
  resetNativeScroll: false,
  mobile: {
    breakpoint: 0,
    smooth: true
  },
  tablet: {
    breakpoint: 0,
    smooth: true
  }
});
scroller.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy(
  '[data-scroll-container]', {
    scrollTop(value) {
      return arguments.length ?
        scroller.scrollTo(value, 0, 0) :
        scroller.scroll.instance.scroll.y
    },
    getBoundingClientRect() {
      return {
        left: 0, top: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }
    },
    pinType: scrollerContainer.style.transform ? 'transform' : 'fixed'
  }
);

ScrollTrigger.defaults({
  scroller: '[data-scroll-container]'
})

ScrollTrigger.addEventListener('refresh', () => scroller.update());
ScrollTrigger.refresh();
