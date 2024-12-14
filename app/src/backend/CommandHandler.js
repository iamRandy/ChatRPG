// Handles special inputs from the user.
const { saveGame } = require('./gameCommands/SaveGameCommand.js');

function handleAction(gameState, command) {
    actionResponse = "";
    console.log(command);
    switch (command) {
        case '\\addgold':
            gameState.gold += 10;
            console.log("added 10 gold to inventory");
            break;
        case '\\save':
            result = saveGame(gameState);
            if (result) {
                actionResponse = "Game saved!";
            } else {
                actionResponse = "Game failed to be saved..";
            }
            break;
        case '\\help':
            commandListResponse = `List of Commands:
            \\save (Saves the current game)
            \\help (Shows the list of all commands)`;
            actionResponse = commandListResponse;
            break;
        default:
            actionResponse = "Invalid Command. Enter \"\\help\" for a list of commands.";
            break;
    }
    return "* " + actionResponse;
}

module.exports = { handleAction };