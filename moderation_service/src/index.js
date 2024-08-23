const express = require('express');
const router = express.Router();

const app = express();
const port = 4003;

// Middleware
app.use(express.json());
app.use(router);

// Router
router.post('/events', (req, res) => {
    res.send({});
});

// Check health
app.listen(port, () => {
    console.log(`[MODERATION - ${port}]::running`);
});
