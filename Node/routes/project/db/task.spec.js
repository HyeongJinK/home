const task = require("./task");
const sinon = require("sinon")

sinon.stub(task, 'findByAll').returns((err, rows) => {
    
});