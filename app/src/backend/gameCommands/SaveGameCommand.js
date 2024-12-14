// Save the current state of the game to gameState.txt
const fs = require('fs');

function saveGame(gameState) {
    console.log("saving game...");
    try {
        // Convert the gameState object to a JSON string with pretty formatting
        const jsonString = JSON.stringify(gameState, null, 2);

        // Write the JSON string to the gameState.txt file
        fs.writeFileSync('gameState.txt', jsonString, 'utf-8');
        
        console.log("game saved successfully.");
        return true;
    } catch (error) {
        console.error("Failed to save game:", error);
        return false;
    }

}

module.exports = { saveGame };