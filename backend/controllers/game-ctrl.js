const Game = require('../models/game-model.js')

const getGames = async (req, res) => {
    try {
        const games = await Game.find(); // This queries all documents in the games collection
        res.json(games); // Send the retrieved games back to the client
    } catch (e) {
        res.send("Something Went Wrong");
    }
}

module.exports = {
    getGames
}