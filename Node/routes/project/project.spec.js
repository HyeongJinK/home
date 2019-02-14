const project = require("./project");
const projectDB = require("./db/projectDB");
const httpMocks = require("node-mocks-http");
const supertest =  require("supertest")
const should = require("should");
const sinon = require("sinon");


describe("프로젝트 Mock", () => {
    var sandbox;
    
    before(() => {
        sandbox = sinon.createSandbox();

        sandbox.stub(projectDB.taskService, 'findByAll').callsFake(function (data) {
            return new Promise((resolve, reject) => {
                resolve({
                    "db": null,
                    "err": null,
                    "rows": [ { idx: 1,
                        parentIdx: 0,
                        title: 'test',
                        content: 'test',
                        status: '1',
                        startTime: '2019-01-01',
                        finishTime: '2019-12-12' } ]
                });
            });
        });
    })

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
    });

    describe("Task List", () => {
        it("List Page StatusCode 200", () => {
            project.list(req, res);
            res.statusCode.should.be.equal(200);
        });

        it("List Data StatusCode 200 And Data Equal", (done) => {
            res.on('end', ()=> {
                let resData = res._getData().data[0];

                res.statusCode.should.be.equal(200);
                resData.should
                    .be.instanceOf(Object)
                    .and.have.properties(['idx', 'parentIdx', 'title', 'content', 'status', 'startTime', 'finishTime']);
                resData.idx.should.be.equal(1);
                resData.title.should.be.equal("test");
                done();
            })

            project.getList(req, res);
        });
    });

    describe("Task Read", () => {

    });

    describe("Task Form", () => {

    });

    

    after(() => {
        sandbox.restore();
    })
});