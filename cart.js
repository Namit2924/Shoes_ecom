let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
        updateCartCount(); // Update cart count on load
    }
}

// Function to get cart items from localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to update cart icon count
function updateCartCount() {
    const cartItems = getCartItems();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Count total quantity of products
    const cartIcon = document.getElementById("cart-count");

    if (cartIcon) {
        cartIcon.textContent = cartCount;
        cartIcon.style.display = cartCount > 0 ? "inline-block" : "none"; // Hide if cart is empty
    }
}

// Function to add an item to the cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.image // Ensure each product has an image URL
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    updateCartCount(); // Update cart count dynamically
}
document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
});

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    cartContainer.innerHTML = ""; // Clear existing cart items

    cart.forEach((item, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <span>${item.name}</span>
            <span>Price: $${item.price}</span>
            <span>Quantity: ${item.quantity}</span>
            <button class="buy-btn" onclick="buyNow(${index})">Buy Now</button>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Buy Now Function (Single Item Checkout)
function buyNow(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let selectedItem = cart[index];

    localStorage.setItem("buyNowItem", JSON.stringify(selectedItem)); // Store the selected item

    // Open the address modal instead of redirecting
    openAddressModal();
}


// Remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart)); // Update cart
    displayCartItems(); // Refresh cart display
}

// Function to open address modal
function openAddressModal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    new bootstrap.Modal(document.getElementById("addressModal")).show();
}

// Function to open payment modal
function openPayment() {
    new bootstrap.Modal(document.getElementById("paymentModal")).show();
}

// Function to dynamically update payment input fields
function selectPaymentMethod(method) {
    const paymentDetails = document.getElementById("paymentDetails");

    let inputField = "";
    if (method === "Credit Card") {
        inputField = `
            <h5 class="text-center mt-3">Enter Credit Card Details</h5>
            <input type="text" id="creditCardNumber" class="form-control" placeholder="Card Number (XXXX-XXXX-XXXX-XXXX)">
            <input type="text" id="creditCardExpiry" class="form-control mt-2" placeholder="Expiry Date (MM/YY)">
            <input type="text" id="creditCardCVV" class="form-control mt-2" placeholder="CVV">
        `;
    } else if (method === "PayPal") {
        inputField = `
            <h5 class="text-center mt-3">Enter PayPal Email</h5>
            <input type="email" id="paypalEmail" class="form-control" placeholder="PayPal Email">
        `;
    } else if (method === "Google Pay") {
        inputField = `
            <h5 class="text-center mt-3">Enter Google Pay UPI ID</h5>
            <input type="text" id="googlePayId" class="form-control" placeholder="Google Pay UPI ID (e.g., xyz@oksbi)">
        `;
    } else if (method === "Apple Pay") {
        inputField = `
            <h5 class="text-center mt-3">Enter Apple Pay UPI ID</h5>
            <input type="text" id="applePayId" class="form-control" placeholder="Apple Pay UPI ID (e.g., xyz@apple)">
        `;
    } else if (method === "UPI") {
        inputField = `
            <h5 class="text-center mt-3">Enter UPI Details</h5>
            <input type="text" id="upiId" class="form-control" placeholder="Enter UPI ID (e.g., yourname@upi)">
            <input type="text" id="upiNumber" class="form-control mt-2" placeholder="Enter UPI Mobile Number (10 digits)">
        `;
    } else if (method === "PhonePe") {
        inputField = `
            <h5 class="text-center mt-3">Enter PhonePe UPI ID</h5>
            <input type="text" id="phonePeId" class="form-control" placeholder="Enter PhonePe UPI ID (e.g., xyz@ybl)">
        `;
    } else if (method === "Cash on Delivery") {
        inputField = `<h5 class="text-center mt-3 text-success">Cash on Delivery Selected</h5>`;
    }

    paymentDetails.innerHTML = inputField;
}

// Function to validate UPI ID and Number
function validateUPI() {
    const upiId = document.getElementById("upiId")?.value.trim();
    const upiNumber = document.getElementById("upiNumber")?.value.trim();

    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/; // UPI ID format (e.g., name@upi)
    const phoneRegex = /^[6-9]\d{9}$/; // Mobile number format (10 digits, starting with 6-9)

    if (!upiId || !upiNumber) {
        alert("Please fill in both UPI ID and Mobile Number.");
        return false;
    }

    if (!upiRegex.test(upiId)) {
        alert("Invalid UPI ID format! Example: yourname@upi");
        return false;
    }

    if (!phoneRegex.test(upiNumber)) {
        alert("Invalid Mobile Number! It should be a 10-digit number starting with 6-9.");
        return false;
    }

    return true;
}
// Function to confirm payment
function confirmPayment() {
    const paymentDetails = document.getElementById("paymentDetails");
    if (paymentDetails.innerHTML.trim() === "") {
        alert("Please select a payment method first.");
        return;
    }

    let purchasedItem = JSON.parse(localStorage.getItem("buyNowItem"));
    let myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];

    if (purchasedItem) {
        myOrders.push(purchasedItem); // Add purchased product to My Orders
        localStorage.setItem("myOrders", JSON.stringify(myOrders)); // Save updated orders
        localStorage.removeItem("buyNowItem"); // Clear buyNowItem after purchase
    }

    alert("Payment successful! Order placed.");
    localStorage.removeItem("cart"); // Clear cart if needed
    updateCartCount();
    window.location.href = "my_orders.html"; // Redirect to My Orders page
}

