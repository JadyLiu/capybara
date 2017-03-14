'use strict';

const apiai = require('apiai');
const config = require('./config');
const ai = require('./ai');
const helper = require('./helper');

const sessionIds = new Map();

// Messenger API parameters
if (!config.SLACK_TOKEN) {
	throw new Error('missing SLACK_TOKEN');
}
if (!config.API_AI_CLIENT_ACCESS_TOKEN) {
	throw new Error('missing API_AI_CLIENT_ACCESS_TOKEN');
}
if (!config.SERVER_URL) { //used for ink to static files
	throw new Error('missing SERVER_URL');
}

/**
 * Main Lambda function
 *
 */

exports.handler = function(event, context, callback) {

// function index(event, context, callback) {

/*  { token: 'mydumptoken',
team_id: 'T3U2UB9UH',
team_domain: 'bartenderbot',
service_id: '134153258386',
channel_id: 'C3ZD5JF6K',
channel_name: 'slack-api',
timestamp: '1488781372.000009',
user_id: 'U3UR2V3K6',
user_name: 'alex',
text: 'hi' }
*/

  let message = event.text,
      user_id = event.user_id,
      channel_id = event.channel_id;
  console.log(message,user_id,channel_id);
  // let message = 'i want to buy beer as gift',
  //     user_id= 'U2147483697',
  //     channel_id = 'C2147483705';

  ai.receiveMessage(message, channel_id, user_id, function(response){
    console.log(response);
    return response;
  });
    return 'test';
};

// index();
