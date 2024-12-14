const fs = require('fs');

const jsonString = fs.readFileSync('gameState.txt', 'utf-8');
const gameState = JSON.parse(jsonString);
console.log(gameState);
return;