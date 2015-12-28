var common = require("./common");

describe("Stonebearer Unit Tests ->", function() {
    beforeEach(function() {});

    importTest("Player module ->", './spec/player.spec.js');

    importTest("Loot module ->", './spec/loot.spec.js');

    importTest("Entity module ->", './spec/entity.spec.js');

    importTest("Lore module ->", './spec/lore.spec.js');

    it("does stuff", function() {})

    after(function() {});
});

function importTest(name, path) {
    describe(name, function() {
        require(path);
    });
}