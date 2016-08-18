(function(){
  angular.module('app.twilio', [])
    .controller('app.twilio.controller', Twilio)

  Twilio.$inject = ['$http'];

  function Twilio($http) {
    console.log('Twilio Controller Loaded');

    var twilio = this;

    twilio.payload = {
      // this will be the name and phone number for the SMS
      // name (ng-model)
      // phoneNumber (ng-model)
    }

    twilio.sendCatFact = {

      sendCatFact: function($event) {
        $http.post('/sendCatFact', twilio.payload)
          .then(twilio.sendCatFact.success, twilio.sendCatFact.error);
      },
      success: function(res) {
        console.log('Message sent Amigo', res);
      },
      error: function(err) {
        console.log(err);
      }

    };

  }

})();
