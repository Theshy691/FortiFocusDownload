function animateCount(element, target, suffix = "", duration = 1800) {
  if (!element) {
    return;
  }

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

export function initHeroStats(heroStats) {
  if (!heroStats) {
    return;
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

      if (!rateElement) {
        return;
      }

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

  heroObserver.observe(heroStats);
}
