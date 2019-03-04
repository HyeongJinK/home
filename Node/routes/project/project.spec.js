const project = require("./project");
const projectDB = require("./db/projectDB");
const httpMocks = require("node-mocks-http");
const should = require("should");
const sinon = require("sinon");


describe("Project Mock Test", () => {
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
    });

    describe("Project List", () => {
        it("Read View StatusCode 200", () => {
            project.ProjectController.listView(req, res);

            res._getRenderView().should.be.equal("project/project/list");            
            res._getRenderData().menu[0].should.be.equal("Project");
            res._getRenderData().menu[1].should.be.equal("Project 목록");
            res.statusCode.should.be.equal(200);
        });
    });


    describe("Task List", () => {
        let sandbox;
    
        before(() => {
            sandbox = sinon.createSandbox();

            sandbox.stub(projectDB.taskService, 'findByAll').callsFake(function (data) {
                return new Promise((resolve, reject) => {
                    data["tasks"] = [ { idx: 1,
                        parentIdx: 0,
                        title: 'test',
                        content: 'test',
                        status: '1',
                        startTime: '2019-01-01',
                        finishTime: '2019-12-12' } ]
                    resolve(data);
                });
            });

            sandbox.stub(projectDB.taskService, 'count').callsFake((data) => {
                return new Promise((resolve, reject) => {
                    data["count"] = {total: 42};
                    resolve(data);
                });
            });
        })

        it("List View StatusCode 200", () => {
            project.TaskController.listView(req, res);
            res.statusCode.should.be.equal(200);
        });

        it("List Data StatusCode 200 And Data Properties And Data Value Equal", (done) => {   
            res.on('end', ()=> {
                let resData = res._getData();
                let rowsData = resData.rows[0];
                
                res.statusCode.should.be.equal(200);
                
                rowsData.should
                    .be.instanceOf(Object)
                    .and.have.properties(['idx', 'parentIdx', 'title', 'content', 'status', 'startTime', 'finishTime']);
                rowsData.idx.should.be.equal(1);
                rowsData.title.should.be.equal("test");
                
                resData.page.should.be.instanceOf(Object);
                resData.page.should.be.equal(1);
                resData.total.should.be.instanceOf(Object);
                resData.total.should.be.equal(5);
                resData.records.should.be.instanceOf(Object);
                done();
            })

            project.TaskController.list(req, res);
        });

        it("Return Value - Page And Total Check", (done) => {
            res.on('end', ()=> {
                let resData = res._getData();
                
                resData.page.should.be.equal(2);
                resData.total.should.be.equal(3);
                resData.records.should.be.equal(1);
                done();
            })

            project.TaskController.list(httpMocks.createRequest({
                method: 'GET',
                query: {
                    page : 2,
                    rows : 20
                }
            }), res);
        });

        after(() => {
            sandbox.restore();
        });
    });

    describe("Task Read", () => {
        it("Read View StatusCode 200", () => {
            project.TaskController.readView(req, res);
            res.statusCode.should.be.equal(200);
        });
    });

    describe("Task Form", () => {
        it("Form View StatusCode 200", () => {
            project.TaskController.formView(req, res);
            res.statusCode.should.be.equal(200);
        });
    });
});