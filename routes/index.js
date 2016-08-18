var Auth   = require('./auth')
var Twilio = require('./twilio')

module.exports = (app) => {
    app.get('/', (req,res) => {
        res.render('index.html')
    });

    app.get('/login', Auth.render)  // login page
    app.get('/logout', Auth.logout) // logout route + redirect

    app.post('/login', Auth.login);         // login form submission
    app.post('/register', Auth.register)    // register form submission

    app.all('/dashboard', Auth.middlewares.session);
    app.get('/dashboard', (req, res) => {
        res.render('dashboard.html', req.session);
    })

    app.post('/sendCatFact', Twilio.sendCatFact);
}
