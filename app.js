import express from 'express';
import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

const PORT = process.env.APP_PORT || 3000;

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database!');
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database: ${err}`);
    }
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/entries', async (req, res) => {
    const conn = await connect();
    const entries = await conn.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.render('entries', { entries });
});

app.post('/submit', async (req, res) => {
    const newPost = {
        author: req.body.author,
        title: req.body.title,
        content: req.body.content
    };

    const conn = await connect();
    await conn.query('INSERT INTO posts (author, title, content) VALUES (?, ?, ?)', 
        [newPost.author, newPost.title, newPost.content]);

    res.render('confirmation', { post: newPost });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
