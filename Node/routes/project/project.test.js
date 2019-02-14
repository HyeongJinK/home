const app = require("../../app")
const expect = require("chai").expect;
const supertest =  require("supertest")

describe("프로젝트 Real", () => {
    describe("Task List", () => {
        it("statusCode 200 supertest", (done) => {
            supertest(app)
                .get('/project')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    done();
                });
        })
    });

    describe("Task List Data", () => {
        it("statusCode 200 And Data Equal", (done) => {
            supertest(app)
                .get('/project/list')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    expect(res.body).has.all.keys(['data'])
                    expect(res.body.data).has.all.keys(['0'])
                    expect(res.body.data[0]).has.all.keys(['idx', 'parentIdx', 'title', 'content', 'status', 'startTime', 'finishTime'])
                    expect(res.body.data[0].idx).to.equal(1)
                    done();
                });
        });
    });
});