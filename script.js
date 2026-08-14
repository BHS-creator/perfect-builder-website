const menuToggle=document.getElementById("menuToggle");
const mainNav=document.getElementById("mainNav");

menuToggle.addEventListener("click",()=>{
  const open=mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",open);
});
document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>mainNav.classList.remove("open")));

const cards=[...document.querySelectorAll(".review-card")];
const dots=document.getElementById("reviewDots");
let current=0;

cards.forEach((_,i)=>{
  const d=document.createElement("span");
  d.className="review-dot"+(i===0?" active":"");
  d.addEventListener("click",()=>showReview(i));
  dots.appendChild(d);
});

function showReview(i){
  current=(i+cards.length)%cards.length;
  cards.forEach((c,n)=>c.classList.toggle("active",n===current));
  [...dots.children].forEach((d,n)=>d.classList.toggle("active",n===current));
}
document.getElementById("prevReview").addEventListener("click",()=>showReview(current-1));
document.getElementById("nextReview").addEventListener("click",()=>showReview(current+1));

setInterval(()=>showReview(current+1),6000);

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("show");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("year").textContent=new Date().getFullYear();
