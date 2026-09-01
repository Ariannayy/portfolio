// Scrittura "a macchina" menù iniziale
const text = "Explore my portfolio...";
const el = document.getElementById("typeText");

if (el){
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
}


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

// Velocità di scroll menù a cartelle
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY;
    const duration = 1000; // millisecondi

    const startTime = performance.now();

    function scrollAnimation(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // effetto "ease-in-out"
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, start + (end - start) * ease);

      if (progress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    }

    requestAnimationFrame(scrollAnimation);
  });
});

// VISUALIZZAZIONE SECONDA PAGINA (projects.html)
$(function () {
  // esegui solo su projects.html
  if ($("#projects").length === 0) return;

  const $projects = $(".progetti");
  const $divisori = $("hr.divisore");

  // tutto nascosto all'avvio
  $projects.hide();
  $divisori.hide();

  // helper: reset animazioni ogni volta (anche al riclick)
  function replayInView($els) {
    $els.removeClass("in-view");

    // forza reflow (così il browser "vede" il reset)
    void $els.get(0)?.offsetHeight;

    // riaggiungi classe subito dopo
    setTimeout(() => $els.addClass("in-view"), 20);
  }

  function showGroup(groupClass) {
    const $groupProjects = $projects.filter(groupClass);
    const $groupDivisori = $divisori.filter(groupClass);

    const $otherProjects = $projects.not(groupClass);
    const $otherDivisori = $divisori.not(groupClass);

    // nascondi altro gruppo (progetti + divisori)
    $otherProjects.stop(true, true).hide();
    $otherDivisori.stop(true, true).hide();

    // mostra gruppo scelto
    $groupProjects.stop(true, true).fadeIn(250);
    $groupDivisori.stop(true, true).fadeIn(250);

    // rigioca animazioni (progetti + divisori)
    replayInView($groupProjects.add($groupDivisori));

    // scroll al primo elemento del gruppo
    const $first = $groupProjects.first();
    if ($first.length) {
      $("html, body")
        .stop(true)
        .animate({ scrollTop: $first.offset().top - 40 }, 400);
    }
  }

  $("#opzione1").on("click", () => showGroup(".gruppo1"));
  $("#opzione2").on("click", () => showGroup(".gruppo2"));
});

//MENU 
$(function(){
  const $stickyNav = $('.nav--sticky');
  const $header = $('.hero');

  if (!$stickyNav.length || !$header.length) return;

  const triggerPoint = $header.outerHeight() - 20;

  $(window).on('scroll', function(){
    if ($(window).scrollTop() > triggerPoint){
      $stickyNav.addClass('is-visible');
    } else {
      $stickyNav.removeClass('is-visible');
    }
  });
});


