const express = require('express');
const axios = require('axios');
const router = express.Router();

const app = express();
const port = 4003;

// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(router);

// Router
router.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('Received Event:: ', type);

    if (type === 'CommentCreated') {
        const status = data.content.includes(['orange']) ? 'Rejected' : 'Approved';

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                _id: data._id,
                postId: data.postId,
                status,
                content: data.content,
            },
        });
    }

    res.send({});
});

// Check health
app.listen(port, () => {
    console.log(`[MODERATION - ${port}]::running`);
});
