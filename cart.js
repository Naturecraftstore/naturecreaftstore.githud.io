// ================= CART INITIAL LOAD =================
document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
  const cartContainer = document.getElementById("cartContainer");
  const totalPriceEl = document.getElementById("totalPrice");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <p style="text-align:center;font-size:18px;">
        Your cart is empty 🛒
      </p>
    `;
    totalPriceEl.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">

        <div class="cart-details">
          <h3>${item.name}</h3>
          <p>Price: ₹${item.price}</p>

          <div class="quantity-controls">
            <button onclick="changeQuantity(${index}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${index}, 1)">+</button>
          </div>

          <p class="item-total">Item Total: ₹${itemTotal}</p>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;
  });

  totalPriceEl.textContent = total;
}

// ================= ADD TO CART (GLOBAL) =================
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(item => item.name === name);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart`);
}

// ================= QUANTITY CHANGE =================
function changeQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ================= REMOVE ITEM =================
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}
