import { TweenMax, CSSPlugin, TimelineMax } from 'gsap';

export function showEnter(el) {
  const myTween = new TimelineMax();
  myTween.to(el, 1, {opacity: 1});
}

export function hideExit(el) {
  const myTween = new TimelineMax();
  myTween.to(el, 1, {opacity: 0});
}
