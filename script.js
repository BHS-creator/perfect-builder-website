const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});
