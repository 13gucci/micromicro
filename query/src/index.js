const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const router = express.Router();
const port = 4002;

//Database
const posts_w_comments = {};

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

//Routing
router.get('/posts', (req, res) => {
    res.status(200).json(posts_w_comments);
});

const handleEvents = (event) => {
    const { type, data } = event;

    switch (type) {
        case 'PostCreated': {
            const { _id, title } = data;
            posts_w_comments[_id] = {
                _id,
                title,
                comments: [],
            };
            break;
        }
        case 'CommentCreated': {
            const { _id, content, postId, status } = data;
            const post = posts_w_comments[postId];

            post.comments.push({
                _id: _id,
                content,
                status,
            });
            break;
        }
        case 'CommentUpdated': {
            const { postId, _id, content, status } = data;

            const comments = posts_w_comments[postId].comments;

            const comment = comments.find((cmt) => cmt._id === _id);

            comment.status = status;
            comment.content = content;
            break;
        }
        default:
            break;
    }
};

// Register event
router.post('/events', (req, res) => {
    console.log('Received Event:: ', req.body.type);

    handleEvents(req.body);

    res.send({});
});

//Check health & Get missing Services
app.listen(port, async () => {
    console.log('Listening on 4002');
    try {
        const res = await axios.get('http://localhost:4005/events');

        for (let event of res.data) {
            console.log('Processing event:', event.type);

            handleEvents(event);
        }
    } catch (error) {
        console.log(error.message);
    }
});
