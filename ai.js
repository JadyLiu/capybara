const apiai = require('apiai'),
      uuid = require('uuid'),
      config = require('./config'),
      helper = require('./helper');

const apiAiService = apiai(config.API_AI_CLIENT_ACCESS_TOKEN);
const sessionIds = new Map();

function isDefined(obj) {
  if (typeof obj == 'undefined') {
      return false;
  }
  if (!obj) {
      return false;
  }
  return obj != null;
}

module.exports = {

  error: function(error) {
      return Promise.reject(new Error(error.message));
  },

/* { id: '83dc0c07-e234-4d79-a20e-72ce1c44b5b7',
  timestamp: '2017-03-06T10:10:09.338Z',
  lang: 'en',
  result:
   { source: 'agent',
     resolvedQuery: 'i want to buy beer as gift',
     action: 'buy-beer',
     actionIncomplete: false,
     parameters: {},
     contexts: [],
     metadata:
      { intentId: 'a378e4c2-0661-482d-853f-2a7262090009',
        webhookUsed: 'false',
        webhookForSlotFillingUsed: 'false',
        intentName: 'buy-beer' },
     fulfillment:
      { speech: 'Do you have preferable flavour of beer?',
        messages: [Object] },
     score: 1 },
  status: { code: 200, errorType: 'success' },
  sessionId: '13d08d80-0255-11e7-be5e-eb61904ff466' }
*/

  receiveMessage: function (message, channel_id, user_id, callback) {

    if (!sessionIds.has(user_id)) {
        sessionIds.set(user_id, uuid.v1());
    }

    var request = apiAiService.textRequest(message, {
      language: "en",
      requestSource: "slack",
      sessionId: sessionIds.get(user_id)
    });

    request.on('response', function(response) {

      if (isDefined(response.result)) {

      var responseText = response.result.fulfillment.speech,
          responseData = response.result.fulfillment.data,
          action = response.result.action;


      if (isDefined(responseData)) {
          try{
              callback(message);

          } catch (err) {
              console.log(err.message);
          }
      } else if (isDefined(responseText)) {
              callback(responseText, (err, resp) => {
              if (err) {
                  console.error(err);
              }
          });
        }
      }  
    });

    request.on('error', function(error) {
        console.log(error);
    });
    request.end();
  }

 }


