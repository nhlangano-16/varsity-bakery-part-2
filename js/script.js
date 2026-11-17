const menuItems = [
  {name: "Breakfast", group: "Morning", desc: "Hearty cooked breakfasts, omelettes, and toasted morning favourites served fresh.", price: "From R45 (confirm in-store)"},
  {name: "Something Healthy", group: "Light Meals", desc: "Wholesome wraps, fresh fruit options, and lighter low-GI meals.", price: "From R40 (confirm in-store)"},
  {name: "Sandwiches", group: "Bakery & Deli", desc: "Freshly baked white, brown, or rye bread filled with savoury toppings.", price: "From R30 (confirm in-store)"},
  {name: "Burgers", group: "Hot Grill", desc: "Flame-grilled beef and chicken burgers served on soft Varsity Bakery rolls.", price: "From R55 (confirm in-store)"},
  {name: "Subs", group: "Bakery & Deli", desc: "Oven-fresh sub rolls loaded with cold meats, cheese, and house sauces.", price: "From R48 (confirm in-store)"},
  {name: "Dogs & Batties", group: "Hot Grill", desc: "Classic hot dogs and savoury batties made fresh to order.", price: "From R35 (confirm in-store)"},
  {name: "Ribs", group: "Hot Grill", desc: "Tender basted pork ribs grilled and served with your choice of side.", price: "From R85 (confirm in-store)"},
  {name: "Salad", group: "Light Meals", desc: "Crisp garden, Greek, and chicken salads prepared daily.", price: "From R42 (confirm in-store)"},
  {name: "Pregos", group: "Hot Grill", desc: "Traditional Portuguese-style steak and chicken prego rolls.", price: "From R52 (confirm in-store)"},
  {name: "Bowls", group: "Light Meals", desc: "Balanced savoury rice and grain bowls topped with grilled protein.", price: "From R58 (confirm in-store)"},
  {name: "Chicken", group: "Hot Grill", desc: "Marinated grilled chicken portions, strips, and family meal packs.", price: "From R50 (confirm in-store)"},
  {name: "Sides", group: "Extras & Drinks", desc: "Golden slap chips, onion rings, garlic rolls, and fresh salads.", price: "From R20 (confirm in-store)"},
  {name: "Extras", group: "Extras & Drinks", desc: "Extra cheese, bacon, egg, sauces, and fresh bakery rolls.", price: "From R10 (confirm in-store)"},
  {name: "Cold Drinks", group: "Extras & Drinks", desc: "Chilled sodas, iced teas, bottled water, and fruit juices.", price: "From R15 (confirm in-store)"}
];

let activeGroup = "All";

function renderCategoryPills() {
  const container = document.getElementById("categoryPills");
  if (!container) return;
  const groups = ["All", ...new Set(menuItems.map(i => i.group))];
  container.innerHTML = groups.map(g =>
    `<button type="button" class="filter-pill ${g === activeGroup ? "active" : ""}" data-group="${g}">${g}</button>`
  ).join("");
  container.querySelectorAll(".filter-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      activeGroup = btn.dataset.group;
      renderCategoryPills();
      showProducts(document.getElementById("productSearch")?.value || "");
    });
  });
}

function showProducts(search = "") {
  const list = document.getElementById("productList");
  if (!list) return;

  const text = search.toLowerCase().trim();
  const matches = menuItems.filter(item => {
    const matchesGroup = activeGroup === "All" || item.group === activeGroup;
    const matchesText = item.name.toLowerCase().includes(text) ||
                        item.group.toLowerCase().includes(text) ||
                        item.desc.toLowerCase().includes(text);
    return matchesGroup && matchesText;
  });

  const sort = document.getElementById("productSort")?.value;
  if (sort === "asc" || sort === "desc") {
    matches.sort((a, b) => a.name.localeCompare(b.name) * (sort === "desc" ? -1 : 1));
  }
  document.getElementById("productCount").textContent = `Showing ${matches.length} of ${menuItems.length} menu categories.`;
  list.innerHTML = matches.map(item => `
    <article class="product-card">
      <small><strong>${item.group}</strong></small>
      <h2>${item.name}</h2>
      <p>${item.desc}</p>
      <p class="price">${item.price}</p>
    </article>
  `).join("");

  const noProducts = document.getElementById("noProducts");
  if (noProducts) noProducts.hidden = matches.length !== 0;
}

