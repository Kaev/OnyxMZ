//=============================================================================
// RPG Maker MZ - OnyxMZ
//=============================================================================

const { link } = require("fs");

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

(() => {

    // Add HTML UI css to HTML header
    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.type = 'text/css';
    stylesheet.href = 'js/plugins/OnyxMZ/css/onyxmz.css';
    document.head.appendChild(stylesheet);

    // Add HTML UI div above game canvas
    var uiDiv = document.createElement('div');
    uiDiv.id = 'UI';
    uiDiv.style = 'position:absolute;z-index:3;';
    uiDiv.style.zIndex = 3;
    uiDiv.style.position = 'absolute';
    document.body.appendChild(uiDiv);

})();