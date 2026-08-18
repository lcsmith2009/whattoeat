(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const pick = document.querySelector('#homeScreen .hero-actions .primary-btn');
    const chaos = document.getElementById('chaosPickBtn');
    const couple = document.getElementById('coupleModeBtn');
    const group = document.getElementById('groupVoteBtn');

    if (pick) {
      pick.setAttribute('aria-label', 'Pick For Me');
      pick.title = 'Pick For Me';
    }

    if (chaos) {
      chaos.setAttribute('aria-label', 'Chaos Pick');
      chaos.title = 'Chaos Pick';
    }

    if (couple) {
      couple.setAttribute('aria-label', 'Couple Mode');
    }

    if (group) {
      group.setAttribute('aria-label', 'Group Vote');
    }
  });
})();
