const Helper = require('./helper');

function OnPlayerMove(ws, data) {
    let test = {
        opcode: "playerMoved"
    };
    ws.send(JSON.stringify(test));
};

function OnWorldJoin(ws, data) {
    let playerCharacter = OnyxMZ.Db.Characters[data.characterId];
    if (playerCharacter === undefined)
    {
        let invalidCharacterPacket = {
            opcode: "invalidCharacter"
        };
        OnyxMZ.Send(ws, invalidCharacterPacket);
        return;
    }

    let joinedWorldPacket = {
        opcode: "worldJoined",
        id: playerCharacter.id,
        name: playerCharacter.name,
        map: playerCharacter.map,
        x: playerCharacter.x,
        y: playerCharacter.y,
        direction: playerCharacter.direction /*,
        players: OnyxMZ.Db.Characters.find(character => character !== undefined && character != playerCharacter && character.map === playerCharacter.map)
        .map(char => ({id: char.id, name: char.name, x: char.x, y: char.y}))*/
    };
    OnyxMZ.Send(ws, joinedWorldPacket);
};

function OnLogin(ws, data) {
    let account = OnyxMZ.Db.Accounts.find(account => account !== undefined && account.name === data.username);
    console.log(account);

    if (account === undefined || account.password !== data.password)
    {
        let invalidLoginPacket = {
            opcode: "invalidLogin"
        };
        OnyxMZ.Send(ws, invalidLoginPacket);
        return;
    }

    let characters = OnyxMZ.Db.Characters.filter(character => character.accountId === account.id);
    let characterListPacket = {
        opcode: "characterList",
        characters: characters.map(character => {
            return {
                id: character.id, 
                name: character.name
            };
        })
    };
    OnyxMZ.Send(ws, characterListPacket);
};

let packetHandlers = {
    "playerMoved": OnPlayerMove,
    "worldJoin": OnWorldJoin,
    "login": OnLogin
}

function handlePacket(ws, data) {
    if (data.opcode in packetHandlers)
        packetHandlers[data.opcode](ws, data);
    else
        console.log(`Unknown packet opcode ${data.opcode}`);
};

exports.handlePacket = handlePacket;