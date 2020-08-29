const db = require('./database');

OnyxMZ.Db = new db.database("localhost", "root", "123", "onyxmz");

OnyxMZ.Db.Accounts = [];
OnyxMZ.Db.Characters = [];
OnyxMZ.Db.Teleports = [];

async function loadAccounts() {
    await OnyxMZ.Db.query('SELECT * FROM accounts')
    .then(rows => {
        rows.forEach(row => {
            OnyxMZ.Db.Accounts[row.id] = {
                id: row.id,
                name: row.name,
                password: row.password
            };
        });
    })
    .catch(err => {
        throw err;
    });
}

async function loadCharacters() {
    await OnyxMZ.Db.query("SELECT * FROM characters")
    .then(rows => {
        rows.forEach(row => {
            OnyxMZ.Db.Characters[row.id] = {
                id: row.id,
                accountId: row.accountId,
                name: row.name,
                map: row.map,
                x: row.x,
                y: row.y,
                direction: row.direction
            };
        });
    })
    .catch(err => {
        throw err;
    });
}

async function loadTeleports() {
    await OnyxMZ.Db.query("SELECT * FROM teleports")
    .then(rows => {
        rows.forEach(row => {
            OnyxMZ.Db.Teleports[row.id] = {
                id: row.id,
                fromMapId: row.fromMapId,
                fromX: row.fromX,
                fromY: row.fromY,
                toMapId: row.toMapId,
                toX: row.toX,
                toY: row.toY
            };
        });
    })
    .catch(err => {
        throw err;
    });
};

async function initialize() {
    console.log('Load database');

    await Promise.all([
        loadAccounts(), 
        loadCharacters(), 
        loadTeleports()
    ])
    .then(values => {
        console.log('Loading database done');
    })
    .catch(err => {
        throw err;
    })
};

exports.initialize = initialize;
exports.loadTeleports = loadTeleports;
exports.loadAccounts = loadAccounts;
exports.loadCharacters = loadCharacters;
