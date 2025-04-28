document.getElementById("proceed-btn").addEventListener("click", function() {
    const selectedPayment = document.querySelector("input[name='payment']:checked");
    
    if (!selectedPayment) {
        alert("Please select a payment method.");
        return;
    }

    const paymentMethod = selectedPayment.value;
    
    if (paymentMethod === "cod") {
        alert("Cash on Delivery selected. Your order will be processed.");
    } else {
        alert(`Redirecting to ${paymentMethod} payment gateway...`);
        // Simulate redirection (in a real-world case, integrate the payment gateway)
        window.location.href = "checkout.html";
    }
});
