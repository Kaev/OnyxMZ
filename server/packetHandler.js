async function OnPlayerMove(ws, data) {
    let test = {
        type: "playerMoved"
    }
    ws.send(JSON.stringify(test));
}

let packetHandlers = {
    "playerMoved": OnPlayerMove
}

async function handlePacket(ws, data) {

    if (data.type in packetHandlers)
        packetHandlers[data.type](ws, data);
    else
        console.log(`Unknown packet type ${data.type}`);
}

exports.handlePacket = handlePacket;