import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [games, setGames] = useState([]);

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

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/user/createUser', {
            method: "post",
            body: JSON.stringify({ name, email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setEmail("");
            setName("");
        }
    }

    return (
        <div className="app">
            <header className="header">
            <img src="/purple-controller.jpg" alt="icon" className="header-icon"/>
                <div className="logo">GameGrid</div>
                <input type="search" placeholder="Search" />
                <div className="actions">
                    <button>Sign Up</button>
                    <button>Cart</button>
                </div>
            </header>

            <aside className="sidebar">
                {/* Sorting options */}
                <div className="sorting-options">
                    <h3>Sort by</h3>
                    <button className="sort-button">Titles (A-Z)</button>
                    <button className="sort-button">Titles (Z-A)</button>
                    <button className="sort-button">Price (high to low)</button>
                    <button className="sort-button">Price (low to high)</button>
                </div>

                {/* Filtering options */}
                <div className="filtering-options">
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


            <main className="game-grid">
            {games.map(game => (
                <div className="game-card" key={game.id}>
                    <div className="game-cover">
                    <img src={game.coverUrl} alt={`No Cover Image Provided`} />
                    {/* <div className="game-title-overlay">{game.name}</div> */}
                    </div>
                    <div className="game-info">
                    <h3>{game.name}</h3>
                    <p>{game.releaseDate}</p>
                    <p>{game.price}</p>
                    <p>{game.platform}</p>
                    </div>
                </div>
            ))}
        </main>
        </div>
    );
}

export default App;

