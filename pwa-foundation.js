(() => {
  window.__WTE_PWA_FOUNDATION_ACTIVE__ = true;

  let installPrompt = null;
  const installBtn = document.getElementById('installBtn');

  const isStandalone = () =>
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  const isAndroid = () => /Android/i.test(navigator.userAgent || '');
  const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent || '');

  // script.js still contains the May 2026 PWA registration path. During
  // Foundation, normalize that obsolete versioned registration to the one
  // canonical service-worker URL so two lifecycle generations cannot compete.
  if ('serviceWorker' in navigator && typeof navigator.serviceWorker.register === 'function') {
    const nativeRegister = navigator.serviceWorker.register.bind(navigator.serviceWorker);
    navigator.serviceWorker.register = (scriptURL, options) => {
      const normalizedURL = String(scriptURL).startsWith('/sw.js?v=20260518') ? '/sw.js' : scriptURL;
      return nativeRegister(normalizedURL, options);
    };
  }

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
  let refresh = () => {};

  if (installBtn) {
    cleanButton = installBtn.cloneNode(true);
    installBtn.replaceWith(cleanButton);

    refresh = () => {
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

    cleanButton.addEventListener('click', async event => {
      // This handler is intentionally registered before the legacy bundle.
      // Keep the old May 2026 click handler from running a second install flow.
      event.stopImmediatePropagation();
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
      // pwa-foundation.js is the single owner of Chrome's install event.
      // Prevent the obsolete anonymous listener in script.js from caching it too.
      event.stopImmediatePropagation();
      installPrompt = event;
      refresh();
    }, { capture: true });

    window.addEventListener('appinstalled', event => {
      event.stopImmediatePropagation();
      installPrompt = null;
      refresh();
    }, { capture: true });

    refresh();
  }

  window.addEventListener('load', async () => {
    if (!('serviceWorker' in navigator)) return;
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      await registration.update();
    } catch (error) {
      console.warn('WhatToEat service worker registration failed.', error);
    } finally {
      // The legacy bundle may briefly rewrite the Install button during its own
      // load callback. Reassert the Foundation state after all load listeners run.
      window.setTimeout(refresh, 0);
    }
  }, { capture: true });
})();
