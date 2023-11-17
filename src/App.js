import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import AuthModal from './AuthModal';
import GameDetailsModal from './GameDetailsModal';
import controllerImage from './purple-controller.jpg';

function App() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [games, setGames] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [signedInUser, setSignedInUser] = useState(null);
    const [selectedGame, setSelectedGame] = useState(null);


    // Function to handle game card click
    const openGameDetails = (game) => {
        setSelectedGame(game);
    };

    // Function to close the game details modal
    const closeGameDetails = () => {
        setSelectedGame(null);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:5000/game/getGames');
                const data = await response.json();
    
                // Sort the games so that games with a coverUrl come first
                const sortedGames = data.sort((a, b) => {
                    if (a.coverUrl && !b.coverUrl) {
                        return -1;
                    }
                    if (!a.coverUrl && b.coverUrl) {
                        return 1;
                    }
                    return 0;
                });
    
                setGames(sortedGames);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
    
        fetchGames();
    }, []);

    const handleCreateUser = async () => {
        let result = await fetch(
        'http://localhost:5000/user/createUser', {
            method: "post",
            body: JSON.stringify({ username, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        if (result.success) {
            alert("Account Created Successfully!");
            toggleModal();
            setIsSignedIn(true);
            setSignedInUser({ username });
            // Optionally, store user details in local storage or context for persistence
        } else if (result.message === "User already exists"){
            alert("Username already taken!");
        } else {
            alert("Account Creation Failed!");
            // Handle sign-up failure
        }
    }

        // Sorting functions
        const sortGamesAsc = () => {
            const sortedGames = [...games].sort((a, b) => a.name.localeCompare(b.name));
            setGames(sortedGames);
        };
    
        const sortGamesDesc = () => {
            const sortedGames = [...games].sort((a, b) => b.name.localeCompare(a.name));
            setGames(sortedGames);
        };

        const handleUserAction = async ({ username, email, password, isSignUp }) => {
            setUsername(username);
            setEmail(email);
            setPassword(password);
        
            if (isSignUp) {
                handleCreateUser();
            } else {
                // Sign-in logic
                let result = await fetch('http://localhost:5000/user/signIn', {
                    method: "post",
                    body: JSON.stringify({ username, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                result = await result.json();
                if (result.success) {
                    alert("Successful Sign In!");
                    toggleModal();
                    setIsSignedIn(true);
                    setSignedInUser({ username });
                    // Optionally, store user details in local storage or context for persistence
                } else {
                    alert("Sign In Failed!");
                    // Handle sign-in failure
                }
            }
        };

        return (
            <div className={styles.app}>
                <header className={styles.header}>
                    <img src={controllerImage} alt="icon" className={styles.headerIcon}/>
                    <div className={styles.logo}>GameGrid</div>
                    <input type="search" placeholder="Search" />
                    <div className={styles.actions}>
                        {isSignedIn ? (
                            <>
                                <span>Welcome, {signedInUser.username}!</span>
                                <button>Cart</button>
                                <button onClick={() => { setIsSignedIn(false); setSignedInUser(null); setEmail(""); setUsername(""); setPassword(""); }}>Sign Out</button>
                            </>
                        ) : (
                            <>
                                <button onClick={toggleModal}>Sign In</button>
                                <button>Cart</button>
                            </>
                        )}
                    </div>
                </header>
        
                <aside className={styles.sidebar}>
                    <div className={styles.sortingOptions}>
                        <h3>Sort by</h3>
                        <button className={styles.sortButton} onClick={sortGamesAsc}>Titles (A-Z)</button>
                        <button className={styles.sortButton} onClick={sortGamesDesc}>Titles (Z-A)</button>
                        <button className={styles.sortButton}>Price (high to low)</button>
                        <button className={styles.sortButton}>Price (low to high)</button>
                    </div>
        
                    <div className={styles.filteringOptions}>
                        <h3>Platform</h3>
                        <a href="#playstation">PlayStation</a>
                        <a href="#xbox">Xbox</a>
                        <a href="#pc">PC</a>
                        <a href="#nintendo">Nintendo</a>
        
                        <h3>Genre</h3>
                        <a href="#action">Action</a>
                        <a href="#adventure">Adventure</a>
                        <a href="#rpg">RPG</a>
                        <a href="#simulation">Simulation</a>
        
                        <h3>ESRB Rating</h3>
                        <a href="#everyone">Everyone</a>
                        <a href="#teen">Teen</a>
                        <a href="#mature">Mature</a>
                    </div>
                </aside>
        
                <main className={styles.gameGrid}>
                    {games.map(game => (
                        <div className={styles.gameCard} key={game.id} onClick={() => openGameDetails(game)}>
                            <div className={styles.gameCover}>
                                <img src={game.coverUrl} alt={`No Cover Provided`} />
                            </div>
                            <div className={styles.gameInfo}>
                                <h3>{game.name}</h3>
                                <p>{game.releaseDate}</p>
                                <p>{game.price}</p>
                                <p>{game.platform}</p>
                            </div>
                        </div>
                    ))}
                </main>
        
                <GameDetailsModal 
                    game={selectedGame} 
                    onClose={closeGameDetails} 
                />
        
                <AuthModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleUserAction={handleUserAction}
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                />
            </div>
        );
}

export default App;

