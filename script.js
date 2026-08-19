document.querySelectorAll(".faq-item button").forEach(button=>{
  button.addEventListener("click",()=>{
    const item=button.parentElement;
    item.classList.toggle("open");
    button.querySelector("b").textContent=item.classList.contains("open")?"−":"+";
  });
});

// Full promo strip flashes every 5 seconds.
setInterval(()=>{
  const promo=document.querySelector(".promo");
  if(!promo)return;
  promo.classList.remove("blinking");
  void promo.offsetWidth;
  promo.classList.add("blinking");
},5000);

// Google reviews: 3 cards visible, then slides to the next set automatically.
(()=>{
  const track=document.querySelector(".review-track");
  const dots=[...document.querySelectorAll(".review-dots span")];
  if(!track)return;

  let index=0;

  const getVisible=()=>3;
  const getMaxIndex=()=>{
    const cards=track.querySelectorAll(".review");
    return Math.max(cards.length-getVisible(),0);
  };

  const render=()=>{
    const first=track.querySelector(".review");
    if(!first)return;
    const gap=window.innerWidth<=700?10:14;
    const step=first.getBoundingClientRect().width+gap;
    const max=getMaxIndex();

    if(index>max)index=0;
    track.style.transform=`translateX(-${index*step}px)`;
    dots.forEach((dot,n)=>dot.classList.toggle("active",n===index));
  };

  dots[0]?.classList.add("active");
  setInterval(()=>{
    const max=getMaxIndex();
    index=index>=max?0:index+1;
    render();
  },4000);

  window.addEventListener("resize",render);
})();

// Our Work: one full-width image slides over to the next automatically.
(()=>{
  const track=document.querySelector(".work-track");
  if(!track)return;
  let index=0;
  const total=track.children.length;
  setInterval(()=>{
    index=(index+1)%total;
    track.style.transform=`translateX(-${index*100}%)`;
  },4000);
})();

// Services: first 8 show initially; next 8 appear after VIEW ALL.
document.querySelector(".service-toggle")?.addEventListener("click",function(){
  const list=document.querySelector(".service-list");
  const expanded=list.classList.toggle("expanded");
  this.textContent=expanded?"SHOW LESS":"VIEW ALL";
});

// Other areas: first 12 show initially; complete list appears after VIEW ALL.
document.querySelector(".areas-toggle")?.addEventListener("click",function(){
  const list=document.querySelector(".collapsed-areas");
  const expanded=list.classList.toggle("expanded");
  this.textContent=expanded?"SHOW LESS":"VIEW ALL";
});
