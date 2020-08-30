//=============================================================================
// RPG Maker MZ - OnyxMZ Title Screen
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Replaces the title screen with the OnyxMZ login screen
 * @author Kevin Bernau
 *
 * @help OnyxMZ-TitleWindow.js
 *
 * This plugin replaces the title screen with the OnyxMZ login screen
 */

 function login(username, password) {
    // Save username to cache if not empty
    if (!!username)
    {
        OnyxMZ.Cache.account = username;
        OnyxMZ.saveCache();
    }

    let loginPacket = {
        opcode: "login",
        username: username,
        password: password
    };
    OnyxMZ.Send(loginPacket);
 }

 OnyxMZ.LoadLoginUI = function() {
    var loginHtml = OnyxMZ.readFile("js/plugins/OnyxMZ/html/login.html");
    OnyxMZ.UI().innerHTML = loginHtml;

    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var invalidAccountDialog = document.getElementById('invalid-account-dialog');

    // Load username if cache is not empty
    if (!!OnyxMZ.Cache.account) {
        username.value = OnyxMZ.Cache.account;
        password.focus();
    }
    else
        username.focus();

    // Add logic to password input
    password.onkeydown = function(e) {
        if (e.keyCode === 13) { // Enter
            e.preventDefault();
            login(username.value, password.value);
        }
    }

    // Add logic to connect button
    document.getElementById('login-connect-button').onclick = function() {
        login(username.value, password.value);
    }

    // Add logic to invalid account dialog button
    document.getElementById('cancel-invalid-account-dialog').onclick = function() {
        invalidAccountDialog.close();
        password.value = '';
        password.focus();
    };
};

OnyxMZ.LoadCharacterListUI = function(characters) {
    var characterListHtml = OnyxMZ.readFile("js/plugins/OnyxMZ/html/characterList.html");
    OnyxMZ.UI().innerHTML = characterListHtml;

    var buttonContainer = document.getElementById('character-button-container');
    var invalidCharacterDialog = document.getElementById('invalid-character-dialog');

    // Create a button for each character
    characters.forEach(character => {
        var characterButton = document.createElement("Button");
        characterButton.innerHTML = character.name;
        characterButton.tabIndex = -1;

        characterButton.onclick = function() {
            let worldJoinPacket = {
                opcode: "worldJoin",
                characterId: character.id
            };
            OnyxMZ.Send(worldJoinPacket);
        };

        buttonContainer.appendChild(characterButton);
    });

    // Add logic to invalid character dialog button
    document.getElementById('cancel-invalid-character-dialog').onclick = function() {
        invalidCharacterDialog.close();
    };
};

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

    // Load login form and replace HTML UI with it
    OnyxMZ.LoadLoginUI();
}

Scene_Login.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    SceneManager.snapForBackground();
};

Scene_Login.prototype.processHandling = function()
{
    console.log(Input.isRepeated('backspace'));
}

Input._shouldPreventDefault = function(keyCode) {
    /*switch (keyCode) {
        case 8: // backspace
        case 9: // tab
        case 33: // pageup
        case 34: // pagedown
        case 37: // left arrow
        case 38: // up arrow
        case 39: // right arrow
        case 40: // down arrow
            return true;
    }*/
    return false;
};

// Overwrite Scene_Boot.start to show Scene_Login instead of Scene_Title
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