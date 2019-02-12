const app = require("../../app")
const expect = require("chai").expect;
//const request = require("request");
const supertest =  require("supertest")

describe("프로젝트 Real", () => {
    describe("Task List", () => {
        // it("statusCode 200", (done) => {
        //     request("http://localhost/project", (error, res, body) => {
        //         expect(res.statusCode).to.equal(200);
        //         done();
        //     });
        // });

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
});