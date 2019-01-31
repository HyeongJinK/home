const express = require('express');
const router = express.Router();
const type = require("../board/Type");
const content = require("../board/Content")

router.get('/list', type.getList);

router.get('/content/list', content.list);

router.post('/content/form', content.save);

router.put('/content/form', content.update);

router.delete('/content/form', content.delete);

router.get("/content/read/:idx", content.get);     

module.exports = router