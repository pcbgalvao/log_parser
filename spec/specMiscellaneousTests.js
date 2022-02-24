
//var logParser = require('../app/log_parser');

describe("miscellaneous Tests", function miscellaneousTests() {
  beforeEach(function () {
    this.foo = 12;
  });

  it("Simple test on an imagenary log", function () {    
    let matchesFound= 2; //logParser("123", "logfiless");
    expect(matchesFound.toEqual(0));
  });
  
});