const project = require("./project")
const httpMocks = require("node-mocks-http");
const should = require("should");


describe("프로젝트 Mock", () => {
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    describe("Task List", () => {
        it("statusCode 200", () => {
            project.list(req, res);
            res.statusCode.should.be.equal(200);
        });
    });
});