const productSearch = document.getElementById("productSearch");
if (productSearch) {
  renderCategoryPills();
  showProducts();
  productSearch.addEventListener("input", () => showProducts(productSearch.value));
  document.getElementById("productSort")?.addEventListener("change", () => showProducts(productSearch.value));
}

// Gallery lightbox with Next/Previous & Keyboard support
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCounter = document.getElementById("lightboxCounter");
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
let currentLightboxIndex = 0;
let lightboxTrigger;

function showLightboxSlide(index) {
  if (!galleryItems.length || !lightbox) return;
  currentLightboxIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentLightboxIndex];
  lightboxImage.src = item.dataset.lightbox;
  lightboxImage.alt = item.querySelector("img").alt;
  lightboxCaption.textContent = item.dataset.caption;
  if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${galleryItems.length}`;
}

const closeButton = document.querySelector(".close-lightbox");
galleryItems.forEach((item, idx) => {
  const open = () => {
    if (!lightbox) return;
    lightboxTrigger = item;
    showLightboxSlide(idx);
    lightbox.hidden = false;
    lightbox.classList.add("open");
    document.body.classList.add("modal-open");
    document.querySelector(".site-header").inert = true;
    document.querySelector(".site-footer").inert = true;
    document.querySelectorAll("main > :not(.lightbox)").forEach(el => el.inert = true);
    closeButton.focus();
  };
  item.addEventListener("click", open);
  item.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
  });
});

document.getElementById("prevLightbox")?.addEventListener("click", () => showLightboxSlide(currentLightboxIndex - 1));
document.getElementById("nextLightbox")?.addEventListener("click", () => showLightboxSlide(currentLightboxIndex + 1));
closeButton?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => {
  if (!lightbox || lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showLightboxSlide(currentLightboxIndex - 1);
  if (event.key === "ArrowRight") showLightboxSlide(currentLightboxIndex + 1);
});

function closeLightbox() {
  if (!lightbox || lightbox.hidden) return;
  lightbox.classList.remove("open");
  lightbox.hidden = true;
  document.body.classList.remove("modal-open");
  document.querySelectorAll("[inert]").forEach(el => el.inert = false);
  lightboxTrigger?.focus();
}

// POST URL-encoded fields to Netlify Forms and confirm HTTP success.
async function submitForm(form, result, success) {
  if (form.getAttribute("aria-busy") === "true") return;
  const button = form.querySelector('[type="submit"]');
  const label = button.textContent;
  const payload = new URLSearchParams(new FormData(form)).toString();
  form.setAttribute("aria-busy", "true");
  button.disabled = true;
  form.inert = true;
  button.textContent = "Sending…";
  result.hidden = false;
  result.classList.remove("submission-error");
  result.textContent = "Sending your message…";
  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload,
      signal: AbortSignal.timeout(20000)
    });
    if (!response.ok) throw new Error("Submission failed");
    success();
    result.focus();
  } catch {
    result.classList.add("submission-error");
    result.textContent = "Your message could not be confirmed. Your entries are still here. Please retry or contact the bakery directly.";
    result.focus();
  } finally {
    form.removeAttribute("aria-busy");
    form.inert = false;
    button.disabled = false;
    button.textContent = label;
  }
}

document.querySelectorAll("form[data-netlify]").forEach(form => {
  form.noValidate = true;
  form.addEventListener("input", () => {
    const result = document.getElementById(form.id.replace("Form", "Result"));
    if (result && form.getAttribute("aria-busy") !== "true") result.hidden = true;
    const copy = document.getElementById("contactEmailCopy");
    if (copy) copy.hidden = true;
  });
});

function setError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
  document.getElementById(id.replace(/Error$/, ""))?.setAttribute("aria-invalid", String(Boolean(message)));
}

// Enquiry form validation and response
const enquiryForm = document.getElementById("enquiryForm");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;

    ["enquiryNameError", "enquiryEmailError", "enquiryProductError", "enquiryMethodError", "enquiryMessageError"]
      .forEach(id => setError(id, ""));

    const name = document.getElementById("enquiryName");
    const email = document.getElementById("enquiryEmail");
    const product = document.getElementById("enquiryProduct");
    const method = document.getElementById("enquiryMethod");
    const message = document.getElementById("enquiryMessage");

    if (name.value.trim().length < 2) { setError("enquiryNameError", "Please enter your name (at least 2 characters)."); valid = false; }
    if (!email.validity.valid) { setError("enquiryEmailError", "Please enter a valid email address."); valid = false; }
    if (!product.value) { setError("enquiryProductError", "Please choose a menu category."); valid = false; }
    if (!method.value) { setError("enquiryMethodError", "Please choose delivery or pickup."); valid = false; }
    if (message.value.trim().length < 10) { setError("enquiryMessageError", "Please enter at least 10 characters."); valid = false; }

    const result = document.getElementById("enquiryResult");
    if (!valid) {
      result.hidden = true;
      event.target.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const deliveryText = method.value === "delivery"
      ? "Delivery is available to selected areas from 10:00–18:00 (from R15 nearby / R30 outer)."
      : "Pickup is available from the Menlopark store at 309 Lynwood Rd.";

    const confirmation = `Thank you, ${name.value.trim()}! Your enquiry regarding ${product.value} has been submitted. ${deliveryText} Our team will reply to ${email.value.trim()} to confirm availability and current pricing.`;
    const eqSubject = encodeURIComponent(`Varsity Bakery Enquiry - ${product.value} (${method.value})`);
    const eqBody = encodeURIComponent(`Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\nCategory: ${product.value}\nMethod: ${method.value}\n\nDetails:\n${message.value.trim()}`);
    const eqMailto = `mailto:admin@varsitybakery.co.za?subject=${eqSubject}&body=${eqBody}`;
    submitForm(enquiryForm, result, () => {
      result.innerHTML = `${confirmation} <br><a href="${eqMailto}" class="btn" style="display:inline-block;margin-top:.5rem;">Open Prepared Email to Bakery</a>`;
      enquiryForm.reset();
    });
  });
}

// Contact form validation and mailto preparation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;

    ["contactNameError", "contactEmailError", "contactPhoneError", "messageTypeError", "contactMessageError"]
      .forEach(id => setError(id, ""));

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const phone = document.getElementById("contactPhone");
    const type = document.getElementById("messageType");
    const message = document.getElementById("contactMessage");

    if (name.value.trim().length < 2) { setError("contactNameError", "Please enter your name (at least 2 characters)."); valid = false; }
    if (!email.validity.valid) { setError("contactEmailError", "Please enter a valid email address."); valid = false; }
    if (!phone.validity.valid || phone.value.replace(/\D/g, "").length < 7) { setError("contactPhoneError", "Please enter a valid phone number (at least 7 digits)."); valid = false; }
    if (!type.value) { setError("messageTypeError", "Please choose a message type."); valid = false; }
    if (message.value.trim().length < 10) { setError("contactMessageError", "Please enter at least 10 characters."); valid = false; }

    const result = document.getElementById("contactResult");
    if (!valid) {
      result.hidden = true;
      event.target.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const subject = encodeURIComponent(`Varsity Bakery - ${type.value}`);
    const body = encodeURIComponent(
      `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\nPhone: ${phone.value.trim()}\n\nMessage:\n${message.value.trim()}`
    );
    const emailUrl = `mailto:admin@varsitybakery.co.za?subject=${subject}&body=${body}`;
    document.getElementById("contactEmailCopy").hidden = true;
    submitForm(contactForm, result, () => {
      result.textContent = "Your message was submitted. You can also open a prepared email copy to admin@varsitybakery.co.za using the button above.";
      const copy = document.getElementById("contactEmailCopy");
      copy.href = emailUrl;
      copy.hidden = false;
      contactForm.reset();
    });
  });
}

// Leaflet map on the contact page
if (document.getElementById("map") && typeof L !== "undefined") {
  const map = L.map("map").setView([-25.7563, 28.2789], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  L.marker([-25.7563, 28.2789]).addTo(map)
    .bindPopup("<strong>Varsity Bakery (Main Store)</strong><br>309 Lynwood Rd, Menlopark, Pretoria")
    .openPopup();

  L.circle([-25.7563, 28.2789], {
    radius: 1800,
    color: "#6b3f24",
    fillColor: "#c96f3b",
    fillOpacity: 0.15
  }).addTo(map).bindPopup("<strong>Delivery Service Zone</strong><br>10:00–18:00 (From R15 nearby)");
}

// Reveal existing page content progressively
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.08 });
  document.querySelectorAll(".hero, .card, .location-card, details").forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

