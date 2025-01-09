


let cart = [];

async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
  const productsContainer = document.getElementById("products");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
    `;

    productsContainer.appendChild(productCard);
  });
}

function addToCart(id, title, price, image) {
  const existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ id, title, price, image, quantity: 1 });
  }

  updateCart();
}


function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <div>
        <img src="${item.image}" alt="${item.title}" width="50">
        <strong>${item.title}</strong> (x${item.quantity})
      </div>
      <div>
        $${(item.price * item.quantity).toFixed(2)}
        <button onclick="removeFromCart(${item.id})" style="color:red; cursor:pointer;">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalElement.textContent = total.toFixed(2);
}


function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

fetchProducts();
