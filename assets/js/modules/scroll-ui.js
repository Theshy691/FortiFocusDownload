export function initScrollUI({ siteNav, pageProgress }) {
  const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollRatio = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (siteNav) {
      siteNav.classList.toggle("is-scrolled", scrollTop > 36);
    }

    if (pageProgress) {
      pageProgress.style.width = `${scrollRatio}%`;
    }
  };

  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  window.addEventListener("resize", updateScrollUI);
}
