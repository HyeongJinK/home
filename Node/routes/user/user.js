const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('login', {
    successRedirect : '/packko'
    , failureRedirect : '/error'
    //, failureFlash: true
}));

module.exports = router;