const installBtn = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;

  installBtn.classList.toggle("visible", true);
});

installBtn.addEventListener("click", async () => {
  try {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
      return;
    }

    await promptEvent.prompt();

    window.deferredPrompt = null;

    installBtn.classList.toggle("visible", false);

    console.log("Installation prompt shown");
  } catch (error) {
    console.error("Error during PWA installation:", error);
  }
});

window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
  console.log("Just Another Text Editor Installed!", event);
});
