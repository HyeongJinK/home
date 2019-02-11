const board = require("./board");
const httpMocks = require("node-mocks-http");
const should = require("should");
req = httpMocks.createRequest();
res = httpMocks.createResponse();


describe("게시판", function() {
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