//=============================================================================
// RPG Maker MZ - OnyxMZ Websocket
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Offers websocket functionality for OnyxMZ
 * @author Kevin Bernau
 *
 * @help OnyxMZ-Websocket.js
 * 
 * @param Server
 * @desc Server address
 * @default localhost
 * 
 * @param Port
 * @desc Server port
 * @default 1337
 *
 * @help OnyxMZ-Websocket.js
 * 
 * This plugin offers websocket functionality for OnyxMZ
 */


OnyxMZ.WebSocket = require('ws');
OnyxMZ.Server = `ws://${PluginManager.parameters('OnyxMZ-Websocket')['Server']}:${PluginManager.parameters('OnyxMZ-Websocket')['Port']}`;
OnyxMZ.Connection = new OnyxMZ.WebSocket(OnyxMZ.Server);

// Event for opened server connection
OnyxMZ.Connection.on('open', function() {
    OnyxMZ.Heartbeat();
});

// Event for received server messages
OnyxMZ.Connection.on('message', function(data) {
    console.log(`Received: data: ${data}`);
    OnyxMZ.HandlePacket(JSON.parse(data));
});

// Event for socket errors
OnyxMZ.Connection.on('error', function(error) {
    console.log(`Socket Error: ${error}`);
});

// Event for connection closed
OnyxMZ.Connection.on('close', function() {
    console.log(`Connection closed.`);
    clearTimeout(this.pingTimeout);
});

// Heartbeat
OnyxMZ.Heartbeat = function() {
    clearTimeout(OnyxMZ.Connection.pingTimeout);
    OnyxMZ.Connection.pingTimeout = setTimeout(() => {
        console.log(`Terminating connection, heartbeat failed.`);
        OnyxMZ.Connection.terminate();
    }, 11000);
};
OnyxMZ.Connection.on('ping', OnyxMZ.Heartbeat);

// Stringify an object and send it to the server
OnyxMZ.Send = function(data) {
    var json = JSON.stringify(data);
    OnyxMZ.Connection.send(json);
    console.log(`Sent: ${json}`);
};
