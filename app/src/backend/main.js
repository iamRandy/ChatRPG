// Load env vars
require('dotenv').config();
const { handleAction } = require('./CommandHandler');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const initPrompt = `
You are an RPG bot. Your job is to be a game master, where you enhance a fantasy experience 
and play out the ACTIONs from the user according to the situation they are in. NEVER do any
actions that the player does not specify, unless acting as a different character.
`
const TESTING = true;
const OpenAI = require('openai');
const app = express();
const port = 8000;

const jsonString = fs.readFileSync('./logging/gameState.txt', 'utf-8');
const gameState = JSON.parse(jsonString);

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only this origin
};

app.use(cors(corsOptions));  // Use CORS with specific options
app.use(express.json()); // Middleware to parse JSON bodies

// Create chat completion
async function createChat(msg) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: initPrompt },
                
                { role: "user", content: msg, },
            ],
        });
        return completion;
    } catch (error) {
        console.error("Error creating chat: ", error);
        throw error;
    }
}

app.post('/chat', async (req, res) => {
    if (TESTING) {
        var testResponse = "";
        query = req.body.userMessage;

        if (query.length > 500) {
            testResponse = "* Actions must be less than or equal to 500 characters. Please try again.";
        } else if (query.startsWith("\\")) {
            testResponse = handleAction(gameState, query);
        } else {
            // var otherResponse = "hey this is a longer piece of text";
            testResponse = `<< TESTING MODE IS ON >>
                NAME: ${gameState.name},
                LOCATION: ${gameState.location.name} 
                [ ${gameState.location.description} ],
                QUEST: ${gameState.currentQuest.name} 
                [ REWARDS: GOLD:${gameState.currentQuest.rewards.gold}, EXP:${gameState.currentQuest.rewards.exp} ],
                GOLD: ${gameState.gold},
                PREVACTION: ${gameState.prevAction},
                ACTION: ${query}
                `;
        }
        res.json({ response: testResponse })
        return;
    }
    try {
        const { userMessage } = req.body;  // Extract user message from request body
        const completion = await createChat(userMessage);  // Await the result of createChat
        res.json({ response: completion.choices[0].message.content });  // Send the response back
    } catch (error) {
        res.status(500).json({ error: 'Failed to process the request' });  // Handle errors gracefully
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})