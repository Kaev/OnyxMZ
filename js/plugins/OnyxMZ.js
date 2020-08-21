//=============================================================================
// RPG Maker MZ - OnyxMZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Implements basic functionality for OnyxMZ
 * @author Kevin Bernau
 *
 * @help OnyxMZ.js
 *
 * Implements basic functionality for OnyxMZ
 */

function OnyxMZ() {}

OnyxMZ.fs = require("fs");

OnyxMZ.readFile = function(path) {
    if (this.fs.existsSync(path)) {
        return this.fs.readFileSync(path, "utf8");
    }
    console.log(`${path} does not exist.`);
    return null;
};