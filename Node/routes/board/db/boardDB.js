const sql_board = require('./sql/board').sql;
const sql_boardContent = require('./sql/boardContent').sql;
const sql_journal = require('./sql/journal').sql;
const template = require('../../db/template');



exports.BoardService = {
    findByAll: (data) => {
        return template.returnDataFunc(data, sql_board.findByAll, "findByAll");
    },
    findByIdx: (data) => {
        return template.returnOneDataFunc(data, sql_board.findByIdx, "findByIdx");
    },
    save: (data) => {
        return template.notReturnDataFunc(data, sql_board.save, "save");
    },
    update: (data) => {
        return template.notReturnDataFunc(data, sql_board.update, "update");
    },
    delete: (data) => {
        return template.notReturnDataFunc(data, sql_board.delete, "delete");
    }
}

exports.BoardContentService = {
    findByAll: (data) => {
        return template.returnDataFunc(data, sql_boardContent.findByAll, "findByAll");
    },
    findbyBoardIdx: (data) => {
        return template.returnDataFunc(data, sql_boardContent.findbyBoardIdx, "findbyBoardIdx");
    },
    findbyText: (data) => {
        return template.returnDataFunc(data, sql_boardContent.findbyText, "findbyText");
    },
    countByBoardIdx: (data) => {
        return template.returnOneDataFunc(data, sql_boardContent.countByBoardIdx, "countByBoardIdx");
    },
    findByIdx: (data) => {
        return template.returnOneDataFunc(data, sql_boardContent.findByIdx, "findByIdx");
    },
    save: (data) => {
        return template.notReturnDataFunc(data, sql_boardContent.save, "save");
    },
    update: (data) => {
        return template.notReturnDataFunc(data, sql_boardContent.update, "update");
    },
    delete: (data) => {
        return template.notReturnDataFunc(data, sql_boardContent.delete, "delete");
    }
}

exports.JournalService = {
    findByAll: (data) => {
        return template.returnDataFunc(data, sql_journal.findByAll, "findByAll");
    },
    findByIdx: (data) => {
        return template.returnOneDataFunc(data, sql_journal.findByIdx, "findByIdx");
    },
    save: (data) => {
        return template.notReturnDataFunc(data, sql_journal.save, "save");
    },
    update: (data) => {
        return template.notReturnDataFunc(data, sql_journal.update, "update");
    },
    delete: (data) => {
        return template.notReturnDataFunc(data, sql_journal.delete, "delete");
    }
}