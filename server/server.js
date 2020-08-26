const WebSocket = require('ws');
const DbHandler = require('./dbHandler');
const PacketHandler = require('./packetHandler');
const MapHandler = require('./mapHandler');

const wss = new WebSocket.Server({port: 1337});

(async function() {


    await DbHandler.initialize();
    MapHandler.loadMaps();

})();

console.log('test');

// Event for new client connection
wss.on('connection', ws => {
    ws.isAlive = true;
    console.log(`${ws._socket.remoteAddress}:${ws._socket.remotePort} connected.`);

    // Event for heartbeat packet
    ws.on('pong', function(data) {
        ws.isAlive = true;
    });

    // Event for client message received
    ws.on('message', async function(data) {
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