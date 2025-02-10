//var navTest =require ('./navigateTests/navigate.js')
var assert = require('assert');
const {Builder,Browser, By, Key} = require ("selenium-webdriver");

describe("All tests", async function () {

//launche the browser 
let driver = await new Builder().forBrowser(Browser.FIREFOX).build()

    beforeEach(function () {
       console.log("running something before each test");
    });

    //describe('navTests',navTest)
    
    it("blah a", function () {
       
        console.log("Hello ola");
        assert.equal("asdf","asdf");
        assert.ok(true);
    });
    //importTest("menu navigate", 'navigateTests/menuNavigateTests.js');
    //importTest("b", './b/b');
    after(function () {
        console.log("after all tests");
    });
});
