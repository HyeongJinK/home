const board = require("./board");
const boardDB = require("./db/boardDB");
const httpMocks = require("node-mocks-http");
const should = require("should");
const sinon = require("sinon");


describe("Board Mock Test", () => {
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
    });

    describe("Board", () => {
        it("List View StatusCode 200", () => {
            board.BoardController.listView(req, res);
            res.statusCode.should.be.equal(200);
            res._getRenderView().should.be.equal("board/board/list");            
            res._getRenderData().menu[0].should.be.equal("게시판");
            res._getRenderData().menu[1].should.be.equal("게시판 목록");
        });

        it("Form View StatusCode 200", () => {
            board.BoardController.formView(req, res);
            res.statusCode.should.be.equal(200);
            res._getRenderView().should.be.equal("board/board/form");            
            res._getRenderData().menu[0].should.be.equal("게시판");
            res._getRenderData().menu[1].should.be.equal("게시판 편집");
        });

        it("List StatusCode 200", () => {
            board.BoardController.list(req, res);
            res.statusCode.should.be.equal(200);
        });

        it("Edit StatusCode 200", () => {
            board.BoardController.edit(req, res);
            res.statusCode.should.be.equal(200);
        })
    });

    describe("BoardContent", () => {
        let sandbox;
    
        before(() => {
            sandbox = sinon.createSandbox();

            sandbox.stub(boardDB.BoardContentService, 'findByIdx').callsFake(function (data) {
                return new Promise((resolve, reject) => {
                    if (data["findByIdxParam"] === 1) {
                        data["tasks"] = { idx: 1,
                            boardIdx: 0,
                            title: 'test',
                            content: 'test',
                            createDate: '2019-01-01',
                            modiftDate: '2019-12-12',
                            hidden: 1 }
                        
                    } else {
                        data["tasks"] = {};
                    }
                    resolve(data);
                });
            });
        });

        it("List View StatusCode 200", () => {
            board.BoardContentController.listView(req, res);
            res.statusCode.should.be.equal(200);
        });

        it("Form View StatusCode 200", () => {
            board.BoardContentController.formView(req, res);
            res.statusCode.should.be.equal(200);
        });

        it("Read View Param Null StatusCode 200", (done) => {
            res.on('end', () => {
                res._getRenderView().should.be.equal("board/content/list");
                res._getRenderData().errorMessage.should.be.equal("잘못된 호출입니다.");
                res._getRenderData().menu[0].should.be.equal("게시판")
                res._getRenderData().menu[1].should.be.equal("내용")
                done();
            });

            board.BoardContentController.readView(req, res);
        });
    });
});