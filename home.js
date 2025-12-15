/* ====== HERO SLIDER ====== */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
    slides.forEach(slide => slide.style.display = "none");
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";
}

showSlides();
setInterval(showSlides, 3000);


/* ====== TOUCH & CLICK HIGHLIGHT ====== */
document.querySelectorAll("img").forEach(img => {
    img.addEventListener("touchstart", () => {
        img.classList.add("highlight");
        setTimeout(() => img.classList.remove("highlight"), 300);
    });

    img.addEventListener("click", () => {
        img.classList.add("highlight");
        setTimeout(() => img.classList.remove("highlight"), 300);
    });
});

/* ====== MOBILE MENU ====== */
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}
