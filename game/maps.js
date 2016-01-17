var common = require('../common.js');
var ROT = require('rot-js');

var Maps = module.exports = {
    drawMapTile: drawMapTile,
    placeLoot: placeLoot
}; 


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