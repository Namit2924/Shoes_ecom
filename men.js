let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function fetchMenProducts() {
    try {
        const response = await fetch("Json_file/men.json"); // Correct JSON file
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const products = data.products;
        if (!Array.isArray(products)) throw new Error("Invalid JSON format");

        document.getElementById("product-grid").innerHTML = products.map(product => {
            const discountAmount = (product.price * product.discount) / 100;
            const discountedPrice = (product.price - discountAmount).toFixed(2);

            return `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="details">
                        <h3>${product.name}</h3>
                        <p>${product.description.substring(0, 50)}...</p>
                        <div class="price">
                            <span class="original-price">₹${product.price.toFixed(2)}</span>
                            <span class="discounted-price">₹${discountedPrice}</span>
                            <span class="discount-badge">-${product.discount}%</span>
                        </div>
                        <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" 
                            data-price="${discountedPrice}" data-image="${product.image}">
                            Add to Cart
                        </button>
                        <button class="remove-from-cart" data-id="${product.id}">
                            Remove
                        </button>
                    </div>
                </div>
            `;
        }).join("");

        attachCartListeners();
        updateCartCount();
    } catch (error) {
        console.error("Error fetching men's products:", error);
    }
}

fetchMenProducts();
