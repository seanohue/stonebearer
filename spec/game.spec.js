var common = require('../common');
var Game = require('../game');
var Player = require('../player');
var Entity = require('../entity');
var Loot = require('../loot');
var Lore = require('../lore');
var ROT = require('rot-js');
var expect = common.expect;

Game.init();

describe("Game initialization station", function() {

    it("should have a display", function() {
        expect(Game.display).to.be.instanceof(ROT.Display);
    });

    it("should have an engine", function() {
        expect(Game.engine).to.be.instanceof(ROT.Engine);
    });

    describe("Entity group initialization", function() {

        it("should have an array of entity objects", function() {
            expect(Game._entities).to.be.an.Array;

            //TODO: create mockEntity to put in mochaHelper.js to help with testing entities here and in the entity spec.
            for (var item in Game._entities) {
                var entity = Game._entities[item];
                expect(entity).to.be.an.Object;
            }

            it("should create a specific number of entities", function() {
                expect(Game._entities.length).to.equal(22);
            });
        });
    });
});



// For now, these are all kind of indirectly tested by the game.init function. 


xdescribe("ShowMessage method", function(){
	it("does message stuff", function(){});
});

xdescribe("Map generation station", function(){
	it("creates a map", function(){});
});

describe("Being generation station", function(){

})



    // TODO: find a way to mock keypress events (stdin?)
    // TODO: add sinon to stub out methonds like stdout to see if they are called as needed.
