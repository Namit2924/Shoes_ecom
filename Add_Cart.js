const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");
const cartDropdown = document.getElementById("cart-dropdown");

let products = [];
let cart = [];

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Function to update the cart display
function updateCart() {
    cartItemsContainer.innerHTML = cart.length
        ? cart.map(item => `
            <div class="cart-item">
                <span>${item.title} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join("")
        : "<p>Cart is empty</p>";

    // Update total price
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Update cart count
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    updateCart();
}

// Function to toggle the cart dropdown
function toggleCartDropdown() {
    cartDropdown.classList.toggle("active");
}

// Fetch products on page load
fetchProducts();
