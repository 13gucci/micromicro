const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const router = express.Router();

const port = 4005;

// Middleware
app .use(express.json());
app.use(router);

// Database
const events = []; 

// Routing
app.post('/events', (req, res) => {
    const event = req.body;
    //Save events to db
    events.push(event);
    console.log(events);
    axios.post('http://localhost:4000/events', event).catch((err) => console.log(err));
    axios.post('http://localhost:4001/events', event).catch((err) => console.log(err));
    axios.post('http://localhost:4002/events', event).catch((err) => console.log(err));
    axios.post('http://localhost:4003/events', event).catch((err) => console.log(err));

    res.send({ status: 'OK' });
});

// Get all events from event store
app.get('/events', (req, res) => {
    res.send(events);
});

// Check health
app.listen(port, () => {
    console.log(`[Event bus]:: running on port ${port}`);
});
