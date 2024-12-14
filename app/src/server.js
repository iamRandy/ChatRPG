const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '/public')));

// Serve node_modules (optional, but needed for bootstrap-icons in this case)
app.use('node_modules', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})