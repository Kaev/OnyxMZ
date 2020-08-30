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
    var invalidAccountDialog = document.getElementById('invalid-character-dialog');
    invalidAccountDialog.showModal();
}

OnPlayerMoved = function(data) {
    console.log(`OnPlayerMove called: ${data}`);
};

OnWorldJoined = function(data) {

    console.log(data);

    // Clear character list UI
    OnyxMZ.ClearUI();

    // Prepare new game status
    DataManager.setupNewGame();

    // Teleport player to map
    $gamePlayer.reserveTransfer(data.map, data.x, data.y, data.direction, 0);
    SceneManager.goto(Scene_Map);
}

OnCharacterList = function(data) {
    OnyxMZ.LoadCharacterListUI(data.characters);
}

OnInvalidLogin = function(data) {
    var invalidAccountDialog = document.getElementById('invalid-account-dialog');
    invalidAccountDialog.showModal();
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