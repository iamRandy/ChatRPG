// Load env vars
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const app = express();
const port = 8000;

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

const corsOptions = {
    origin: 'http://127.0.0.1:5500',  // Allow only this origin
};

app.use(cors(corsOptions));  // Use CORS with specific options
app.use(express.json()); // Middleware to parse JSON bodies


// Create chat completion
async function createChat(msg) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                
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