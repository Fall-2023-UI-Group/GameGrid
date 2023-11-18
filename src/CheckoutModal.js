import React, { useState } from 'react';
import './CheckoutModal.css'; // Import the CSS file for the CheckoutModal

function CheckoutModal({ showCheckoutModal, setShowCheckoutModal }) {
  const [shippingAddress, setShippingAddress] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [orderSuccessful, setOrderSuccessful] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault(); // Prevent the form from submitting normally
    // Here you would add your order processing logic
    setOrderSuccessful(true);
  };

  const handleCloseModal = () => {
    setShowCheckoutModal(false);
    setOrderSuccessful(false);
  };

  return (
    <div className={showCheckoutModal ? 'checkout-modal' : 'checkout-modal displayNone'}>
      <section className="checkout-modal-content">
        {orderSuccessful ? (
          <>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase.</p>
            <button onClick={handleCloseModal}>Close</button>
          </>
        ) : (
          <>
            <button onClick={handleCloseModal}>Close</button>
            <h2>Checkout</h2>
            <form onSubmit={handlePlaceOrder}>
              <label>
                Shipping Address:
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                />
              </label>
              <label>
                Cardholder Name:
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </label>
              <label>
                Card Number:
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </label>
              <label>
                Expiry Date:
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  required
                />
              </label>
              <label>
                CVV:
                <input
                  type="text"
                  value={cardCVV}
                  onChange={(e) => setCardCVV(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="place-order-button">
                Place Order
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export default CheckoutModal;

