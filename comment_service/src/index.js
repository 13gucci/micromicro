const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { randomBytes } = require('node:crypto');
const axios = require('axios');
const app = express();
const port = 4001;
const router = express.Router();

// Database
const commentsByPostId = {};

// Middleware
app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());
app.use(router);

// Routing
router.get('/posts/:post_id/comments', (req, res) => {
    const { post_id } = req.params;

    res.status(200).json(commentsByPostId[post_id] ?? []);
});

router.post('/posts/:post_id/comments', async (req, res) => {
    const { post_id } = req.params;
    const { content } = req.body;
    const _id = randomBytes(4).toString('hex');

    const newComment = {
        _id,
        content,
    };

    const oldComments = commentsByPostId[post_id];

    if (!oldComments) {
        commentsByPostId[post_id] = [newComment];
    } else {
        commentsByPostId[post_id] = [...oldComments, newComment];
    }

    // Publish to Event Bus
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            _id: newComment._id,
            content: newComment.content,
            postId: post_id,
        },
    });

    res.status(201).json({
        message: 'Created success comment',
        data: commentsByPostId[post_id],
    });
});

// Register event
router.post('/events', (req, res) => {
    console.log('Received Event:: ', req.body.type);

    res.send({});
});

router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Service comments health check ok',
    });
});

app.listen(port, () => {
    console.log(`[COMMENT - ${port}]::running`);
});
