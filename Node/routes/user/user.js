/**
CREATE TABLE `users` (
	`idx`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`email`	TEXT NOT NULL UNIQUE,
	`password`	TEXT NOT NULL,
	`nickname`	TEXT NOT NULL,
	`createDate`	TEXT
);
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');

console.log("User Route...")

router.route("/login")
.get((req, res, next) => {
	res.render('user/login', { menu: ['유저', '로그인'] });
}).post(passport.authenticate('login', {
    successRedirect : '/'
    , failureRedirect : '/user/login'
    //, failureFlash: true
}));

router.post('/logout', passport.authenticate('logout', {
	successRedirect : '/'
	, failureRedirect : '/'
}));

module.exports = router;