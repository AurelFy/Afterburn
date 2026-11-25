"use strict"; 

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);


const lenis = new Lenis({
  lerp: 0.1,            // plus petit = plus fluide/lent (0.05 à 0.15)
  smoothWheel: true
});

// Lenis informe ScrollTrigger à chaque scroll
lenis.on("scroll", ScrollTrigger.update);

// Lenis utilise le ticker de GSAP (une seule boucle d'animation)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


const flouMax = 10;

function majFlou() {
  const progression = Math.min(window.scrollY / window.innerHeight, 1);
  document.documentElement.style.setProperty("--blur", progression * flouMax);
}

window.addEventListener("scroll", () => requestAnimationFrame(majFlou), { passive: true });
majFlou();


gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector('.body__steps');
const steps = gsap.utils.toArray('.step');

// une seule timeline, un fondu entre chaque paire de sections
const tl = gsap.timeline({
  defaults: { ease: 'none' },
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
  },
});

steps.forEach((step, i) => {
  if (i === 0) return;
  tl.to(container, { backgroundColor: step.dataset.bg, duration: 1 });
});