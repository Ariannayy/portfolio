// Scrittura "a macchina" menù iniziale
const text = "Explore my portfolio...";
const el = document.getElementById("typeText");

const speed = 80;   // velocità scrittura
const delay = 2000; // pausa tra una scrittura e l'altra

function typeLoop() {
  let i = 0;
  el.textContent = "";

  const interval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
      setTimeout(typeLoop, delay);
    }
  }, speed);
}
typeLoop();

// Timeline esperienze 
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-visible"); });
}, { threshold: 0.7 });
reveals.forEach(el => io.observe(el));

function updateLineFor(timelineId, progressId){
  const timeline = document.getElementById(timelineId);
  const progress = document.getElementById(progressId);
  if (!timeline || !progress) return;

  const rect = timeline.getBoundingClientRect();
  const viewH = window.innerHeight;
  const start = viewH * 0.2;

  const total = rect.height;
  const y = Math.min(Math.max(start - rect.top, 0), total);

  progress.style.height = `${y}px`;
}

function onScroll(){
  updateLineFor("xpTimelineWork", "xpLineProgressWork");
  updateLineFor("xpTimelineVol", "xpLineProgressVol");
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();

//ANIMAZIONI
const animated = document.querySelectorAll(".anim-up, .anim-right, .anim-down, .anim-left");

const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in-view");
      obs.unobserve(e.target); // una volta sola
    }
  });
}, { threshold: 0.5 });

animated.forEach(el => obs.observe(el));

