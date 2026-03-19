const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const themeBtnLabel = document.getElementById("themeBtnLabel");
const siteNav = document.getElementById("siteNav");
const pageProgress = document.getElementById("pageProgress");
const revealObserverTargets = document.querySelectorAll(".reveal, .animate-on-view");
const heroStats = document.querySelector(".hero-stats");

function getPreferredTheme() {
  const savedTheme = localStorage.getItem("ff-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeButton(theme) {
  if (!themeBtn || !themeBtnLabel) {
    return;
  }

  themeBtnLabel.textContent = theme === "dark" ? "Dark" : "Light";
  themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  updateThemeButton(theme);
}

function toggleTheme() {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("ff-theme", nextTheme);
}

applyTheme(getPreferredTheme());

if (themeBtn) {
  themeBtn.addEventListener("click", toggleTheme);
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add("visible");

    if (entry.target.classList.contains("animate-on-view")) {
      entry.target.classList.add("is-live");
    }

    observer.unobserve(entry.target);
  });
}, { threshold: 0.18 });

revealObserverTargets.forEach((element) => revealObserver.observe(element));

function animateCount(element, target, suffix = "", duration = 1800) {
  let startTime = 0;

  function step(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.floor(eased * target).toLocaleString()}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

let countersStarted = false;

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || countersStarted) {
      return;
    }

    countersStarted = true;
    animateCount(document.getElementById("counterSessions"), 12840, "+");
    animateCount(document.getElementById("counterMinutes"), 321000, "+");
    animateCount(document.getElementById("counterStreaks"), 5400, "+");

    const rateElement = document.getElementById("counterRate");
    let rate = 0;

    const intervalId = window.setInterval(() => {
      rate = Math.min(rate + 1, 87);
      rateElement.textContent = `${rate}%`;

      if (rate >= 87) {
        window.clearInterval(intervalId);
      }
    }, 18);
  });
}, { threshold: 0.3 });

if (heroStats) {
  heroObserver.observe(heroStats);
}

function buildStreakGrid() {
  const container = document.querySelector(".streak-showcase");

  if (!container) {
    return;
  }

  const activeDays = [0, 1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 41];

  for (let index = 0; index < 42; index += 1) {
    const day = document.createElement("div");
    day.className = `s-day${activeDays.includes(index) ? " active" : ""}${index === 41 ? " today" : ""}`;
    container.appendChild(day);
  }
}

function cycleDurations() {
  const durationGroups = document.querySelectorAll(".dur-pills");

  durationGroups.forEach((group) => {
    const pills = Array.from(group.querySelectorAll(".dur-pill"));

    if (pills.length < 2) {
      return;
    }

    let activeIndex = pills.findIndex((pill) => pill.classList.contains("active"));
    activeIndex = activeIndex >= 0 ? activeIndex : 0;

    window.setInterval(() => {
      pills[activeIndex].classList.remove("active");
      activeIndex = (activeIndex + 1) % pills.length;
      pills[activeIndex].classList.add("active");
    }, 2200);
  });
}

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (siteNav) {
    siteNav.classList.toggle("is-scrolled", scrollTop > 36);
  }

  if (pageProgress) {
    pageProgress.style.width = `${scrollRatio}%`;
  }
}

buildStreakGrid();
cycleDurations();
updateScrollUI();

window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("resize", updateScrollUI);
