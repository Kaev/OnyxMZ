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
 * Implements basic functionality for OnyxMZ like file
 * operations and prepares the HTML UI
 */

function OnyxMZ() {}

// Requirements
OnyxMZ.fs = require("fs");

// Property initialization
OnyxMZ.Cache = {};

// Get HTML UI
OnyxMZ.UI = function() {
    return document.getElementById('UI');
}

// Read a file
OnyxMZ.readFile = function(path) {
    if (this.fs.existsSync(path)) {
        return this.fs.readFileSync(path, "utf8");
    }
    console.log(`${path} does not exist.`);
    return null;
};

// Write a file
OnyxMZ.writeFile = function(path, data) {
    this.fs.writeFileSync(path, data);
};

// Load or create cache file
OnyxMZ.loadCache = function() {
    var cache = OnyxMZ.readFile(".cache");
    if (cache !== null)
        this.Cache = JSON.parse(cache);
    else
        this.saveCache();
};

// Save cache file
OnyxMZ.saveCache = function() {
    OnyxMZ.writeFile(".cache", JSON.stringify(OnyxMZ.Cache));
};

(() => {
    // Load cache
    OnyxMZ.loadCache();

    // Add HTML UI css to HTML header
    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.type = 'text/css';
    stylesheet.href = 'js/plugins/OnyxMZ/css/onyxmz.css';
    document.head.appendChild(stylesheet);

    // Add HTML UI div above game canvas
    var uiDiv = document.createElement('div');
    uiDiv.id = 'UI';
    document.body.appendChild(uiDiv);

})();