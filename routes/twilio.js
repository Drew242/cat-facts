//require the Twilio module and create a REST client
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = {

  sendCatFact: (req, res) => {
    // console.log(req.body); great for debugging payload
    // console.log(res.body);
    client.messages.create({
      to: req.body.phoneNumber,
      from: process.env.TWILIO_NUMBER,
      body: `Well hey ${req.body.name}, Welcome to Cat Facts!\nYour cat fact of the day:\n${req.body.factOfTheDay.data}\n Me-Woooow!`,
    }, function(err, message) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(message);
      }
    });
  }

}
