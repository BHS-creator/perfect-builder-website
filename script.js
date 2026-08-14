const reviews = [
  {
    name: "Sadaf Parveen",
    initial: "S",
    text: "Friendly local contractor with many years experience. It shows in their workmanship! Gave great advise and a competitive quote. Would..."
  },
  {
    name: "Chris Kay",
    initial: "C",
    text: "Perfect build at affordable prices"
  },
  {
    name: "SUN",
    initial: "S",
    text: "We had an excellent experience with this building contractor. Professional, reliable, and detail-oriented from start to finish. The project was..."
  },
  {
    name: "Heaven Infinity",
    initial: "H",
    text: "Good building company. That deliver on there promise."
  },
  {
    name: "Soni Singh",
    initial: "S",
    text: "Good building work don on time. Friendly and very flexible worker. All over very good building work and work I recommend strongly"
  }
];

let current = 0;

const nameEl = document.getElementById("reviewName");
const textEl = document.getElementById("reviewText");
const avatarEl = document.getElementById("avatar");
const dotsEl = document.getElementById("reviewDots");

function renderDots(){
  dotsEl.innerHTML = reviews.map((_, i) =>
    `<button class="dot ${i === current ? "active" : ""}" aria-label="Show review ${i+1}" data-index="${i}"></button>`
  ).join("");
  dotsEl.querySelectorAll(".dot").forEach(dot => {
    dot.addEventListener("click", () => {
      current = Number(dot.dataset.index);
      renderReview();
    });
  });
}

function renderReview(){
  const r = reviews[current];
  nameEl.textContent = r.name;
  textEl.textContent = r.text;
  avatarEl.textContent = r.initial;
  renderDots();
}

document.getElementById("nextReview").addEventListener("click", () => {
  current = (current + 1) % reviews.length;
  renderReview();
});

document.getElementById("prevReview").addEventListener("click", () => {
  current = (current - 1 + reviews.length) % reviews.length;
  renderReview();
});

renderReview();

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Auto-rotate reviews every 5 seconds
setInterval(() => {
  current = (current + 1) % reviews.length;
  renderReview();
}, 5000);
