const LocalStrategy = require('passport-local').Strategy;


module.exports = (passport) => {
    passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
        done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
    });

    passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
        done(null, user); // 여기의 user가 req.user가 됨
    });
    passport.use('login', new LocalStrategy({
        usernameField : 'id',
        passwordField : 'pw',
        //session: true,
        passReqToCallback : true 
    },
    function(req, id, password, done) { 
        console.log(req.body);
        console.log("faksdjf");
        return done(null, {"id":"test"});
        // User.findOne({ 'email' : email }, function(err, user) {
        //     if (err)
        //         return done(err);
        //     if (!user)
        //         return done(null, false, req.flash('loginMessage', '사용자를 찾을 수 없습니다.'));
        //     if (!user.validPassword(password))
        //         return done(null, false, req.flash('loginMessage', '비밀번호가 다릅니다.')); 
        //     return done(null, {id:"test"});
        // });
    }));
};