function initAppPreview() {
  const modal = document.getElementById("appPreviewModal");
  const modalBody = document.getElementById("appPreviewBody");
  const modalTitle = document.getElementById("appPreviewTitle");
  const modalText = document.getElementById("appPreviewText");
  const closeButton = document.getElementById("appPreviewClose");
  const launchers = document.querySelectorAll(".preview-launch");

  if (!modal || !modalBody || !modalTitle || !modalText || !closeButton || !launchers.length) {
    return;
  }

  let activeLauncher = null;

  const closeModal = () => {
    modal.hidden = true;
    modalBody.replaceChildren();
    document.body.classList.remove("preview-open");

    if (activeLauncher) {
      activeLauncher.focus();
      activeLauncher = null;
    }
  };

  const openModal = launcher => {
    const templateId = launcher.getAttribute("data-preview-template");
    const title = launcher.getAttribute("data-preview-title") || "App Preview";
    const copy = launcher.getAttribute("data-preview-copy") || "";
    const template = templateId ? document.getElementById(templateId) : null;

    if (!template) {
      return;
    }

    activeLauncher = launcher;
    modalTitle.textContent = title;
    modalText.textContent = copy;
    modalBody.replaceChildren(template.content.cloneNode(true));
    modal.hidden = false;
    document.body.classList.add("preview-open");
    closeButton.focus();
  };

  launchers.forEach(launcher => {
    launcher.addEventListener("click", () => openModal(launcher));
  });

  modal.addEventListener("click", event => {
    if (event.target instanceof Element && event.target.closest("[data-preview-close]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}
