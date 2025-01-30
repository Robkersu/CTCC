document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const links = document.querySelectorAll('.transition');

  links.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');

          overlay.classList.add('active');

          setTimeout(() => {
              window.location.href = href;
          }, 500);
      });
  });
});