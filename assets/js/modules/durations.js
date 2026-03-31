export function cycleDurations() {
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
