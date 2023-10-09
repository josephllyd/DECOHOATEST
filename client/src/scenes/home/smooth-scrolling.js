
const links = document.querySelectorAll('nav ul Link');

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    document.querySelector(href).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
