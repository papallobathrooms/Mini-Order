// JavaScript Document// min-order-script.js
(function () {
  // Set your minimum order value (in dollars)
  const MIN_ORDER_VALUE = 100;

  // Function to check cart and enforce minimum
  function enforceMinimumOrder() {
    // Shopify stores cart data in a global variable or DOM elements
    // For simplicity, we’ll assume the total is in a common class (adjust based on your theme)
    const totalElement = document.querySelector('.cart-subtotal .money') || document.querySelector('[data-cart-total]');
    if (!totalElement) return; // Exit if total isn’t found

    // Extract the total (strip currency symbols and convert to float)
    const cartTotalText = totalElement.textContent.replace(/[^0-9.]/g, '');
    const cartTotal = parseFloat(cartTotalText);

    // Find the checkout button (adjust selector based on your theme)
    const checkoutButton = document.querySelector('[name="checkout"]') || document.querySelector('.cart__checkout');

    if (cartTotal < MIN_ORDER_VALUE) {
      // Disable checkout button
      if (checkoutButton) {
        checkoutButton.disabled = true;
        checkoutButton.style.opacity = '0.5';
      }

      // Add or update warning message
      let warning = document.getElementById('min-order-warning');
      if (!warning) {
        warning = document.createElement('p');
        warning.id = 'min-order-warning';
        warning.style.color = 'red';
        warning.style.margin = '10px 0';
        const cartContainer = document.querySelector('.cart') || document.body;
        cartContainer.insertBefore(warning, checkoutButton);
      }
      warning.textContent = `Your order must be at least $${MIN_ORDER_VALUE}. Add $${(MIN_ORDER_VALUE - cartTotal).toFixed(2)} more to proceed!`;
    } else {
      // Enable checkout button and remove warning
      if (checkoutButton) {
        checkoutButton.disabled = false;
        checkoutButton.style.opacity = '1';
      }
      const warning = document.getElementById('min-order-warning');
      if (warning) warning.remove();
    }
  }

  // Run on page load
  document.addEventListener('DOMContentLoaded', enforceMinimumOrder);

  // Re-run when cart updates (Shopify AJAX carts)
  document.addEventListener('ajaxComplete', enforceMinimumOrder);
})();