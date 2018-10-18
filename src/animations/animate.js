import { TweenMax, CSSPlugin, TimelineMax } from 'gsap';

export function show(el) {
  const myTween = new TimelineMax();
  myTween.to(el, 3, {opacity: 1});
}

export function hide(el) {
  const myTween = new TimelineMax();
  myTween.to(el, 3, {opacity: 0});
}

export function scaleDown(el) {
  const myTween = new TimelineMax();
  myTween.to(el, 3, {scale: 0.5});
}

export function scaleUp(el) {
  const myTween = new TimelineMax();
  myTween.to(el, 3, {scale: 1});
}