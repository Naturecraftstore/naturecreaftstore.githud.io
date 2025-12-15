// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
}

// Change main image when thumbnail is clicked
function changeImage(productId, thumb) {
  const mainImage = document.getElementById(`main-${productId}`);
  mainImage.src = thumb.src;

  // Remove active class from other thumbnails
  const thumbs = thumb.parentElement.querySelectorAll(".thumb");
  thumbs.forEach(t => t.classList.remove("active"));

  // Add active class to clicked thumbnail
  thumb.classList.add("active");
}
