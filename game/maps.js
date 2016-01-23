var common = require('../common.js');
var ROT = require('rot-js');

var Maps = module.exports = {
    drawMapTile: drawMapTile,
    placeLoot: placeLoot,
    getOptions: getOptions
};

var diggerOptions = {
    mines: {
        roomWidth: [2, 10],
        roomHeight: [2, 10],
        corridorLength: [3, 6],
        dugPercentage: 0.5,
        timeLimit: 1500
    }
};

function getOptions(map) {
    return diggerOptions[map];
}


function drawMapTile(key) {
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    this.display.draw(x, y, this.map[key]);
}


function placeLoot(freeCells) {
    var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    var key = freeCells.splice(index, 1)[0];
    this.map[key] = "*";
}