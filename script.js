const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

function startMarquee() {
  const marquee = document.getElementById('marquee');
  if (!marquee) return;

  const track = marquee.querySelector('.logos');
  if (!track) return;

  if (marquee.dataset.started === "1") return;
  marquee.dataset.started = "1";

  marquee.appendChild(track.cloneNode(true));

  marquee.scrollLeft = 0;
  let x = 0;
  const speed = 0.6;

  function tick() {
    x += speed;
    marquee.scrollLeft = x;
    if (x >= track.scrollWidth) {
      x = 0;
      marquee.scrollLeft = 0;
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
window.addEventListener('load', startMarquee);

try {
  if (window.emailjs) emailjs.init('U4HDf3ByQer86Jszs');
} catch (e) {}

(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const btn = document.getElementById('send-btn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nom = (data.get('nom') || '').trim();
    const prenom = (data.get('prenom') || '').trim();
    const email = (data.get('email') || '').trim();
    const message = (data.get('message') || '').trim();

    const lang = localStorage.getItem("lang") || "fr";

    if (!nom || !prenom || !email || !message) {
      status.textContent = (lang === "en") ? "Please fill in all fields." : "Merci de remplir tous les champs.";
      return;
    }

    status.textContent = (lang === "en") ? "Sending..." : "Envoi en cours...";
    btn.disabled = true;
    btn.textContent = (lang === "en") ? "Sending..." : "Envoi...";

    try {
      await emailjs.send('service_a4pacn9', 'template_qq1rr78', { nom, prenom, email, message });
      status.textContent = (lang === "en") ? "Message sent. Thank you!" : "Message envoyé. Merci !";
      form.reset();
    } catch (err) {
      status.textContent = (lang === "en") ? "Error while sending. Please try again later." : "Erreur lors de l'envoi. Réessaie plus tard.";
    } finally {
      btn.disabled = false;
      btn.textContent = (lang === "en") ? "Send" : "Envoyer";
    }
  });
})();

try {
  if (window.Swiper) {
    new Swiper(".mySwiper", {
      loop: true,
      grabCursor: true,
      speed: 650,
      autoplay: { delay: 3200, disableOnInteraction: false },
      keyboard: { enabled: true },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: {
        0:    { slidesPerView: 1.05, spaceBetween: 14 },
        701:  { slidesPerView: 1,    spaceBetween: 14 },
        1024: { slidesPerView: 2,    spaceBetween: 22 }
      }
    });
  }
} catch (e) {}

const i18n = {
  fr: {
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_projects: "Projets",
    nav_skills: "Compétences",
    nav_contact: "Contact",
    menu: "Menu",
    hero_text: "Développeur web et web mobile — front-end et back-end. Conception d’applications et de sites performants, modernes et responsives.",
    hero_cta: "Voir mes projets",
    about_title: "À propos",
    about_text: "Développeur web et web mobile, je travaille aussi bien sur la partie front-end que back-end. J’accorde une importance particulière au responsive, à la structure du code et à la qualité des interfaces.",
    about_cv: "Télécharger mon CV",
    projects_title: "Projets",
    p1_title: "Boulangerie — site vitrine",
    p1_desc: "HTML / CSS — site responsive avec une mise en page claire et professionnelle.",
    p2_title: "Application météo",
    p2_desc: "JavaScript & API — récupération et affichage dynamique de données météo.",
    p3_title: "ClickFast",
    p3_desc: "JavaScript — mini-jeu de rapidité basé sur le clic et la gestion du temps.",
    see_site: "Voir le site",
    skills_title: "Compétences",
    contact_title: "Contact",
    ph_lastname: "Nom",
    ph_firstname: "Prénom",
    ph_email: "Email",
    ph_message: "Votre message...",
    send: "Envoyer",
    footer_role: "Développeur Web & Web Mobile"
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_projects: "Projects",
    nav_skills: "Skills",
    nav_contact: "Contact",
    menu: "Menu",
    hero_text: "Web & mobile developer — front-end and back-end. I build modern, responsive and high-performance websites and applications.",
    hero_cta: "View my projects",
    about_title: "About",
    about_text: "Web & mobile developer working on both front-end and back-end. I focus on responsive design, clean structure and high-quality interfaces.",
    about_cv: "Download my CV",
    projects_title: "Projects",
    p1_title: "Bakery — showcase website",
    p1_desc: "HTML / CSS — responsive layout with a clean, professional structure.",
    p2_title: "Weather app",
    p2_desc: "JavaScript & API — fetch and display live weather data dynamically.",
    p3_title: "ClickFast",
    p3_desc: "JavaScript — speed clicking mini-game with a simple timer logic.",
    see_site: "View website",
    skills_title: "Skills",
    contact_title: "Contact",
    ph_lastname: "Last name",
    ph_firstname: "First name",
    ph_email: "Email",
    ph_message: "Your message...",
    send: "Send",
    footer_role: "Web & Mobile Developer"
  }
};

function applyLanguage(lang) {
  const dict = i18n[lang] || i18n.fr;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.documentElement.lang = (lang === "en") ? "en" : "fr";
  localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang") || "fr";
  applyLanguage(saved);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
});

/* Scroll propre + fermeture offcanvas au clic (sans casser Bootstrap) */
document.addEventListener("DOMContentLoaded", () => {
  const offcanvasEl = document.getElementById("menuMobile");
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();

      if (offcanvasEl && window.bootstrap && bootstrap.Offcanvas) {
        const instance = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (instance) instance.hide();
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", hash);
    });
  });
});
