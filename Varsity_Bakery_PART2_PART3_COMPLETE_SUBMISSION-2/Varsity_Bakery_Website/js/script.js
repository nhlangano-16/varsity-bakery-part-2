
// Varsity Bakery - simple JavaScript for Part 3

const menuItems = [
  {name: "Breakfast", type: "Breakfast", price: "Check current menu"},
  {name: "Something Healthy", type: "Healthy", price: "Check current menu"},
  {name: "Sandwiches", type: "Sandwiches", price: "Check current menu"},
  {name: "Burgers", type: "Burgers", price: "Check current menu"},
  {name: "Subs", type: "Subs", price: "Check current menu"},
  {name: "Dogs & Batties", type: "Dogs & Batties", price: "Check current menu"},
  {name: "Ribs", type: "Ribs", price: "Check current menu"},
  {name: "Salad", type: "Salad", price: "Check current menu"},
  {name: "Pregos", type: "Pregos", price: "Check current menu"},
  {name: "Bowls", type: "Bowls", price: "Check current menu"},
  {name: "Chicken", type: "Chicken", price: "Check current menu"},
  {name: "Sides", type: "Sides", price: "Check current menu"},
  {name: "Extras", type: "Extras", price: "Check current menu"},
  {name: "Cold Drinks", type: "Cold Drinks", price: "Check current menu"}
];

function showProducts(search = "") {
  const list = document.getElementById("productList");
  if (!list) return;

  const text = search.toLowerCase().trim();
  const matches = menuItems.filter(item =>
    item.name.toLowerCase().includes(text) || item.type.toLowerCase().includes(text)
  );

  list.innerHTML = matches.map(item => `
    <article class="product-card">
      <h2>${item.name}</h2>
      <p>Varsity Bakery menu category.</p>
      <p class="price">${item.price}</p>
    </article>
  `).join("");

  const noProducts = document.getElementById("noProducts");
  if (noProducts) noProducts.hidden = matches.length !== 0;
}

const productSearch = document.getElementById("productSearch");
if (productSearch) {
  showProducts();
  productSearch.addEventListener("input", () => showProducts(productSearch.value));
}

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    if (!lightbox) return;
    lightboxImage.src = item.dataset.lightbox;
    lightboxImage.alt = item.querySelector("img").alt;
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.classList.add("open");
  });
});

document.querySelector(".close-lightbox")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
function closeLightbox() {
  if (lightbox) lightbox.classList.remove("open");
}

// Small helper for form errors
function setError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
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

    if (name.value.trim().length < 2) { setError("enquiryNameError", "Please enter your name."); valid = false; }
    if (!email.validity.valid) { setError("enquiryEmailError", "Please enter a valid email address."); valid = false; }
    if (!product.value) { setError("enquiryProductError", "Please choose a menu item."); valid = false; }
    if (!method.value) { setError("enquiryMethodError", "Please choose delivery or pickup."); valid = false; }
    if (message.value.trim().length < 10) { setError("enquiryMessageError", "Please enter at least 10 characters."); valid = false; }

    const result = document.getElementById("enquiryResult");
    if (!valid) {
      result.hidden = true;
      return;
    }

    const deliveryText = method.value === "delivery"
      ? "Delivery is available to selected areas from 10:00–18:00. Nearby delivery starts from R15."
      : "Pickup is available from the Menlopark store at 309 Lynwood Rd.";

    result.textContent = `Thanks ${name.value.trim()}. Your ${product.value} enquiry was received. ${deliveryText} Please confirm the current item price with the bakery before ordering.`;
    result.hidden = false;
    enquiryForm.reset();
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

    if (name.value.trim().length < 2) { setError("contactNameError", "Please enter your name."); valid = false; }
    if (!email.validity.valid) { setError("contactEmailError", "Please enter a valid email address."); valid = false; }
    if (!phone.validity.valid) { setError("contactPhoneError", "Please enter a valid phone number."); valid = false; }
    if (!type.value) { setError("messageTypeError", "Please choose a message type."); valid = false; }
    if (message.value.trim().length < 10) { setError("contactMessageError", "Please enter at least 10 characters."); valid = false; }

    const result = document.getElementById("contactResult");
    if (!valid) {
      result.hidden = true;
      return;
    }

    const subject = encodeURIComponent(`Varsity Bakery - ${type.value}`);
    const body = encodeURIComponent(
      `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\nPhone: ${phone.value.trim()}\n\nMessage:\n${message.value.trim()}`
    );
    result.textContent = "Your details are valid. Your email application will open with the message prepared for admin@varsitybakery.co.za.";
    result.hidden = false;
    window.location.href = `mailto:admin@varsitybakery.co.za?subject=${subject}&body=${body}`;
  });
}

// Leaflet map on the contact page
if (document.getElementById("map") && typeof L !== "undefined") {
  const map = L.map("map").setView([-25.7563, 28.2789], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  L.marker([-25.7563, 28.2789]).addTo(map)
    .bindPopup("<strong>Varsity Bakery</strong><br>309 Lynwood Rd, Menlopark")
    .openPopup();

  // The second marker represents the nearby delivery service area, not a second branch.
  L.circle([-25.7563, 28.2789], {
    radius: 1800
  }).addTo(map).bindPopup("Approximate nearby delivery service area");
}
