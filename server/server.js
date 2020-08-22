const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 1337});

wss.on('connection', ws => {
    ws.on('message', msg => {
        console.log(`Received: ${msg}`);
        /*let data = {
            data: `You sent: ${msg}`
        }*/
        ws.send(msg);
    });
});

