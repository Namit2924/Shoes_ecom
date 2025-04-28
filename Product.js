let cart = JSON.parse(localStorage.getItem("cart")) || [];

        async function fetchMenProducts() {
            try {
                const response = await fetch("Json_file/Category.json");
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
                                <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${discountedPrice}" data-image="${product.image}">
                                    Add to Cart
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

        function addToCart(event) {
            const button = event.target;
            const productId = button.dataset.id;
            const productName = button.dataset.name;
            const productPrice = parseFloat(button.dataset.price);
            const productImage = button.dataset.image;

            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1, image: productImage });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${productName} added to cart!`);
            updateCartCount();
        }

        function attachCartListeners() {
            document.querySelectorAll(".add-to-cart").forEach(button => {
                button.addEventListener("click", addToCart);
            });
        }

        function updateCartCount() {
            document.getElementById("cart-count").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }

        fetchMenProducts();