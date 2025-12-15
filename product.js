/* ================= MOBILE MENU ================= */
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

/* ================= SEARCH PRODUCTS ================= */
const searchInput = document.getElementById("product-search");

searchInput.addEventListener("keyup", function () {
  const filter = searchInput.value.toLowerCase();
  const products = document.getElementsByClassName("product-card");

  for (let i = 0; i < products.length; i++) {
    const title = products[i]
      .getElementsByClassName("product-title")[0]
      .innerText.toLowerCase();

    products[i].style.display = title.includes(filter) ? "block" : "none";
  }
});

/* ================= ADD TO CART ================= */
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart 🛒");
}

/* ================= BUY NOW ================= */
document.querySelectorAll(".buy-now").forEach(button => {
  button.addEventListener("click", () => {
    window.location.href = "Cart.html";
  });
});
