const Helper = require('./helper');

function OnPlayerMove(ws, data) {
    let test = {
        opcode: "playerMoved"
    };
    ws.send(JSON.stringify(test));
};

function OnWorldJoin(ws, data) {
    let character = OnyxMZ.Db.Characters[data.characterId];
    if (character === undefined)
    {
        let invalidCharacterPacket = {
            opcode: "invalidCharacter",
            characterId: data.characterId
        };
        OnyxMZ.Send(ws, invalidCharacterPacket);
        return;
    }

    let joinedWorldPacket = {
        opcode: "worldJoined",
        id: character.id,
        name: character.name,
        map: character.map,
        x: character.x,
        y: character.y,
        direction: character.direction
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