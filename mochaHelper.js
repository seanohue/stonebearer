var common = require("./common");

describe("Stonebearer Unit Tests ->", function () {
    beforeEach(function () {
    });
    
    importTest("Player module ->", './spec/player.spec.js');

    it("does stuff", function() {
    })

    after(function () {
    });
});

function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}