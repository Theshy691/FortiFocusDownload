import {
  heroStats,
  pageProgress,
  revealObserverTargets,
  root,
  siteNav,
  themeBtn,
  themeBtnLabel,
} from "./dom.js";
import { cycleDurations } from "./durations.js";
import { initHeroStats } from "./hero-stats.js";
import { initReveal } from "./reveal.js";
import { initScrollUI } from "./scroll-ui.js";
import { buildStreakGrid } from "./streak-grid.js";
import { initTheme } from "./theme.js";

initTheme({ root, themeBtn, themeBtnLabel });
initReveal(revealObserverTargets);
initHeroStats(heroStats);
buildStreakGrid();
cycleDurations();
initScrollUI({ siteNav, pageProgress });
