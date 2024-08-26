const express = require('express');
const morgan = require('morgan');
const { randomBytes } = require('node:crypto');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 4000;
const router = express.Router();

// Database
const posts = {};

// Middleware
app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());
app.use(router);

// Routing
router.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

// Create Post
router.post('/posts', async (req, res) => {
    const { title } = req.body;
    const _id = randomBytes(4).toString('hex');

    const newPost = {
        _id,
        title,
        comments: [],
    };

    posts[_id] = newPost;

    // Emit an event to Event Bus
    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: newPost,
    });

    res.status(201).json({
        message: 'Create new post success',
        data: newPost,
    });
});

// Register event
router.post('/events', (req, res) => {
    console.log('Received Event:: ', req.body.type);

    res.send({});
});

router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Service posts health check ok',
    });
});

app.listen(port, () => {
    console.log('New update 2024 v44');
    console.log(`[POST - ${port}]::running`);
});
