OnyxMZ = {};

const Helper = require('./helper');
const WebSocket = require('ws');
const DbHandler = require('./dbHandler');
const PacketHandler = require('./packetHandler');

const wss = new WebSocket.Server({port: 1337});

const fs = require('fs');
const mapNameExpression = /Map(\d\d\d)\.json/;

let maps = {};

OnyxMZ.Clients = {};

(async () => {



    await DbHandler.initialize();

    /*console.log(OnyxMZ.Db.Accounts);
    console.log(OnyxMZ.Db.Teleports);
    console.log(OnyxMZ.Db.Characters);

    let account = await Helper.findAsync(OnyxMZ.Db.Accounts, account => account.name === 'Kaev');
    console.log(account);*/

})();

// Event for new client connection
wss.on('connection', ws => {
    ws.isAlive = true;
    console.log(`${ws._socket.remoteAddress}:${ws._socket.remotePort} connected.`);
    OnyxMZ.Clients[ws] = 'test';

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
        delete OnyxMZ.Clients[ws];
    });

    // Event for client disconnected
    ws.on('close', function(code, reason) {
        console.log(`Client ${ws._socket.remoteAddress}:${ws._socket.remotePort} disconnected: Code ${code} Reason: ${reason}`);
        delete OnyxMZ.Clients[ws];
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
            delete OnyxMZ.Clients[ws];
            return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping();
    });
};
setInterval(heartbeat, 10000);

OnyxMZ.Send = function(ws, data) {
    var json = JSON.stringify(data);
    ws.send(json);
};