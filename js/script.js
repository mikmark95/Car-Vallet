(() => {
  "use strict";

  /* ---------------------------------------------------------
     Dati: tariffe e mappatura modello auto -> categoria
     Tariffe indicative — DA CONFERMARE con dati reali del cliente.
     --------------------------------------------------------- */
  const RATES = { piccola: 6, media: 9, grande: 13 };

  const CAR_CATALOG = {
    piccola: [
      "Fiat 500", "Fiat Panda", "Fiat Punto", "Fiat 500e", "Toyota Aygo",
      "Volkswagen up!", "Smart Fortwo", "Smart Forfour", "Peugeot 108",
      "Peugeot 208", "Citroën C1", "Citroën C3", "Kia Picanto", "Hyundai i10",
      "Hyundai i20", "Renault Twingo", "Renault Clio", "Lancia Ypsilon",
      "Ford Fiesta", "Opel Corsa", "Seat Ibiza", "Toyota Yaris", "Mini Cooper"
    ],
    media: [
      "Volkswagen Golf", "Volkswagen Polo", "Volkswagen T-Roc", "Volkswagen Tiguan",
      "Ford Focus", "Ford Puma", "Ford Kuga", "Opel Astra", "Opel Crossland",
      "Fiat Tipo", "Renault Megane", "Renault Captur", "Peugeot 308", "Peugeot 2008",
      "Peugeot 3008", "Toyota Corolla", "Toyota C-HR", "Toyota RAV4", "Honda Civic",
      "Honda CR-V", "Skoda Octavia", "Skoda Karoq", "Alfa Romeo Giulietta",
      "Alfa Romeo Giulia", "Citroën C4", "Citroën C5 Aircross", "Seat Leon",
      "Seat Ateca", "Mazda 3", "Mazda CX-5", "BMW Serie 1", "BMW Serie 3",
      "Mercedes Classe A", "Mercedes Classe C", "Audi A3", "Audi A4", "Audi Q3",
      "Nissan Qashqai", "Nissan Juke", "Hyundai Tucson", "Kia Sportage", "Jeep Compass"
    ],
    grande: [
      "BMW X5", "BMW X6", "BMW X7", "BMW Serie 5", "BMW Serie 7", "Mercedes GLE",
      "Mercedes GLS", "Mercedes Classe E", "Mercedes Classe S", "Mercedes Classe V",
      "Audi Q5", "Audi Q7", "Audi Q8", "Audi A6", "Audi A8", "Volvo XC60",
      "Volvo XC90", "Land Rover Range Rover", "Land Rover Discovery",
      "Land Rover Defender", "Jeep Grand Cherokee", "Toyota Land Cruiser",
      "Toyota Highlander", "Porsche Cayenne", "Porsche Macan", "Maserati Levante",
      "Maserati Ghibli", "Fiat Ducato", "Volkswagen Multivan", "Volkswagen Touareg",
      "Skoda Kodiaq", "Peugeot 5008", "Renault Espace", "Ford S-Max", "Ford Galaxy"
    ]
  };

  const MODEL_LOOKUP = new Map();
  Object.entries(CAR_CATALOG).forEach(([category, models]) => {
    models.forEach(model => MODEL_LOOKUP.set(model.toLowerCase(), category));
  });

  /* ---------------------------------------------------------
     Header: sfondo su scroll + menu mobile
     --------------------------------------------------------- */
  const header = document.getElementById("site-header");
  const onScrollHeader = () => header.classList.toggle("scrolled", window.scrollY > 12);
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  const navToggle = document.getElementById("nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  navToggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
  });
  mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }));

  /* ---------------------------------------------------------
     Back to top
     --------------------------------------------------------- */
  const toTop = document.getElementById("to-top");
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("visible", window.scrollY > 600);
  }, { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(".reveal");
  revealTargets.forEach((el, i) => el.style.setProperty("--i", i % 6));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("in-view"));
  }

  /* ---------------------------------------------------------
     Datalist modelli auto
     --------------------------------------------------------- */
  const datalist = document.getElementById("car-models");
  const allModels = [...CAR_CATALOG.piccola, ...CAR_CATALOG.media, ...CAR_CATALOG.grande].sort((a, b) => a.localeCompare(b, "it"));
  datalist.innerHTML = allModels.map(m => `<option value="${m}"></option>`).join("");

  /* ---------------------------------------------------------
     Form di prenotazione
     --------------------------------------------------------- */
  const form = document.getElementById("booking-form");
  const carModelInput = document.getElementById("carmodel");
  const modelHint = document.getElementById("model-hint");
  const categoryInput = document.getElementById("category");
  const pills = Array.from(document.querySelectorAll("#category-pills .pill"));
  const dropoffInput = document.getElementById("dropoff");
  const pickupInput = document.getElementById("pickup");

  const tsCategory = document.getElementById("ts-category");
  const tsModel = document.getElementById("ts-model");
  const tsDays = document.getElementById("ts-days");
  const tsRate = document.getElementById("ts-rate");
  const tsTotal = document.getElementById("ts-total");
  const tsCode = document.getElementById("ts-code");

  const CATEGORY_LABEL = { piccola: "Piccola", media: "Media", grande: "Grande" };

  // Imposta i valori minimi delle date su "ora"
  function toLocalInputValue(date) {
    const pad = n => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  const now = new Date();
  dropoffInput.min = toLocalInputValue(now);

  function setCategory(value, { auto = false } = {}) {
    categoryInput.value = value;
    pills.forEach(p => {
      const active = p.dataset.value === value;
      p.setAttribute("aria-checked", String(active));
      p.classList.toggle("auto-detected", active && auto);
    });
    clearFieldError("category");
    updateSummary();
  }

  pills.forEach(pill => {
    pill.addEventListener("click", () => setCategory(pill.dataset.value, { auto: false }));
  });

  carModelInput.addEventListener("input", () => {
    const raw = carModelInput.value.trim().toLowerCase();
    if (!raw) {
      modelHint.textContent = "Digita il modello: la categoria si seleziona da sola. Puoi correggerla qui sotto in ogni momento.";
      updateSummary();
      return;
    }
    const exact = MODEL_LOOKUP.get(raw);
    if (exact) {
      setCategory(exact, { auto: true });
      modelHint.textContent = `Categoria rilevata automaticamente: ${CATEGORY_LABEL[exact]}.`;
    } else {
      modelHint.textContent = "Modello non in elenco: seleziona tu la categoria qui sotto.";
      updateSummary();
    }
  });

  pickupInput.addEventListener("change", () => {
    if (dropoffInput.value) {
      pickupInput.min = dropoffInput.value;
    }
  });
  dropoffInput.addEventListener("change", () => {
    pickupInput.min = dropoffInput.value;
    updateSummary();
  });
  pickupInput.addEventListener("input", updateSummary);

  function computeDays() {
    if (!dropoffInput.value || !pickupInput.value) return null;
    const start = new Date(dropoffInput.value);
    const end = new Date(pickupInput.value);
    const diffMs = end - start;
    if (diffMs <= 0) return null;
    return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  }

  let displayedTotal = 0;
  function animateTotal(target) {
    const start = displayedTotal;
    const delta = target - start;
    if (delta === 0) return;
    const duration = 500;
    const startTime = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(start + delta * eased);
      tsTotal.textContent = `€${value}`;
      if (t < 1) requestAnimationFrame(tick);
      else displayedTotal = target;
    }
    requestAnimationFrame(tick);
  }

  function updateSummary() {
    const category = categoryInput.value;
    const model = carModelInput.value.trim();
    const days = computeDays();

    tsCategory.textContent = category ? CATEGORY_LABEL[category] : "—";
    tsModel.textContent = model || "—";
    tsDays.textContent = days ? `${days} ${days === 1 ? "giorno" : "giorni"}` : "—";
    tsRate.textContent = category ? `€${RATES[category]}/giorno` : "—";

    const total = (category && days) ? RATES[category] * days : 0;
    animateTotal(total);
  }

  /* ---------------------------------------------------------
     Validazione
     --------------------------------------------------------- */
  const ERROR_MESSAGES = {
    fullname: "Inserisci nome e cognome.",
    email: "Inserisci un indirizzo email valido.",
    phone: "Inserisci un numero di telefono.",
    dropoff: "Scegli data e ora di consegna.",
    pickup: "Il ritiro deve essere successivo alla consegna.",
    carmodel: "Indica il modello della tua auto.",
    category: "Seleziona la categoria dell'auto."
  };

  function setFieldError(name, message) {
    const errorEl = document.getElementById(`err-${name}`);
    const fieldEl = errorEl ? errorEl.closest(".field") : null;
    if (errorEl) errorEl.textContent = message || "";
    if (fieldEl) fieldEl.classList.toggle("has-error", Boolean(message));
  }
  function clearFieldError(name) { setFieldError(name, ""); }

  function validate() {
    let valid = true;
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!fullname) { setFieldError("fullname", ERROR_MESSAGES.fullname); valid = false; }
    else clearFieldError("fullname");

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) { setFieldError("email", ERROR_MESSAGES.email); valid = false; }
    else clearFieldError("email");

    if (!phone) { setFieldError("phone", ERROR_MESSAGES.phone); valid = false; }
    else clearFieldError("phone");

    if (!dropoffInput.value) { setFieldError("dropoff", ERROR_MESSAGES.dropoff); valid = false; }
    else clearFieldError("dropoff");

    const days = computeDays();
    if (!pickupInput.value || !days) { setFieldError("pickup", ERROR_MESSAGES.pickup); valid = false; }
    else clearFieldError("pickup");

    if (!carModelInput.value.trim()) { setFieldError("carmodel", ERROR_MESSAGES.carmodel); valid = false; }
    else clearFieldError("carmodel");

    if (!categoryInput.value) { setFieldError("category", ERROR_MESSAGES.category); valid = false; }
    else clearFieldError("category");

    return valid;
  }

  function generateBookingCode() {
    const now = new Date();
    const y = String(now.getFullYear()).slice(2);
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `CV-${y}${m}-${rand}`;
  }

  function formatDateTime(value) {
    if (!value) return "—";
    const d = new Date(value);
    return d.toLocaleString("it-IT", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  /* ---------------------------------------------------------
     Modal di conferma
     --------------------------------------------------------- */
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalClose = document.getElementById("modal-close");
  const modalCode = document.getElementById("modal-code");
  const modalSummary = document.getElementById("modal-summary");
  const modalMailto = document.getElementById("modal-mailto");
  let lastFocused = null;

  function openModal(bookingData) {
    modalCode.textContent = bookingData.code;
    modalSummary.innerHTML = `
      <div><dt>Nome</dt><dd>${escapeHtml(bookingData.fullname)}</dd></div>
      <div><dt>Categoria</dt><dd>${CATEGORY_LABEL[bookingData.category]}</dd></div>
      <div><dt>Modello</dt><dd>${escapeHtml(bookingData.carmodel)}</dd></div>
      <div><dt>Consegna</dt><dd>${formatDateTime(bookingData.dropoff)}</dd></div>
      <div><dt>Ritiro</dt><dd>${formatDateTime(bookingData.pickup)}</dd></div>
      <div><dt>Totale stimato</dt><dd>€${bookingData.total}</dd></div>
    `;
    const subject = encodeURIComponent(`Richiesta prenotazione CarVallet — ${bookingData.code}`);
    const body = encodeURIComponent(
      `Nome: ${bookingData.fullname}\n` +
      `Email: ${bookingData.email}\n` +
      `Telefono: ${bookingData.phone}\n` +
      `Volo: ${bookingData.flight || "—"}\n` +
      `Modello auto: ${bookingData.carmodel}\n` +
      `Categoria: ${CATEGORY_LABEL[bookingData.category]}\n` +
      `Consegna: ${formatDateTime(bookingData.dropoff)}\n` +
      `Ritiro: ${formatDateTime(bookingData.pickup)}\n` +
      `Totale stimato: €${bookingData.total}\n` +
      `Note: ${bookingData.notes || "—"}\n` +
      `Codice tagliando: ${bookingData.code}`
    );
    modalMailto.href = `mailto:prenotazioni@carvallet.it?subject=${subject}&body=${body}`;

    lastFocused = document.activeElement;
    modalBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    modalBackdrop.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => { if (e.target === modalBackdrop) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("open")) closeModal();
  });

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------------------------------------------------------
     Submit
     --------------------------------------------------------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = form.querySelector(".has-error input, .has-error textarea");
      if (firstError) firstError.focus();
      return;
    }
    const days = computeDays();
    const category = categoryInput.value;
    const total = RATES[category] * days;

    const bookingData = {
      code: generateBookingCode(),
      fullname: document.getElementById("fullname").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      flight: document.getElementById("flight").value.trim(),
      dropoff: dropoffInput.value,
      pickup: pickupInput.value,
      carmodel: carModelInput.value.trim(),
      category,
      notes: document.getElementById("notes").value.trim(),
      total
    };

    tsCode.textContent = bookingData.code;
    openModal(bookingData);
  });

  /* ---------------------------------------------------------
     Footer year
     --------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     "Scegli categoria" dalle card prezzi
     --------------------------------------------------------- */
  document.querySelectorAll(".price-pick").forEach(link => {
    link.addEventListener("click", () => {
      const value = link.dataset.pick;
      window.setTimeout(() => setCategory(value, { auto: false }), 350);
    });
  });

  updateSummary();
})();
