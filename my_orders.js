// Function to load orders on My Orders page
function loadMyOrders() {
    let myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
    let ordersList = document.getElementById("ordersList");

    if (myOrders.length === 0) {
        ordersList.innerHTML = "<p>No orders placed yet.</p>";
        return;
    }

    ordersList.innerHTML = ""; // Clear previous content

    myOrders.forEach((order, index) => {
        let orderElement = document.createElement("div");
        orderElement.classList.add("order-item");
        orderElement.innerHTML = `
            <h3>${order.name}</h3>
            <p>Price: ₹${order.price}</p>
            <p>Quantity: ${order.quantity || 1}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod || "Not Available"}</p>
            <p><strong>Status:</strong> Order Placed ✅</p>
            <button class="btn btn-danger mt-2" onclick="cancelOrder(${index})">Cancel Order</button>
        `;
        ordersList.appendChild(orderElement);
    });
}

// Function to cancel an order
function cancelOrder(index) {
    let myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
    
    if (confirm("Are you sure you want to cancel this order?")) {
        myOrders.splice(index, 1); // Remove the order from the array
        localStorage.setItem("myOrders", JSON.stringify(myOrders)); // Update local storage
        loadMyOrders(); // Reload orders list
        alert("Your order has been cancelled.");
    }
}

// Load orders when the page loads
window.onload = loadMyOrders;
