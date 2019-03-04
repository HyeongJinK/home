const board = require("./board");
const httpMocks = require("node-mocks-http");
const should = require("should");



describe("게시판 Mock", function() {
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    describe("Board", function() {
        it("List View StatusCode 200", function() {
            board.BoardController.listView(req, res);
            res.statusCode.should.be.equal(200);
        });

        it("Form View StatusCode 200", () => {
            board.BoardController.formView(req, res);
            res.statusCode.should.be.equal(200);
        });
    });

    describe("BoardContent", function() {
        it("List View StatusCode 200", function() {
            board.BoardContentController.listView(req, res);
            res.statusCode.should.be.equal(200);
        });
    });
});