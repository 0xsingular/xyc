const express = require("express");
const bodyParser = require("body-parser");
const WebSocket = require("ws");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

const wss = new WebSocket.Server({ port: 3000 });
let commitCount = 0;

function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

app.post("/webhook", (req, res) => {
    if (req.body.commits && req.body.commits.length > 0) {
        commitCount += req.body.commits.length;
        console.log(`New commits: ${req.body.commits.length}. Total: ${commitCount}`);
        broadcast(commitCount.toString());
    }
    res.status(200).send("Webhook received");
});

app.listen(3001, () => console.log("Server running on port 3001"));
