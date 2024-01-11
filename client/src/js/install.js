const installBtn = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;

  installBtn.classList.toggle("visible", true);
});

installBtn.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;

  installBtn.classList.toggle("visible", false);

  console.log("Installation prompt shown");
});

window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
  console.log("Just Another Text Editor Installed!", event);
});
