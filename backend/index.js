require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(express.json());

// Serve images from /public/images
app.use('/api/images', express.static(path.join(__dirname, 'public/images')));

console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
console.log(process.env.DB_NAME)

// Create a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
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
    let { title, description, categorie_id, rank, image, author_id } = req.body;
    rank = rank | 0;
    image = image | "default.jpg";
    if (!title || !description || !categorie_id || !author_id){
        res.status(400).json({message: "title, description, categorie_id and author_id are required"})
    }
    db.query('INSERT INTO blogs (title, description, categorie_id, value, image, author_id) VALUES (?, ?, ?, ?, ?, ?)',
        [title, description, categorie_id, rank, image, author_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, title, description, categorie_id, rank, image, author_id });
    });
});

// Updata a blog
app.put("/api/blogs/:id", (req, res) => {
    let {id} = req.params;
    let {title, description, categorie_id, image} = req.body;
    db.query("UPDATE blogs SET title = ?, description = ?, categorie_id = ?, image = ? WHERE id = ?", 
        [title, description, categorie_id, image, id],
        (err, results) => {
            if (err) return res.status(500).json({error: err.message});
            res.json({id, title, description, categorie_id, image});
        }
    )
})

// Delete a blog
app.delete("/api/blogs/:id", (req, res) => {
    const {id} = req.params;
    db.query("DELETE FROM blogs WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({error: err.message});
        res.json({id: id});
    })
})




// USERS
// get all users
app.get("/api/users", (req, res) => {
    db.query("SELECT id, name, email, password FROM users", (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    })
})

// create a new user
app.post("/api/users", (req, res) => {
    const {name, email, password} = req.body;
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({id: results.insertId, name, password})
    })
})

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


// CATEGORIES
// get all categories
app.get("/api/categories", (req, res) => {
    db.query("SELECT * FROM categories", (err, results) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(results);
    })
})
//create a new categorie
app.post("/api/categories", (req, res) => {
    let {title} = req.body;
    db.query("INSERT INTO categories (title) VALUES (?)", [title], (err, results) => {
        if (err) return res.status(500).json({error: err.message});
        res.json({id: results.insertId, title});
    } )
})


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


// Update a category by ID
app.put('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    db.query('UPDATE categories SET title = ? WHERE id = ?', [title, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, title });
    });
});

// Delete a category by ID
app.delete('/api/categories/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const results = await db.promise().query("SELECT COUNT(*) as rowCount FROM blogs WHERE categorie_id = ?", [id]);
        if (results[0].rowCount > 0){
            return res.status(400).json({message: "can't delete categorie while associated blogs exist"})
        }
        await db.promise().query('DELETE FROM categories WHERE id = ?', [id]);
        res.status(204).send();
    }
    catch(err){
        return res.status(500).json({error: err.message})
    }
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});