// Mobile Menu

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


// Close menu after clicking a link

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });

});


// Current Year

document.getElementById("year").textContent =
    new Date().getFullYear();


// Contact Form

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const whatsappNumber = "447000000000";

    const text =
        `Hello Perfect Builder Contractor Ltd,%0A%0A` +
        `Name: ${name}%0A` +
        `Email: ${email}%0A` +
        `Phone: ${phone}%0A%0A` +
        `Project Details:%0A${message}`;

    window.open(
        `https://wa.me/${whatsappNumber}?text=${text}`,
        "_blank"
    );

});


// Simple scroll animation

const cards = document.querySelectorAll(
    ".service-card, .project, .stat"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }

        });

    },
    {
        threshold: 0.15
    }
);


cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";
    card.style.transition = "all .6s ease";

    observer.observe(card);

});