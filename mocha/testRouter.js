describe("isEqual", function() {
    it("Check equal 5=5", function() {
        assert.equal(window.isEqual(5, 5), true);
    });
    it("Check equal 0=0", function() {
        assert.equal(window.isEqual(0, 0), true);
    });
    it("Check equal 1!=0", function() {
        assert.equal(window.isEqual(1, 0), false);
    });
});