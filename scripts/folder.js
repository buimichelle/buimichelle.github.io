const folders = document.querySelectorAll('.folder');

    folders.forEach(folder => {
      folder.addEventListener('click', () => {
        const content = folder.querySelector('.content');
        const isExpanded = folder.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
          // Collapse
          content.classList.remove('expanded');
          folder.setAttribute('aria-expanded', 'false');
        } else {
          // Expand
          content.classList.add('expanded');
          folder.setAttribute('aria-expanded', 'true');
        }
      });

      // Optional: allow toggling via keyboard (Enter/Space)
      folder.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          folder.click();
        }
      });
    });