console.log("I BE HELPIN'.");

function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

// var common = require("./common");

describe("top", function () {
    beforeEach(function () {
       console.log("running something before each test");
    });
    
    importTest("Player module", './spec/player.spec.js');

    it("does stuff", function() {
    	console.log("things.");
    })

    after(function () {
        console.log("after all tests");
    });
});