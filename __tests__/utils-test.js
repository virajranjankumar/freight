jest.dontMock("../utils");

describe("Utils", function() {
  var utils = require("../utils");
  var Immutable = require("immutable");
  var map;

  beforeEach(function() {
    map = Immutable.Map({"key": "value"});
  });

  it("verifies a nonempty string", function() {
    var value = utils.verify_string(map, "key", "value");
    expect(value).toBe("value");
  });
  it("verifies a string value");
  it("verifies a float");
  it("verifies a float with a value");
  it("verifies an integer");
  it("verifies an integer with a value");
  it("verifies membership in a collection");
  it("verifies creation of a resource");
});
