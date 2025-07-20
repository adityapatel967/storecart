const products = [
  { id: 1, name: "Headphones", price: 1999, image: "https://via.placeholder.com/250x200?text=Headphones" },
  { id: 2, name: "Smart Watch", price: 2499, image: "https://via.placeholder.com/250x200?text=Smart+Watch" },
  { id: 3, name: "Bluetooth", price: 1200, image: "https://via.placeholder.com/250x200?text=Bluetooth" },
  { id: 4, name: "Bluetooth Speaker", price: 1299, image: "https://via.placeholder.com/250x200?text=Speaker" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(productArray = products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  productArray.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function renderCartItems() {
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
    cartList.appendChild(li);
  });
  document.getElementById("cart-summary").innerText = `Total: ₹${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

function openCart() {
  document.getElementById("cart-modal").style.display = "block";
  renderCartItems();
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

function openAuthModal() {
  document.getElementById("auth-modal").style.display = "block";
}

function closeAuthModal() {
  document.getElementById("auth-modal").style.display = "none";
}

function registerUser() {
  const username = document.getElementById("auth-username").value;
  const password = document.getElementById("auth-password").value;

  if (!username || !password) {
    showMessage("Please enter both fields.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.username === username)) {
    showMessage("User already exists.");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Registered successfully. Now login.");
}

function loginUser() {
  const username = document.getElementById("auth-username").value;
  const password = document.getElementById("auth-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", username);
    updateUserArea();
    closeAuthModal();
  } else {
    showMessage("Invalid credentials.");
  }
}

function logoutUser() {
  localStorage.removeItem("loggedInUser");
  updateUserArea();
}

function updateUserArea() {
  const username = localStorage.getItem("loggedInUser");
  const userArea = document.getElementById("user-area");

  if (username) {
    userArea.innerHTML = `👤 Hello, ${username} <button onclick="logoutUser()" class="theme-btn">Logout</button>`;
  } else {
    userArea.innerHTML = `<button onclick="openAuthModal()" class="theme-btn">Login / Register</button>`;
  }
}

function showMessage(msg) {
  document.getElementById("auth-message").innerText = msg;
}

function searchProducts(query) {
  const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  renderProducts(filtered);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function setTheme(theme) {
  document.body.classList.remove("theme-red", "theme-blue");
  if (theme === "red") document.body.classList.add("theme-red");
  else if (theme === "blue") document.body.classList.add("theme-blue");
}

renderProducts();
updateUserArea();
updateCartCount();
