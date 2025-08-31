// Ano no footer
document.getElementById("ano").textContent = new Date().getFullYear();

/* ===== Menu hambúrguer ===== */
const btnMenu = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
btnMenu?.addEventListener("click", () => {
  const open = menu.style.display === "flex";
  menu.style.display = open ? "none" : "flex";
  btnMenu.setAttribute("aria-expanded", String(!open));
});
// Fecha menu ao clicar num link (mobile)
menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  if (window.innerWidth < 840) menu.style.display = "none";
}));

/* ===== Voltar ao topo (scroll suave) ===== */
document.getElementById("voltar-topo")?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ===== Validação de formulário (inline + mensagens) ===== */
const form = document.getElementById("form-contato");
const validators = {
  nome: v => v.trim().length >= 2 || "Informe seu nome (mín. 2 letras).",
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Digite um e-mail válido.",
  mensagem: v => v.trim().length >= 10 || "Mensagem muito curta (mín. 10 caracteres)."
};

function showError(input, msg) {
  const small = input.parentElement.querySelector(".form__error");
  small.textContent = typeof msg === "string" ? msg : "";
  input.setAttribute("aria-invalid", msg ? "true" : "false");
}

form?.addEventListener("input", (e) => {
  const el = e.target;
  if (!(el instanceof HTMLElement)) return;
  const id = el.id;
  if (validators[id]) {
    const ok = validators[id](el.value);
    showError(el, ok === true ? "" : ok);
  }
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  ["nome","email","mensagem"].forEach(id => {
    const el = document.getElementById(id);
    const res = validators[id](el.value);
    if (res !== true) { ok = false; showError(el, res); }
    else showError(el, "");
  });
  if (ok) {
    alert("Mensagem enviada com sucesso!"); // Pode integrar com formspree ou backend depois
    form.reset();
    form.querySelectorAll(".form__error").forEach(s => s.textContent = "");
  }
});

/* ===== Modal de projetos ===== */
const openBtns = document.querySelectorAll(".btn--modal");
const modals = document.querySelectorAll(".modal");
const closeModal = (m) => { m.classList.remove("modal--open"); m.setAttribute("aria-hidden","true"); }
const openModal = (m) => { m.classList.add("modal--open"); m.setAttribute("aria-hidden","false"); }

openBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-modal");
    const modal = document.getElementById(id);
    if (modal) openModal(modal);
  });
});

modals.forEach(m => {
  m.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) closeModal(m);
  });
  m.querySelector(".modal__close")?.addEventListener("click", () => closeModal(m));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modals.forEach(closeModal);
});

/* ===== Scroll suave e seção ativa (scroll spy) ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const hash = a.getAttribute("href");
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

const sections = [...document.querySelectorAll("main section")];
const links = [...document.querySelectorAll(".nav__link")];

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = "#" + entry.target.id;
      links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === id));
    }
  });
}, { threshold: 0.6 });

sections.forEach(s => spy.observe(s));
