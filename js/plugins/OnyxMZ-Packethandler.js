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

OnInvalidCharacter = function(data) {
    console.log(`Invalid character id ${data.characterId}`);
}

OnPlayerMoved = function(data) {
    console.log(`OnPlayerMove called: ${data}`);
};

OnWorldJoined = function(data) {
    console.log('Join World');
    DataManager.setupNewGame();
    $gamePlayer.reserveTransfer(data.map, data.x, data.y, data.direction, 0);
    SceneManager.goto(Scene_Map);
}

OnCharacterList = function(data) {
    console.log('Load Char List');
    OnyxMZ.LoadCharacterListUI(data.characters);
}

OnInvalidLogin = function(data) {
    console.log(`Invalid login data!`);
}

 OnyxMZ.PacketHandlers = {
     "invalidCharacter": OnInvalidCharacter,
     "worldJoined": OnWorldJoined,
     "playerMoved": OnPlayerMoved,
     "characterList": OnCharacterList,
     "invalidLogin": OnInvalidLogin
 }

OnyxMZ.HandlePacket = function(data) {
    if (data.opcode in OnyxMZ.PacketHandlers)
        OnyxMZ.PacketHandlers[data.opcode](data);
    else
        console.log(`Unknown packet opcode ${data.opcode}`);
};