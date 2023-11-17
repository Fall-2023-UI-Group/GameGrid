import React from 'react';
// import './GameDetailsModal.css';
import styles from './GameDetailsModal.module.css'

const GameDetailsModal = ({ game, onClose }) => {
    if (!game) return null;

    return (
        <div className={styles.gamedetailsmodal}>
            <div className={styles.modalcontent}>
                <div className={styles.modalheader}>
                    <div className={styles.modalimage}>
                        <img src={game.coverUrl} alt={game.name} />
                    </div>
                    <div className={styles.modaldetails}>
                        <h3>{game.name}</h3>
                        <p>Release Date: {game.releaseDate}</p>
                        <p>Price: {game.price}</p>
                        <p>Platform: {game.platform}</p>
                        {/* Other details */}
                    </div>
                </div>
                <div className={styles.modalsummary}>
                    <p>{game.summary}</p>
                </div>
                <div className={styles.modalactions}>
                    <button onClick={() => {/* Add to cart logic */}}>Add to Cart</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default GameDetailsModal;
