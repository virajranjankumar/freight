jest.dontMock("../address");

describe("Address", function() {
	var address = require("../address");

	it("creates an empty address", function() {
		var a = address.create();
		expect(address.verify(a)).toBeDefined();
	})
})