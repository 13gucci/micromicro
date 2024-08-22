const express = require('express');

const app = express();
const router = express.Router();
const port = 4002;

//Database
const posts_w_comments = {};

//Middleware
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

    res.send({});
});

//Check health
app.listen(port, () => {
    console.log(`[Query]:: is running on ${port}`);
});
