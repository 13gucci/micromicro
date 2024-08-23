const express = require('express');
const cors = require('cors');
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

// Register event
router.post('/events', (req, res) => {
    console.log('Received Event:: ', req.body.type);
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { _id, title } = data;
        posts_w_comments[_id] = {
            _id,
            title,
            comments: [],
        };
    }

    if (type === 'CommentCreated') {
        const { _id, content, postId } = data;
        const post = posts_w_comments[postId];

        post.comments.push({
            _id: _id,
            content,
        });
    }

    console.log(posts_w_comments);
    res.send({});
});

//Check health
app.listen(port, () => {
    console.log(`[QUERY- ${port}]::running`);
});
