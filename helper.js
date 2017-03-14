/**
 * Helper
 */
module.exports = {
/*{ token: 'mydumptoken',
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
  parseCommand: function(message) {
    message = this.removeSlackMessageFormatting(message);
    // var tokens = message.split(' ');
    // var command = {};
    // var cmd = tokens.shift();
    // var m = cmd.match(/(\w*)/);
    // if (m.length > 0) {
    //   command[m[1]] = tokens;
    // }
    // return command;
    return message;
  },
 
  removeSlackMessageFormatting: function(text) {
    // text = text.replace(/<([@#!])?([^>|]+)(?:\|([^>]+))?>/g, (function() {
    //   return function(m, type, link, label) {
    //     switch (type) {
    //       case '!':
    //         if (link === 'channel' || link === 'group' || link === 'everyone') {
    //           return "@" + link;
    //         }
    //         break;
    //       default:
    //         link = link.replace(/^mailto:/, '');
    //         if (label && link.indexOf(label) === -1) {
    //           return label + " (" + link + ")";
    //         }
    //         return link;
    //     }
    //   };
    // })(this));
    // text = text.replace(/&lt;/g, '<');
    // text = text.replace(/&gt;/g, '>');
    // text = text.replace(/&amp;/g, '&');
    return text;
  }
};