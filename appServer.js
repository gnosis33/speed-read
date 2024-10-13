const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to process text input
app.post('/api/process_text', (req, res) => {
  const { text } = req.body;
  const words = text.split(/\s+/);  // Split text by spaces to get words
  res.json(words);                  // Send words back to frontend as JSON
});

// Start the server on a specific port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
