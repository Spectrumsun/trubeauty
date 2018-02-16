import passport from 'passport';

class Auth {
    static passport () {
        passport.authenticate('local', {
            failureRedirect: '/login',
            failurFlash: 'Failed Login',
            successRedirect: '/',
            successFlash: 'You are now loggged in!'
        })
    }
}


export default Auth;