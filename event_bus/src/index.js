const express = require('express');
const axios = require('axios');
const app = express();
const router = express.Router();

const port = 4002;

// Middleware
app.use(express.json());
app.use(router);

// Routing
router.post('/events', async (req, res) => {
    const event = req.body;

    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4002/events', event);

    res.send({ status: 'OK' });
});

// Check health
app.listen(port, () => {
    console.log(`Event bus still running on port ${port}`);
});
