const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client

const app = express();

// Use the PORT from Render, fallback to 3000 locally
const PORT = process.env.PORT || 3000;

// DATABASE_URL from Render environment variables
const DATABASE_URL = process.env.DATABASE_URL;

// Create a connection pool
const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // needed for Render Postgres
    }
});

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route to get all users
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users'); // your table
        res.json(result.rows); // send all users as JSON
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
