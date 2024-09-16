const { exec } = require('child_process'); // Required to start the Python app
process.env.NODE_ENV = 'production'; // Change to 'production' as needed
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');

// Start the Python app
exec('python app.py', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error starting Python app: ${err}`);
    return;
  }
  console.log(`Python app output: ${stdout}`);
});

// Initialize the app
const app = express();
app.use(bodyParser.json());
console.log('Running in environment:', process.env.NODE_ENV);

// CORS configuration based on environment
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Database connection (adjust with your RDS credentials)
const db = mysql.createConnection({
  host: 'capital.c9ka68y4enc2.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'BUzwq997997',
  database: 'capital'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to RDS:', err);
    return;
  }
  console.log('Connected to AWS RDS');
});

// Define the API route for contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  const query = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';

  db.query(query, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error('Error saving contact form:', err);
      res.status(500).send('Error saving contact form');
    } else {
      res.status(201).send('Contact form submitted successfully');
    }
  });
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler: serve React app's index.html for all unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
