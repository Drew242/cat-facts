(function(){
  angular.module('app.twilio', [])
    .controller('app.twilio.controller', Twilio)

  Twilio.$inject = ['$http'];

  function Twilio($http) {
    console.log('Twilio Controller Loaded');

    var twilio = this;

    twilio.footerHeight = $('.dashboard-footer').height();
    console.log(twilio.footerHeight);

    twilio.payload = {
      // this will be the name and phone number for the SMS
      // name (ng-model)
      // phoneNumber (ng-model)
    }

    twilio.message = '';

    twilio.CatFact = {

      getCatFact: function($event) {
        $http.post('/getCatFact')
          .then(function(response) {
            twilio.payload.factOfTheDay = response;
            twilio.CatFact.sendCatFact($event);
          });
      },

      sendCatFact: function($event) {
        $http.post('/sendCatFact', twilio.payload)
          .then(twilio.CatFact.success, twilio.CatFact.error);
      },
      success: function(res) {
        console.log('Message sent Amigo', res);
        var name = twilio.payload.name;
        twilio.payload = {};
        twilio.message = `${name} should be receiving the message shortly ;)`
      },
      error: function(err) {
        console.log(err);
      }

    };

  }

})();
