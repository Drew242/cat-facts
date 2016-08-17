// Twilio Credentials
var accountSid   = process.env.TWILIO_ACCOUNT_SID,
    authToken    = process.env.TWILIO_AUTH_TOKEN,
    twilioNumber = process.env.TWILIO_NUMBER;

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

client.messages.create({
        to: "+17192169290",
        from: twilioNumber,
        body: "Twilio works sometimes ",
}, function(err, message) {
 console.log(message.sid);
});
