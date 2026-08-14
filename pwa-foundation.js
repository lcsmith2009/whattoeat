(() => {
  let installPrompt = null;
  const installBtn = document.getElementById('installBtn');

  const isStandalone = () =>
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  const isAndroid = () => /Android/i.test(navigator.userAgent || '');
  const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent || '');

  const showInstallHelp = () => {
    const existing = document.getElementById('pwaInstallHelp');
    if (existing) existing.remove();

    const backdrop = document.createElement('div');
    backdrop.id = 'pwaInstallHelp';
    backdrop.setAttribute('role', 'presentation');
    Object.assign(backdrop.style, {
      position: 'fixed', inset: '0', zIndex: '9999', display: 'grid', placeItems: 'center',
      padding: '24px', background: 'rgba(0,0,0,.72)'
    });

    const card = document.createElement('div');
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');
    card.setAttribute('aria-labelledby', 'pwaInstallHelpTitle');
    Object.assign(card.style, {
      width: 'min(420px,100%)', boxSizing: 'border-box', borderRadius: '24px',
      padding: '22px', background: '#17171a', color: '#fff8ed',
      border: '1px solid rgba(255,255,255,.14)', boxShadow: '0 24px 80px rgba(0,0,0,.5)'
    });

    const title = document.createElement('h2');
    title.id = 'pwaInstallHelpTitle';
    title.textContent = 'Add WhatToEat to your phone';
    title.style.margin = '0 0 10px';

    const copy = document.createElement('p');
    copy.style.cssText = 'margin:0 0 18px;line-height:1.5;color:#d8ccbf';
    if (isAndroid()) {
      copy.textContent = 'Chrome is not showing its one-tap install prompt right now. Tap the ⋮ menu, choose “Install and create shortcut,” then follow Chrome’s options to add WhatToEat.';
    } else if (isIOS()) {
      copy.textContent = 'In Safari, tap Share, then choose “Add to Home Screen” to add WhatToEat.';
    } else {
      copy.textContent = 'Use your browser menu to install this app or add it to your home screen.';
    }

    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Got it';
    Object.assign(close.style, {
      width: '100%', border: '0', borderRadius: '14px', padding: '13px 16px',
      font: 'inherit', fontWeight: '800', background: '#ff6b2c', color: '#fff', cursor: 'pointer'
    });

    const dismiss = () => {
      backdrop.remove();
      cleanButton?.focus();
    };
    close.addEventListener('click', dismiss);
    backdrop.addEventListener('click', event => { if (event.target === backdrop) dismiss(); });
    document.addEventListener('keydown', function onKey(event) {
      if (event.key === 'Escape' && document.getElementById('pwaInstallHelp')) {
        dismiss();
        document.removeEventListener('keydown', onKey);
      }
    });

    card.append(title, copy, close);
    backdrop.append(card);
    document.body.append(backdrop);
    close.focus();
  };

  let cleanButton = null;

  if (installBtn) {
    cleanButton = installBtn.cloneNode(true);
    installBtn.replaceWith(cleanButton);

    const refresh = () => {
      if (isStandalone()) {
        cleanButton.textContent = 'Installed';
        cleanButton.disabled = true;
        cleanButton.setAttribute('aria-disabled', 'true');
        cleanButton.classList.remove('ready');
        cleanButton.classList.add('disabled');
      } else {
        cleanButton.textContent = 'Install';
        cleanButton.disabled = false;
        cleanButton.setAttribute('aria-disabled', 'false');
        cleanButton.classList.add('ready');
        cleanButton.classList.remove('disabled');
        cleanButton.title = installPrompt ? 'Install WhatToEat' : 'Show install instructions';
      }
    };

    cleanButton.addEventListener('click', async () => {
      if (isStandalone()) return;

      if (!installPrompt) {
        showInstallHelp();
        return;
      }

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
