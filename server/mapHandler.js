const fs = require('fs');
const mapNameExpression = /Map(\d\d\d)\.json/;

let maps = {};

function loadMaps() {
    fs.readdirSync(__dirname + '/../data/').forEach(file => {
        if (match = file.match(mapNameExpression))
            maps[match[1]] = match[0];
    });
};

exports.maps = maps;
exports.loadMaps = loadMaps;