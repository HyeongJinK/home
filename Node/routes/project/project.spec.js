const project = require("./project");
const taskDB = require("./db/task");
const httpMocks = require("node-mocks-http");
const should = require("should");
const sinon = require("sinon");

let sandbox;
describe("프로젝트 Mock", () => {
    before (() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(taskDB, 'findByAll', () => {
            return new Promise((resolve, reject) => {
                resolve({
                    "db": null,
                    "err": null,
                    "rows": [{idx: 1, title: "test", content: "test content"}]
                });
            })
        });
    });

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    describe("Task List View", () => {
        it("statusCode 200", () => {
            project.list(req, res);
            res.statusCode.should.be.equal(200);
        });
    });

    describe("Task List Data", () => {
        it("statusCode 200", (done) => {
            res.on('end', ()=> {
                let resData = JSON.parse(res._getData());
                done();
            })

            project.getList(req, res);
        });
    });

    after(() => {
        sandbox.restore();
    })
});