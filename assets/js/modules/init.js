const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const themeBtnLabel = document.getElementById("themeBtnLabel");
const siteNav = document.getElementById("siteNav");
const pageProgress = document.getElementById("pageProgress");
const heroStats = document.querySelector(".hero-stats");
const revealObserverTargets = document.querySelectorAll(".reveal, .animate-on-view");

if (typeof initTheme === "function") {
  initTheme({ root, themeBtn, themeBtnLabel });
}

if (typeof initReveal === "function") {
  initReveal(revealObserverTargets);
}

if (typeof initHeroStats === "function") {
  initHeroStats(heroStats);
}

if (typeof buildStreakGrid === "function") {
  buildStreakGrid();
}

if (typeof cycleDurations === "function") {
  cycleDurations();
}

if (typeof initScrollUI === "function") {
  initScrollUI({ siteNav, pageProgress });
}
