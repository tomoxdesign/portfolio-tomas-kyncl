// modal_slideshow.js
let slides = [];
let currentSlide = 0;

document.querySelectorAll(".project-card").forEach((card) => {
  const preview = card.querySelector(".preview");
  const images = Array.from(
    card.querySelectorAll(".project-slideshow img")
  ).map((img) => img.src);
  let index = 0;
  let interval;

  preview.src = images[index];
  preview.style.transition = "opacity 0.8s ease-in-out, transform 8s ease-out";

  card.addEventListener("mouseenter", () => {
    interval = setInterval(() => {
      preview.style.opacity = 0;
      preview.style.transform = "scale(1)";

      setTimeout(() => {
        index = (index + 1) % images.length;
        preview.src = images[index];

        preview.style.opacity = 1;
        preview.style.transform = "scale(1.05)";
      }, 200);
    }, 3000);
  });

  card.addEventListener("mouseleave", () => {
    clearInterval(interval);
    index = 0;
    preview.src = images[index];
    preview.style.opacity = 1;
    preview.style.transform = "scale(1)";
  });
});

function openModal(projectElement) {
  slides = Array.from(
    projectElement.querySelectorAll(".project-slideshow img")
  ).map((img) => img.src);
  currentSlide = 0;

  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  document.getElementById("modalTitle").innerText =
    projectElement.querySelector("h3").innerText;
  document.getElementById("modalDesc").innerText =
    projectElement.querySelector("p").innerText;

  showSlide();
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function showSlide() {
  const img = document.getElementById("modalImage");
  img.classList.remove("opacity-100");
  img.classList.add("opacity-0");

  setTimeout(() => {
    img.src = slides[currentSlide];
    img.classList.remove("opacity-0");
    img.classList.add("opacity-100");
  }, 100);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide();
}

// Event listeners
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("modal");
  if (modal.classList.contains("hidden")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});
