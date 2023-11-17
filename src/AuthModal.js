import React, { useState } from 'react';
import styles from './AuthModal.module.css'; // Import the styles as a module

const AuthModal = ({ showModal, setShowModal, handleUserAction, username, setUsername, email, setEmail, password, setPassword }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleModal = () => {
        setShowModal(false);
    };

    const handleCreateUser = (e) => {
        e.preventDefault();
        handleUserAction({ username, email, password, isSignUp }); // Pass the data to the parent component
    };

    if (!showModal) {
        return null; // Don't render anything if showModal is false
    }

    return (
        <div className={showModal ? `${styles.modal} ${styles.displayBlock}` : `${styles.modal} ${styles.displayNone}`}>
            <section className={styles.modalMain}>
                <button onClick={toggleModal}>Close</button>
                <form onSubmit={handleCreateUser}>
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    {isSignUp && <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />}
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
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
