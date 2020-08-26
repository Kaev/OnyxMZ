const mysql = require('mysql');

let con;
let teleports = {};

async function loadTeleports() {
    const rows = await con.query("SELECT * FROM teleports", function (err, result, fields) {
        if (err) throw err;
        result.forEach(row => {
            teleports[row.id] = {
                id: row.id,
                fromMapId: row.fromMapId,
                fromX: row.fromX,
                fromY: row.fromY,
                toMapId: row.toMapId,
                toX: row.toX,
                toY: row.toY
            };
        });
    });
};

async function initialize() {
    con = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123",
        database: "onyxmz"
    });
    
    loadTeleports();
};

exports.loadTeleports = loadTeleports;
exports.initialize = initialize;