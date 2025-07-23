const products = [
  { id: 1, name: "Headphones", price: 1999, image: "img/headphone.jpg" },
  { id: 2, name: "Smart Watch", price: 2499, image: "img/watch1.jpg" },
  { id: 3, name: "Bluetooth", price: 1200, image: "img/bluetooth.jpg" },
  { id: 4, name: "Bluetooth Speaker", price: 1299, image: "img/speaker.jpg" },
  { id: 5, name: "Ac", price: 34499, image: "img/ac.jpg" }, 
  { id: 6, name: "Camera", price: 34499, image: "img/camera.jpg" },
  { id: 7, name: "Bottle", price: 379, image: "img/bottle1.jpg" }, 
  { id: 8, name: "Fan", price: 2499, image: "img/fan.png" }, 
  { id: 9, name: "Mouse", price: 399, image: "img/mouse.jpg" },
  { id: 10, name: "Gaming Mouse", price: 1499, image: "img/gamingmouse.jpg" },  
  { id: 11, name: "Go Pro", price: 24579, image: "img/gopro.jpg" }, 
  { id: 12, name: "Men Facewash", price: 478, image: "img/facewash.jpg" }, 
  { id: 13, name: "I Phone 14", price: 51499, image: "img/iphone14.jpg" }, 
  { id: 14, name: "Laptop", price: 62699, image: "img/laptop.jpg" }, 
  { id: 15, name: "LED Bulb", price: 199, image: "img/ledbulb.jpg" }, 
  { id: 16, name: "I Phone 15", price: 61499, image: "img/iphone15.jpg" }, 
  { id: 17, name: "I Phone 16", price: 71235, image: "img/iphone16.jpg" }, 
  { id: 18, name: "LED TV", price: 22399, image: "img/ledtv.jpg" }, 
  { id: 19, name: "Lower", price: 499, image: "img/lower1.jpg" }, 
  { id: 20, name: "Men Lower", price: 699, image: "img/lower2.jpg" }, 
  { id: 21, name: "Mixer Grinder", price: 3469, image: "img/mixergrinder.jpg" }, 
  { id: 22, name: "Notebook", price: 295, image: "img/notebook.jpg" }, 
  { id: 23, name: "Shoes", price: 1829, image: "img/shoes1.jpg" }, 
  { id: 24, name: "Men Shoes", price: 1288, image: "img/shoes2.jpg" }, 
  { id: 25, name: "Sleeper", price: 399, image: "img/sleeper1.jpg" }, 
  { id: 26, name: "Simple Sleeper", price: 239, image: "img/sleeper2.jpg" },
  { id: 27, name: "Stylish Shoes", price: 1499, image: "img/shoes3.jpg" },  
  { id: 28, name: "Facewash", price: 579, image: "img/facewash2.jpg" }, 
  { id: 29, name: "Himalaya Neem Facewash", price: 399, image: "img/hfacewash3.jpg" }, 
  { id: 30, name: "Sunglass", price: 579, image: "img/sunglass1.jpg" },
  { id: 31, name: "Table Fan", price: 2299, image: "img/tablefan.jpg" },  
  { id: 32, name: "Tecno Pova 5pro Phone", price: 18499, image: "img/tecno5prophone.jpg" }, 
  { id: 33, name: "Smart TV", price: 35499, image: "img/tv.jpg" }, 
  { id: 34, name: "Vivi v50 Phone", price: 34499, image: "img/vivov50phone.jpg" }, 
  { id: 35, name: "Watch", price: 889, image: "img/watch2.jpg" },
  { id: 36, name: "Mens Watch ", price: 1199, image: "img/watch3.jpg" },  
  { id: 37, name: "Ac", price: 34499, image: "img/ac.jpg" }

];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(productArray = products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  productArray.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" 
           onerror="this.src='https://picsum.photos/250/200?random=${product.id}'" />
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
    li.innerHTML = `${item.name} - ₹${item.price} 
                    <button onclick="removeFromCart(${index})">Remove</button>`;
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
    userArea.innerHTML = `👤 Hello, ${username} 
                          <button onclick="logoutUser()" class="theme-btn">Logout</button>`;
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
