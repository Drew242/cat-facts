var request = require('request');

module.exports = {

  getCatFact: (req, res) => {
    request.get('http://catfacts-api.appspot.com/api/facts?number=1',
    function(err, response, body) {
      if (!err && response.statusCode == 200) {
        var response = JSON.parse(body).facts[0];
        console.log(response);
        res.send(response);
      }
    });

  }

}
