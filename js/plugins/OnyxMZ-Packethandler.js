//=============================================================================
// RPG Maker MZ - OnyxMZ Packethandler
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Handles received packets from the server
 * @author Kevin Bernau
 *
 * @help OnyxMZ-Packethandler.js
 *
 * Handles received packets from the server
 */

OnyxMZ.OnPlayerMoved = function(data) {
    console.log(`OnPlayerMove called: ${data}`);
};

 OnyxMZ.PacketHandlers = {
     "playerMoved": OnyxMZ.OnPlayerMoved
 }

OnyxMZ.HandlePacket = function(data) {
    if (data.type in OnyxMZ.PacketHandlers)
        OnyxMZ.PacketHandlers[data.type](data);
    else
        console.log(`Unknown packet type ${data.type}`);
};