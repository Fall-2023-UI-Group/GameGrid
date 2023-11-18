import React from 'react';

function CartModal({ cartItems, showCartModal, setShowCartModal }) {
    const toggleCartModal = () => {
        setShowCartModal(!showCartModal);
    };
    console.log('cartItems:', cartItems);
    
    if (!showCartModal) {
        return null; // Don't render anything if showModal is false
    }

    return (
        <div className={showCartModal ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">
                <button onClick={toggleCartModal}>Close</button>
                {/* Display cart items */}
                <ul>


                    
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.name} - Quantity: {item.quantity}
                            
                        </li>

                    ))}
                </ul>
            </section>
        </div>
    );
}

export default CartModal;
