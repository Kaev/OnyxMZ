//=============================================================================
// RPG Maker MZ - OnyxMZ Player
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Overwrites Player methods for online compatibility
 * @author Kevin Bernau
 *
 * @help OnyxMZ-Player.js
 *
 * Overwrites Player methods for online compatibility
 */

Game_Player.prototype.moveByInput = function() {
    if (!this.isMoving() && this.canMove()) {
        let direction = this.getInputDirection();
        if (direction > 0) {
            $gameTemp.clearDestination();
            this.executeMove(direction);
            var movementPacket = {
                type: "playerMoved",
                dir: direction,
                mapId: $gameMap["_mapId"],
                x: this.x,
                y: this.y,
                speed: this.realMoveSpeed(),
                frequency: this.moveFrequency()
            };
            OnyxMZ.Send(movementPacket);
        }
    }
};

// Transfer Player
Game_Interpreter.prototype.command201 = function(params) {
    console.log(`Called Transfer Player Event`);
    if ($gameParty.inBattle() || $gameMessage.isBusy()) {
        return false;
    }
    let mapId, x, y;
    if (params[0] === 0) {
        // Direct designation
        mapId = params[1];
        x = params[2];
        y = params[3];
    } else {
        // Designation with variables
        mapId = $gameVariables.value(params[1]);
        x = $gameVariables.value(params[2]);
        y = $gameVariables.value(params[3]);
    }
    $gamePlayer.reserveTransfer(mapId, x, y, params[4], params[5]);
    this.setWaitMode("transfer");
    return true;
};