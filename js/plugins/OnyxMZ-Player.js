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