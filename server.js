require('colors');

var express    = require('express'),
    bodyParser = require('body-parser'),
    path       = require('path'),
    logger     = require('morgan'),
    ejs        = require('ejs'),
    mongoose   = require('mongoose'),
    sessions   = require('client-sessions'), // encrypted cookies!
    port       = process.env.PORT || 1337,
    Routes     = require('./routes'),
    app        = express(),
    twilio     = require('twilio'),
    client     = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var testing = client.sendMessage({
  to: '+17192169290',
  from: process.env.TWILIO_NUMBER,
  body: 'Hello from yo app'
}, (err,result)=>{
  console.log(err,result)
});

 // var testing = client.messages.create({
 //    body: 'It is working',
 //    to: '+17192169290',
 //    from: process.env.TWILIO_NUMBER
 //    // mediaUrl: 'http://www.yourserver.com/someimage.png'
 //  }, function(err, data) {
 //    if (err) {
 //      console.error('Could not notify administrator');
 //      console.error(err);
 //    } else {
 //      console.log('Administrator notified');
 //    }
 //  });

console.log(testing);

app.use(logger('dev'));
app.use(sessions({
    cookieName: '_mean-auth', // front-end cookie name
    secret: 'K1TTEN$', // the encryption password : keep this safe
    requestKey: 'session', // req.session,
    duration: 86400, // 60 * 60 * 24 (number of seconds in a day), tells the middleware when the cookie/session should expire,
    cookie: {
        ephemeral: false,   // when true, cookie expires when browser is closed
        httpOnly: true,     // when true, the cookie is not accesible via front-end JavaScript
        secure: false       // when true, cookie will only be read when sent over HTTPS
    }
}));

app.use(express.static(path.join(__dirname,'public')));
app.post('*', bodyParser.json(), bodyParser.urlencoded({ extended: true }));

app.set('view engine','html'); // allows us to specify the default extension for the files in the views folder
app.engine('html', ejs.renderFile); // this is the function that binds to res.render

mongoose.connect('mongodb://localhost/cat-facts', (mongooseErr) => {
    if( mongooseErr ) {
        console.error('#ERROR#'.red,'Could not initialize mongoose!', mongooseErr);
    } else {
        console.info('Mongoose initialized!'.green.bold);
    }
});

Routes(app);

app.listen(port, (err) => {
    if( err ) {
        console.error('#ERROR#'.red,'Could not start server! :(');
    } else {
        console.log('\nMEAN Auth Server UP!'.green.bold, 'PORT:'.yellow, port);
    }
})
