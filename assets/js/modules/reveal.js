function initReveal(revealObserverTargets) {
  if (!revealObserverTargets.length) {
    return;
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
}
