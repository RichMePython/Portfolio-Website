const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const toast = document.querySelector(".toast");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const currentPath = window.location.pathname.replace(/\\/g, "/");
document.querySelectorAll(".site-nav a").forEach((link) => {
  const href = link.getAttribute("href");
  if (!href) return;

  const normalizedHref = href.replace(/^\.\.\//, "").replace(/^\.\//, "");
  const pageName = normalizedHref.split("#")[0];

  if (
    currentPath.endsWith(`/${pageName}`) ||
    (currentPath.endsWith("/") && pageName === "index.html") ||
    (currentPath.includes("/case-studies/") && pageName === "projects.html")
  ) {
    link.classList.add("is-active");
  }
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

let toastTimer;
const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
};

document.querySelectorAll("[data-placeholder]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (href === "#") {
      event.preventDefault();
      showToast(link.dataset.placeholder || "This profile link is ready for the final URL.");
    }
  });
});
