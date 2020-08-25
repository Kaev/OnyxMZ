

const WebSocket = require('ws');
const PacketHandler = require('./packetHandler');

const wss = new WebSocket.Server({port: 1337});

// Event for new client connection
wss.on('connection', ws => {
    ws.isAlive = true;
    console.log(`${ws._socket.remoteAddress}:${ws._socket.remotePort} connected.`);

    // Event for heartbeat packet
    ws.on('pong', function(data) {
        ws.isAlive = true;
    });

    // Event for client message received
    ws.on('message', function(data) {
        console.log(`Received packet: ws: ${ws} data: ${data}`);
        PacketHandler.handlePacket(ws, JSON.parse(data));
    });

    // Event for socket error
    ws.on('error', function(error) {
        console.log(`Socket error: ${error}`);
    });

    // Event for client disconnected
    ws.on('close', function(code, reason) {
        console.log(`Client ${ws._socket.remoteAddress}:${ws._socket.remotePort} disconnected: Code ${code} Reason: ${reason}`);
    });
});

// Event for websocket server error
wss.on('error', (err) => {
    console.log(`Websocket server error: ${err}`);
});

// Serverside heartbeat
function heartbeat() {
    wss.clients.forEach(function (ws) {
        if (ws.isAlive === false)
        {
            console.log(`Heartbeat fail: ${ws._socket.remoteAddress}:${ws._socket.remotePort}`);
            return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping();
    });
};
setInterval(heartbeat, 10000);