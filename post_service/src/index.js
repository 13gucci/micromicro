const express = require('express');
const morgan = require('morgan');
const { randomBytes } = require('node:crypto');
const cors = require('cors');

const app = express();
const port = 4000;
const router = express.Router();

// Database
const posts = {};

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(router);

// Routing
router.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

router.post('/posts', (req, res) => {
    const { title } = req.body;
    const _id = randomBytes(4).toString('hex');

    const newPost = {
        _id,
        title,
    };

    posts[_id] = newPost;

    res.status(201).json({
        message: 'Create new post success',
        data: posts[_id],
    });
});

router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Service posts health check ok',
    });
});

app.listen(port, () => {
    console.log(`App is running on ${port}`);
});
