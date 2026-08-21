document.querySelectorAll(".faq-item button").forEach(button=>{
  button.addEventListener("click",()=>{
    const item=button.parentElement;
    item.classList.toggle("open");
    button.querySelector("b").textContent=item.classList.contains("open")?"−":"+";
  });
});


// Promo strip: white light flash every 5 seconds.
setInterval(() => {
  const promo = document.querySelector(".promo");
  if (!promo) return;
  promo.classList.remove("blinking");
  void promo.offsetWidth;
  promo.classList.add("blinking");
}, 5000);

// Google reviews slider — moves automatically.
(() => {
  const track = document.querySelector(".review-track");
  const dots = [...document.querySelectorAll(".review-dots span")];
  if (!track) return;

  let index = 0;

  const moveReviews = () => {
    const cards = [...track.querySelectorAll(".review")];
    if (!cards.length) return;

    const mobile = window.innerWidth <= 700;
    const visible = mobile ? 1 : 3;
    const maxIndex = Math.max(cards.length - visible, 0);
    index = index >= maxIndex ? 0 : index + 1;

    const gap = mobile ? 10 : 14;
    const step = cards[0].getBoundingClientRect().width + gap;
    track.style.transform = `translateX(-${index * step}px)`;
    dots.forEach((dot, n) => dot.classList.toggle("active", n === index));
  };

  dots[0]?.classList.add("active");
  setInterval(moveReviews, 4000);
  window.addEventListener("resize", () => {
    index = 0;
    track.style.transform = "translateX(0)";
  });
})();

// Our Work: one image slides over to the next automatically.
(() => {
  const track = document.querySelector(".work-track");
  if (!track) return;
  let i = 0;
  const total = track.children.length;
  setInterval(() => {
    i = (i + 1) % total;
    track.style.transform = `translateX(-${i*100}%)`;
  }, 4000);
})();

// Home Services: show the first 8 cards, then reveal the rest with VIEW ALL.
document.querySelector(".services-toggle")?.addEventListener("click", function(){
  const grid = document.querySelector("#services .service-grid");
  if (!grid) return;
  grid.classList.toggle("expanded");
  const expanded = grid.classList.contains("expanded");
  this.textContent = expanded ? "SHOW LESS" : "VIEW ALL";
});

// Other areas: show the complete list on View All.
document.querySelector(".areas-toggle")?.addEventListener("click", function(){
  const list=document.querySelector(".collapsed-areas");
  list.classList.toggle("expanded");
  this.textContent=list.classList.contains("expanded") ? "SHOW LESS" : "VIEW ALL";
});
