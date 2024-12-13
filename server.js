const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // Parse incoming JSON requests

let commitCount = 0;

// Define the /webhook endpoint
app.post("/webhook", (req, res) => {
    if (req.body.commits && req.body.commits.length > 0) {
        commitCount += req.body.commits.length;
        console.log(`New commits pushed. Total commit count: ${commitCount}`);
    }
    res.status(200).send("Webhook received successfully!"); // Respond to GitHub
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
