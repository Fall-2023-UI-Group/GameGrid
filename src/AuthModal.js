import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ showModal, setShowModal }) => {
    const [isSignUp, setIsSignUp] = useState(true);

    const toggleModal = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement sign-up or sign-in logic here
    };

    if (!showModal) {
        return null; // Don't render anything if showModal is false
    }

    return (
        <div className={showModal ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">
                <button onClick={toggleModal}>Close</button>
                <form onSubmit={handleSubmit}>
                    {isSignUp && <input type="text" placeholder="Name" />}
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                </form>
                <button onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
                </button>
            </section>
        </div>
    );
};

export default AuthModal;
