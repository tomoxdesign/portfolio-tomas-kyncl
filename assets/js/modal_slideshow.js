let slides = [];
let currentSlide = 0;

// preview obrázků v project-card
document.querySelectorAll(".project-card").forEach((card) => {
	const preview = card.querySelector(".preview");
	const images = Array.from(card.querySelectorAll(".project-slideshow img")).map((img) => img.src);
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

// otevření modalu
function openModal(projectElement) {
	slides = Array.from(projectElement.querySelectorAll(".project-slideshow img")).map((img) => img.src);
	currentSlide = 0;

	const modal = document.getElementById("modal");
	modal.classList.remove("hidden");
	modal.classList.add("flex");

	document.getElementById("modalTitle").innerText = projectElement.querySelector("h3").innerText;
	document.getElementById("modalDesc").innerText = projectElement.querySelector("p").innerText;

	const modalTags = document.getElementById("modalTags");
	modalTags.innerHTML = "";
	projectElement.querySelectorAll(".absolute.top-3.left-3 span").forEach((span) => {
		const tag = document.createElement("span");
		tag.className = "bg-gray-800/70 text-white text-xs px-2 py-1 rounded-full";
		tag.textContent = span.textContent;
		modalTags.appendChild(tag);
	});

	const modalLink = document.getElementById("modalLink");
	const projectLink = projectElement.querySelector("a");
	if (projectLink) {
		modalLink.href = projectLink.href;
		modalLink.textContent = projectLink.textContent;
		modalLink.classList.remove("hidden");
	} else {
		modalLink.classList.add("hidden");
	}

	showSlide();
}

// zavření modalu
function closeModal() {
	const modal = document.getElementById("modal");
	modal.classList.add("hidden");
	modal.classList.remove("flex");
}

// zobrazení slide
function showSlide() {
	const img = document.getElementById("modalImage");
	img.classList.remove("opacity-100");
	img.classList.add("opacity-0");

	setTimeout(() => {
		img.src = slides[currentSlide];
		img.classList.remove("opacity-0");
		img.classList.add("opacity-100");
		updateDots(); // aktualizace teček
	}, 100);
}

// tečky
function updateDots() {
	const dotsContainer = document.getElementById("modalDots");
	dotsContainer.innerHTML = "";

	slides.forEach((_, i) => {
		const dot = document.createElement("button");
		dot.className = "w-3 h-3 rounded-full transition " + (i === currentSlide ? "bg-indigo-400 scale-125" : "bg-gray-500 hover:bg-gray-400");
		dot.addEventListener("click", () => {
			currentSlide = i;
			showSlide();
		});
		dotsContainer.appendChild(dot);
	});
}

// šipky
function nextSlide() {
	currentSlide = (currentSlide + 1) % slides.length;
	showSlide();
}

function prevSlide() {
	currentSlide = (currentSlide - 1 + slides.length) % slides.length;
	showSlide();
}

// swipe pro mobily
let touchStartX = 0;
let touchEndX = 0;
document.getElementById("modalImage").addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});
document.getElementById("modalImage").addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});
function handleSwipe() {
	if (touchEndX < touchStartX - 50) nextSlide();
	if (touchEndX > touchStartX + 50) prevSlide();
}

// klávesy
document.addEventListener("keydown", (e) => {
	const modal = document.getElementById("modal");
	if (modal.classList.contains("hidden")) return;
	if (e.key === "Escape") closeModal();
	if (e.key === "ArrowRight") nextSlide();
	if (e.key === "ArrowLeft") prevSlide();
});
