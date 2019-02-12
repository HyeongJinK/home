const board = require("./board");
const httpMocks = require("node-mocks-http");
const should = require("should");



describe("게시판 Mock", function() {
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    describe("Board List", function() {
        it("statusCode 200", function() {
            board.list(req, res);
            res.statusCode.should.be.equal(200);
        });
    });

    describe("Content List", function() {
        it("statusCode 200", function() {
            board.list(req, res);
            res.statusCode.should.be.equal(200);
        });
    });
});