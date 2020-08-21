//=============================================================================
// RPG Maker MZ - OnyxMZ Title Screen
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Replaces the title screen with the OnyxMZ login title screen
 * @author Kevin Bernau
 *
 * @help OnyxMZ-TitleWindow.js
 *
 * This plugin replaces the title screen with the OnyxMZ login title screen
 */

function Scene_Login() {
    this.initialize(...arguments);
}

Scene_Login.prototype = Object.create(Scene_Base.prototype);
Scene_Login.prototype.constructor = Scene_Login;

Scene_Login.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
}

Scene_Login.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    
    // Set background
    this._backSprite1 = new Sprite(
        ImageManager.loadTitle1($dataSystem.title1Name)
    );
    this.addChild(this._backSprite1);

    // Set login form
    var loginHtml = OnyxMZ.readFile("js/plugins/OnyxMZ/html/login.html");
    document.getElementById('UI').innerHTML = loginHtml;

    var connectButton = document.getElementById('connect').onclick = function() {
        console.log(`Connect`);
    }

}

Scene_Login.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    SceneManager.snapForBackground();
};

Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Login);
    }
    this.resizeScreen();
    this.updateDocumentTitle();
};

