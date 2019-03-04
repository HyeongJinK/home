const connect = require('./connect');
const should = require("should");


describe("DB Connect", function() {
    describe("DB Open", function() {
        it("DB Create And Close And Param Check", function() {
            connect.dbOpen({path: connect.config.db.board, testParam: {a:1, b:3}})
                .then(connect.dbClose)    
                .then((result) => {
                    result.db.filename.should.be.equal("db/board.db");
                    result.testParam.a.should.be.equal(1);
                    result.testParam.b.should.be.equal(3);
                });
        });
    });
});