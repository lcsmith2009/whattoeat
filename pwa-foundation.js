(() => {
  let installPrompt = null;
  const installBtn = document.getElementById('installBtn');

  const isStandalone = () =>
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  const setButton = (label, enabled) => {
    if (!installBtn) return;
    installBtn.textContent = label;
    installBtn.disabled = !enabled;
    installBtn.setAttribute('aria-disabled', enabled ? 'false' : 'true');
    installBtn.classList.toggle('ready', enabled);
    installBtn.classList.toggle('disabled', !enabled);
  };

  if (installBtn) {
    const cleanButton = installBtn.cloneNode(true);
    installBtn.replaceWith(cleanButton);

    const refresh = () => {
      if (isStandalone()) {
        cleanButton.textContent = 'Installed';
        cleanButton.disabled = true;
        cleanButton.setAttribute('aria-disabled', 'true');
        cleanButton.classList.remove('ready');
        cleanButton.classList.add('disabled');
      } else if (installPrompt) {
        cleanButton.textContent = 'Install';
        cleanButton.disabled = false;
        cleanButton.setAttribute('aria-disabled', 'false');
        cleanButton.classList.add('ready');
        cleanButton.classList.remove('disabled');
      } else {
        cleanButton.textContent = 'Install';
        cleanButton.disabled = true;
        cleanButton.setAttribute('aria-disabled', 'true');
        cleanButton.classList.remove('ready');
        cleanButton.classList.add('disabled');
      }
    };

    cleanButton.addEventListener('click', async () => {
      if (!installPrompt || isStandalone()) return;
      const promptEvent = installPrompt;
      installPrompt = null;
      refresh();
      await promptEvent.prompt();
      await promptEvent.userChoice.catch(() => null);
      refresh();
    });

    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      installPrompt = event;
      refresh();
    });

    window.addEventListener('appinstalled', () => {
      installPrompt = null;
      refresh();
    });

    refresh();
  }

  window.addEventListener('load', async () => {
    if (!('serviceWorker' in navigator)) return;
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      await registration.update();
    } catch (error) {
      console.warn('WhatToEat service worker registration failed.', error);
    }
  });
})();
