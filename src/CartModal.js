import React from 'react';
import './CartModal.css'; // Import the new CSS file

function CartModal({ cartItems, showCartModal, setShowCartModal, removeFromCart, toggleCheckoutModal }) {
  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };
  
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  

  if (!showCartModal) {
    return null;
  }
  
  return (
    <div className={showCartModal ? 'cart-modal' : 'cart-modal displayNone'}>
      <section className="cart-modal-content">
        <button onClick={toggleCartModal}>Close</button>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="modalheader">
                <div className="styles.modalimage">
                  <img src={item.coverUrl} alt={item.name} />
                </div>
                <div className="modaldetails">
                  <h3>{item.name}</h3>
                  <p>Price: {item.price}</p>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  
                </div>
              </div>
            </li>
          ))}
        </ul>
        <h3> Total Price {total}</h3>
        <button className="checkout-button" onClick={toggleCheckoutModal} >Checkout</button>
      </section>
    </div>
  );
}

export default CartModal;
