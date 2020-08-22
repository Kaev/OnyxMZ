const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 1337});

// Event for new client connection
wss.on('connection', ws => {
    ws.isAlive = true;
    ws.on('pong', () => {
        ws.isAlive = true;
    });
    console.log(`${ws._socket.remoteAddress}:${ws._socket.remotePort} connected.`);
});

// Event for client message received
wss.on('message', (ws, msg) => {
    console.log(`Received: ${msg}`);
    /*let data = {
        data: `You sent: ${msg}`
    }*/
    ws.send(msg);
});

// Event for client disconnected
wss.on('close', (ws, e) => {
    console.log(`Client ${ws._socket.remoteAddress}:${ws._socket.remotePort} disconnected: Code ${e.code}`);
})

// Serverside heartbeat
function heartbeat() {
    wss.clients.forEach(function (ws) {
        if (ws.isAlive === false)
            return ws.terminate();
        ws.isAlive = false;
        ws.ping();
    });
}
setInterval(heartbeat, 10000);