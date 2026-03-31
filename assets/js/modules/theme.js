function getPreferredTheme() {
  const savedTheme = localStorage.getItem("ff-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeButton(theme, themeBtn, themeBtnLabel) {
  if (!themeBtn || !themeBtnLabel) {
    return;
  }

  themeBtn.dataset.themeState = theme;
  themeBtnLabel.textContent = theme === "dark" ? "Dark mode" : "Light mode";
  themeBtn.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
  );
}

function applyTheme(theme, root, themeBtn, themeBtnLabel) {
  root.setAttribute("data-theme", theme);
  updateThemeButton(theme, themeBtn, themeBtnLabel);
}

function initTheme({ root, themeBtn, themeBtnLabel }) {
  const applyCurrentTheme = (theme) => applyTheme(theme, root, themeBtn, themeBtnLabel);

  applyCurrentTheme(getPreferredTheme());

  if (!themeBtn) {
    return;
  }

  themeBtn.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyCurrentTheme(nextTheme);
    localStorage.setItem("ff-theme", nextTheme);
  });
}
