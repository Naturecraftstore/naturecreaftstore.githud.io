// ====== Hamburger Menu ======
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('show');
}

// ====== Product Data ======
const products = {
  AS1: {
    name: "Aloe Vera Soap",
    price: 149,
    description: "Pure herbal soap made from aloe vera extracts, natural oils, and sandalwood.",
    images: ["images2/AS1.png","images2/AS2.png","images2/AS3.png"],
    rating: 4.2
  },
  LS1: {
    name: "Lavender Bliss Soap",
    price: 259,
    description: "Pure herbal soap made from Lavender extracts and essential oils.",
    images: ["images2/LS1.png","images2/LS2.png","images2/LS3.png"],
    rating: 4.5
  },
  RS1: {
    name: "Rose Bliss Soap",
    price: 299,
    description: "Pure herbal soap made from Rose extracts and Rose oils.",
    images: ["images2/RS1.jpeg","images2/RS2.png","images2/RS3.png"],
    rating: 4.3
  },
  TS1: {
    name: "Turmeric Glow Soap",
    price: 149,
    description: "Pure herbal soap made from Turmeric extracts and natural oils.",
    images: ["images2/TS1.jpeg","images2/TS2.png","images2/TS3.png"],
    rating: 4.6
  },
  mc1: {
    name: "Nourish & Shine Hair Oil",
    price: 399,
    description: "Hair oil prepared from Meethi seeds and curry leaves.",
    images: ["images2/mc1.jpeg","images2/mc2.png"],
    rating: 4.4
  },
  mr1: {
    name: "Nourish & Shine Hair oil",
    price: 299,
    description: "Hair oil prepared from Meethi seeds and Rosemary.",
    images: ["images2/mr1.jpeg","images2/mr2.png"],
    rating: 4.1
  },
  Rp1: {
    name: "Rose Hair Oil",
    price: 220,
    description: "Hair oil prepared from pure Rose essential oils.",
    images: ["images2/ro1.jpeg","images2/ro2.png"],
    rating: 4.3
  },
  l1: {
    name: "Lemon Brightening Face Pack",
    price: 249,
    description: "Chemical-free face pack made from Kaolin clay and Lemon peel.",
    images: ["images2/l1.jpeg","images2/l2.png","images2/l3.png"],
    rating: 4.4
  },
  on1: {
    name: "Orange & Neem Face Pack",
    price: 399,
    description: "Face pack prepared from Orange peel powder and Neem.",
    images: ["images2/on1.jpeg","images2/on2.png","images2/on3.png"],
    rating: 4.2
  },
  mm1: {
    name: "Multani Mitti Face Pack",
    price: 129,
    description: "Chemical-free face pack made from Multani Mitti powder.",
    images: ["images2/mm1.jpeg","images2/mm2.png","images2/mm3.png"],
    rating: 4.1
  },
  Rp1: {
    name: "Rose Powder Face Pack",
    price: 349,
    description: "Natural face pack made from pure Rose powder.",
    images: ["images2/rp1.jpeg","images2/rp2.png","images2/rp3.png"],
    rating: 4.5
  },
  HS1: {
    name: "Hibiscus Shampoo",
    price: 399,
    description: "Hibiscus shampoo that promotes hair growth and reduces hair fall.",
    images: ["images2/HS1.png","images2/HS2.png","images2/HS3.png"],
    rating: 4.4
  },
  NS1: {
    name: "Neem Shampoo",
    price: 200,
    description: "Neem shampoo that promotes hair growth and reduces dandruff.",
    images: ["images2/NS1.png","images2/NS2.png","images2/NS3.png"],
    rating: 4.3
  },
  OS1: {
    name: "Onion Shampoo",
    price: 250,
    description: "Onion shampoo that promotes hair growth and reduces hair fall.",
    images: ["images2/OS1.jpeg","images2/OS2.png","images2/OS3.png"],
    rating: 4.2
  },
  AS11: {
    name: "Aloe Vera Shampoo",
    price: 219.99,
    description: "Aloe vera shampoo that promotes hair growth and reduces hair fall.",
    images: ["images2/AS11.jpeg","images2/AS12.png","images2/AS13.png"],
    rating: 4.6
  }
};

// ====== Get Product ID from URL ======
const params = new URLSearchParams(window.location.search);
const productId = params.get('id'); // URL example: product.html?id=P1
const container = document.getElementById('product-container');

if(productId && products[productId]){
  const product = products[productId];

  container.innerHTML = `
    <div class="product-box">
      <div class="slider">
        ${product.images.map((img,i) => `<img src="${img}" class="slide${i===0?' active':''}">`).join('')}
        <button class="prev">❮</button>
        <button class="next">❯</button>
      </div>

      <button class="toggle-details">View Product Details</button>
      <div class="details">
        <h2>${product.name}</h2>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p>${product.description}</p>
      </div>

      <div class="rating">
        ${[1,2,3,4,5].map(i => `<span${i<=Math.round(product.rating)?'':' style="color:#ccc;"'}>★</span>`).join('')}
      </div>
      <div class="rating-value">⭐ ${product.rating} / 5</div>

      <button>Add to Cart</button>
      <button>Buy Now</button>
    </div>
  `;

  // ====== Slider Functionality ======
  const slides = container.querySelectorAll('.slide');
  let currentSlide = 0;
  const showSlide = index => slides.forEach((slide,i)=>slide.classList.toggle('active', i===index));

  container.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  container.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  // ====== Toggle Details ======
  const toggleBtn = container.querySelector('.toggle-details');
  const detailsDiv = container.querySelector('.details');
  toggleBtn.addEventListener('click', () => {
    const isVisible = detailsDiv.style.display === 'block';
    detailsDiv.style.display = isVisible ? 'none' : 'block';
    toggleBtn.textContent = isVisible ? 'View Product Details' : 'Hide Product Details';
  });

} else {
  container.innerHTML = "<p style='text-align:center; font-size:18px;'>Product not found!</p>";
}
