// Set up a 5-minute countdown timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            clearInterval(interval);
            alert('Payment time expired!');
            window.location.href = 'index.html'; // Redirect to home page or some other page
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#countdown');
    startTimer(fiveMinutes, display);

    // Retrieve and display order summary and total amount from localStorage
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary')) || [];
    const totalAmount = localStorage.getItem('totalAmount') || '0';

    const orderSummaryDiv = document.getElementById('order-summary');
    orderSummaryDiv.innerHTML = '';

    if (orderSummary.length === 0) {
        orderSummaryDiv.innerHTML = 'No items in cart';
    } else {
        orderSummary.forEach(cartItem => {
            orderSummaryDiv.innerHTML += `
                <div class="cart-item">
                    <span>${cartItem.item} - ₹${cartItem.price} x ${cartItem.quantity}</span>
                </div>`;
        });
    }

    document.getElementById('total-amount').textContent = `₹${totalAmount}`;
};

function makeUPIPayment() {
    // Redirect to UPI payment page or handle payment logic
    window.location.href = 'https://www.phonepe.com/'; // Replace with actual UPI payment URL
}

function cancelPayment() {
    // Confirm before redirecting
    if (confirm('Are you sure you want to cancel the payment?')) {
        window.location.href = 'homepage.html'; // Redirect to home page or order page
    }
}
