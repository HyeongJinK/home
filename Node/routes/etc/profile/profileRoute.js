const express = require('express');
const router = express.Router();
const profile = require("./profile");

console.info("Profile Route...");

router.get("/", profile.view);

module.exports = router;