const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function intializePassport(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null)
            return done(null, false, { message: 'No user with that email' })
        try {
            const bool = await bcrypt.compare(password, user.password);
            if (bool) {
                return done(null, user)
            }
            else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deserializeUser((id, done) => {
        done(null, getUserById(id))
    })
}

module.exports = intializePassport