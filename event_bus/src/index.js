const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const router = express.Router();

const port = 4005;

// Middleware
app.use(cors());
// app.use(morgan('dev'));
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
    console.log(`[Event bus]:: running on port ${port}`);
});
