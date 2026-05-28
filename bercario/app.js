/* Berçário Grow Up — interações */

const WA_NUMBER = "5511939466440";
const WA_MSG_DEFAULT = "Olá! Gostaria de saber mais sobre o Berçário da Grow Up.";
const waLink = (msg = WA_MSG_DEFAULT) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

document.querySelectorAll("[data-wa]").forEach((el) => {
  const msg = el.getAttribute("data-wa-msg") || WA_MSG_DEFAULT;
  el.setAttribute("href", waLink(msg));
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

/* Header scroll */
const header = document.querySelector(".header");
const onScroll = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 8);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Reveal on scroll */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
}

/* Modal → WhatsApp (sem backend) */
const modal = document.getElementById("schedule-modal");
const modalForm = document.getElementById("schedule-form");
const modalBody = document.getElementById("modal-body");
const modalSuccess = document.getElementById("modal-success");

function openModal() {
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (modalBody) modalBody.style.display = "block";
  if (modalSuccess) modalSuccess.style.display = "none";
  setTimeout(() => {
    const first = modal.querySelector("input, select");
    if (first) first.focus();
  }, 60);
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-open-modal]").forEach((b) => {
  b.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });
});
document.querySelectorAll("[data-close-modal]").forEach((b) => {
  b.addEventListener("click", closeModal);
});
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("open")) closeModal();
});

if (modalForm) {
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(modalForm);
    const summary = `Olá! Vim pelo site. Gostaria de agendar uma visita.
Nome: ${data.get("name")}
WhatsApp: ${data.get("phone")}
Idade do bebê: ${data.get("age")}
Turno desejado: ${data.get("period")}`;

    if (modalBody) modalBody.style.display = "none";
    if (modalSuccess) modalSuccess.style.display = "block";
    const waBtn = document.getElementById("success-wa");
    if (waBtn) waBtn.setAttribute("href", waLink(summary));
  });
}
