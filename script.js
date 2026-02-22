const overlay = document.getElementById("lead-overlay");

const choiceModal = document.getElementById("lead-choice");
const choiceClose = document.getElementById("lead-choice-close");
const choicePlanLabel = document.getElementById("lead-choice-plan");
const goWhatsAppBtn = document.getElementById("lead-go-whatsapp");
const goFormBtn = document.getElementById("lead-go-form");

const formModal = document.getElementById("lead-form-modal");
const formClose = document.getElementById("lead-form-close");
const planSelect = document.getElementById("lead-plan-select");
const sendWaFromForm = document.getElementById("lead-send-whatsapp-from-form");
const leadForm = document.getElementById("lead-form");

let currentPlan = "Essencial";

const WHATSAPP_PHONE = "5561983645763";

// Monta mensagem padrão pro WhatsApp
function buildWhatsAppMessage(plan, extraListText = "") {
    const msg =
        `Olá! Tenho interesse em um site.

Plano: ${plan}
${extraListText ? "Extras: " + extraListText + "\n" : ""}
`;

    return encodeURIComponent(msg);
}

function openOverlay() {
    overlay?.classList.add("is-open");
    overlay?.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeOverlay() {
    overlay?.classList.remove("is-open");
    overlay?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function openModal(el) {
    if (!el) return;
    openOverlay();
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
}

function closeModal(el) {
    if (!el) return;
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
}

// Fecha tudo
function closeAll() {
    closeModal(choiceModal);
    closeModal(formModal);
    closeOverlay();
}

// Abre modal de escolha com plano selecionado
function openChoice(plan) {
    currentPlan = plan || "Essencial";
    if (choicePlanLabel) choicePlanLabel.textContent = currentPlan;
    openModal(choiceModal);
}

// Abre form com plano pré-selecionado
function openForm(plan) {
    currentPlan = plan || currentPlan || "Essencial";
    if (planSelect) planSelect.value = currentPlan;
    openModal(formModal);
}

// Abre WhatsApp com plano
function openWhatsApp(plan, extraListText = "") {
    const p = plan || currentPlan || "Essencial";
    const text = buildWhatsAppMessage(p, extraListText);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
    window.open(url, "_blank", "noopener");
}

// Clique fora fecha
overlay?.addEventListener("click", closeAll);

// ESC fecha
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
});

// Botões fechar
choiceClose?.addEventListener("click", closeAll);
formClose?.addEventListener("click", closeAll);

// Ações do modal de escolha
goWhatsAppBtn?.addEventListener("click", () => {
    closeAll();
    openWhatsApp(currentPlan);
});

goFormBtn?.addEventListener("click", () => {
    closeModal(choiceModal);
    openForm(currentPlan);
});

// Botão "Enviar no WhatsApp" dentro do formulário (pega extras marcados)
sendWaFromForm?.addEventListener("click", () => {
    const formData = new FormData(leadForm);

    const plan = formData.get("pacote") || currentPlan || "Essencial";

    const extras = formData.getAll("extras[]");
    const extrasText = extras.length ? extras.join(", ") : "";

    closeAll();
    openWhatsApp(plan, extrasText);
});

// ==============================
// INTEGRAÇÃO COM OS BOTÕES DOS PLANOS
// - Pega o título do card (h3) como plano selecionado
// ==============================
document.querySelectorAll(".plan-cta").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        // Encontra o plano pelo card
        const planCard = btn.closest(".plan");
        const planName = planCard?.querySelector("h3")?.textContent?.trim() || "Essencial";

        openChoice(planName);
    });
});

// ==============================
// SCROLL DO BOTÃO "Saiba mais" (mantido)
// ==============================
const btn = document.getElementById("meubotão");
const secao = document.getElementById("destino");

btn?.addEventListener("click", () => {
    secao?.scrollIntoView({ behavior: "smooth" });
});
