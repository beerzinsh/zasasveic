document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.querySelector('.cart-items');
    const cartSummary = document.querySelector('.cart-summary p');
    
    cartItems.addEventListener('click', function(event) {
        if(event.target.tagName === 'BUTTON') {
            const item = event.target.closest('.cart-item');
            item.remove();
            updateCartSummary();
        }
    });

    function updateCartSummary() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('p:nth-child(4)').textContent.replace('Price: $', ''));
            total += price;
        });
        cartSummary.textContent = `Total: $${total.toFixed(2)}`;
    }
});