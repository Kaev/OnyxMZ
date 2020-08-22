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
console.log(PluginManager.parameters('OnyxMZ-Websocket')['Server']);
OnyxMZ.Server = `ws://${PluginManager.parameters('OnyxMZ-Websocket')['Server']}:${PluginManager.parameters('OnyxMZ-Websocket')['Port']}`;
OnyxMZ.Connection = new OnyxMZ.WebSocket(OnyxMZ.Server);

// Event for opened server connection
OnyxMZ.Connection.onopen = function() {
    let data = {
        data: 'Opened Connection'
    };
    OnyxMZ.Send(data);
}

// Event for socket errors
OnyxMZ.Connection.onerror = function(e) {
    console.log(`WebSocket error: ${e}`);
}

// Event for received server messages
OnyxMZ.Connection.onmessage = function(e) {
    //let received = JSON.parse(e.data);
    console.log(`Received: ${e.data}`);
}

// Stringify an object and send it to the server
OnyxMZ.Send = function(data) {
    var json = JSON.stringify(data);
    OnyxMZ.Connection.send(json);
    console.log(`Sent: ${json}`);
}
