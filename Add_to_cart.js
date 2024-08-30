let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item, price) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ item, price, quantity: 1 });
    }

    updateCart();
    updateCartCount();
}

function removeFromCart(item) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
            cart = cart.filter(cartItem => cartItem.item !== item);
        }
    }
    updateCart();
    updateCartCount();
}
// Function to update the cart item count in the header
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    cartCountElement.innerText = totalItems;
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    const paymentSection = document.getElementById('payment-section');
    const totalAmountDiv = document.getElementById('total-amount');

    cartDiv.innerHTML = '';

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>No items in cart</p>';
        paymentSection.style.display = 'none';
    } else {
        let totalAmount = 0;
        cart.forEach(cartItem => {
            cartDiv.innerHTML += `
                    <div class="cart-item">
                        <span>${cartItem.item} - ₹${cartItem.price} x ${cartItem.quantity}</span>
                        <button onclick="removeFromCart('${cartItem.item}')">Remove</button>
                    </div>`;
            totalAmount += cartItem.price * cartItem.quantity;
        });
        cartDiv.innerHTML += `<p>Total: ₹${totalAmount}</p>`;
        totalAmountDiv.textContent = `₹${totalAmount}`;
        paymentSection.style.display = 'block';

        // Save the updated cart and total amount to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalAmount', totalAmount);
    }
}

function proceedToPayment() {
    localStorage.setItem('orderSummary', JSON.stringify(cart));
    localStorage.setItem('totalAmount', document.getElementById('total-amount').textContent.replace('₹', ''));
    window.location.href = 'payment.html';
}

// Update cart when the page loads to reflect any stored data
updateCart();