const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(express.json());

// Serve images from /public/images
app.use('/api/images', express.static(path.join(__dirname, 'public/images')));

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helloworld',
    database: 'blogsdb'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Get all blogs
app.get('/api/blogs', (req, res) => {
    db.query('SELECT * FROM blogs', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get a single blog by ID
app.get('/api/blogs/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM blogs WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

// Create a new blog
app.post('/api/blogs', (req, res) => {
    const { title, content } = req.body;
    db.query('INSERT INTO blogs (title, content) VALUES (?, ?)', [title, content], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, title, content });
    });
});

// Update a blog by ID
app.put('/api/blogs/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    db.query('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, title, content });
    });
});

// Delete a blog by ID
app.delete('/api/blogs/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM blogs WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
});

// Get all categories
app.get('/api/categories', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get a single category by ID
app.get('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

// Create a new category
app.post('/api/categories', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, name });
    });
});

// Update a category by ID
app.put('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, name });
    });
});

// Delete a category by ID
app.delete('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM categories WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});