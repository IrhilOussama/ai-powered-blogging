require('dotenv').config();
const express = require('express');
const { Pool } = require('pg'); // Import pg Pool
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mySuperSecureRandomKey12345!@#$%&*45678';

const app = express();
app.use(express.json());
app.use(cors());

// Serve images from /public/images
app.use('/api/blogs/images', express.static(path.join(__dirname, 'public/images/blogs/converted')));
app.use('/api/blogs/backup-images', express.static(path.join(__dirname, 'public/images/blogs/bakckup')));

// Create a PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432 // Default PostgreSQL port
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the PostgreSQL database.');
});

// Middleware to verify the JWT token and extract the userId
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the Authorization header
  if (!token) return res.status(401).json({ error: 'Authentication token is missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Invalid or expired token' });
      req.user = user; // Attach the user object (which contains userId) to the request object
      next(); // Proceed to the next middleware or route handler
  });
}

// Get all blogs
app.get('/api/blogs', (req, res) => {
  pool.query('SELECT blogs.*, profile.name FROM blogs JOIN profile ON blogs.author_id = profile.id', (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result.rows); // Use result.rows for PostgreSQL
  });
});

// Get a single blog by ID
app.get('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT blogs.*, profile.name FROM blogs JOIN profile ON blogs.author_id = profile.id WHERE blogs.id = $1', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result.rows[0]); // Access first row in the result
  });
});

// Create a new blog
app.post('/api/blogs', authenticateToken, (req, res) => {
  let { title, description, categorie_id, image } = req.body;
  const author_id = req.user.userId;
  image = image || 'default.jpg';
  if (!title || !description || !categorie_id || !author_id) {
    return res.status(400).json({ message: "title, description, categorie_id and author_id are required" });
  }

  const query = `
    INSERT INTO blogs (title, description, categorie_id, value, image, author_id)
    VALUES ($1, $2, $3, 0, $4, $5)
    RETURNING id
  `;
  const values = [title, description, categorie_id, image, author_id];

  pool.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: result.rows[0].id, // Get the id from the returned row
      title,
      description,
      categorie_id,
      image,
      author_id
    });
  });
});

// Update a blog
app.put('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, categorie_id, image } = req.body;

  pool.query(
    'UPDATE blogs SET title = $1, description = $2, categorie_id = $3, image = $4 WHERE id = $5',
    [title, description, categorie_id, image, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.rowCount === 0) return res.status(400).json({ error: "No such ID exists" });
      res.json({ id, title, description, categorie_id, image });
    }
  );
});

// Delete a blog
app.delete('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM blogs WHERE id = $1', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id });
  });
});

// USERS

// Get all users
app.get('/api/users', (req, res) => {
  pool.query('SELECT id, name, email, password FROM profile', (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result.rows); // Use result.rows for PostgreSQL
  });
});


// /register user
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Check if the email already exists in the database
    const { rows } = await pool.query('SELECT * FROM profile WHERE email = $1', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO profile (name, email, password) VALUES ($1, $2, $3) RETURNING id, email',
      [name, email, hashedPassword]
    );

    const user = result.rows[0];
    res.status(201).json({ message: 'User registered successfully!', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Login

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Check if the user exists
        const result = await pool.query('SELECT * FROM profile WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token
        res.json({ token, userId: user.id, username: user.username });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});




// CATEGORIES

// Get all categories
app.get('/api/categories', (req, res) => {
  pool.query('SELECT * FROM categorie', (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result.rows); // Use result.rows for PostgreSQL
  });
});

// Create a new category
app.post('/api/categories', (req, res) => {
  let { title } = req.body;
  pool.query('INSERT INTO categorie (title) VALUES ($1) RETURNING id', [title], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.rows[0].id, title });
  });
});

// Get a single category by ID
app.get('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM categorie WHERE id = $1', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result.rows[0]);
  });
});

// Update a category by ID
app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  pool.query('UPDATE categorie SET title = $1 WHERE id = $2', [title, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, title });
  });
});

// Delete a category by ID
app.delete('/api/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT COUNT(*) as rowCount FROM blogs WHERE categorie_id = $1', [id]);
    if (result.rows[0].rowCount > 0) {
      return res.status(400).json({ message: "Can't delete category while associated blogs exist" });
    }
    await pool.query('DELETE FROM categorie WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
