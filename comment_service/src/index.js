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

/*

    const commentsByPostId = {
        "34p51j": [
            {
                _id: "hjzc",
                content: "greate post",
                status: ___
            },
            {
                _id: "hjzc",
                content: "greate post",
                status: ___
            }
        ]
    }

 */

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

// Create Comment
router.post('/posts/:post_id/comments', async (req, res) => {
    const { post_id } = req.params;
    const { content } = req.body;
    const _id = randomBytes(4).toString('hex');

    const newComment = {
        _id,
        content,
        status: 'Pending',
    };

    const oldComments = commentsByPostId[post_id] || [];

    oldComments.push(newComment);

    commentsByPostId[post_id] = oldComments;

    // Publish to Event Bus
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            _id,
            postId: post_id,
            content: newComment.content,
            status: 'Pending',
        },
    });

    res.status(201).json({
        message: 'Created success comment',
        data: commentsByPostId[post_id],
    });
});

// Register event
router.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('Received Event:: ', type);

    if (type === 'CommentModerated') {
        const { postId, _id, content, status } = data;

        const comments = commentsByPostId[postId];

        const comment = comments.find((cmt) => cmt._id === _id);

        comment.status = status;

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                _id,
                postId,
                content,
                status,
            },
        });
    }

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
