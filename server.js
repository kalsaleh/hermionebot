var restify = require('restify');
var builder = require('botbuilder');

/** Use Hermione LUIS model for the root dialog. */
var model = 'https://api.projectoxford.ai/luis/v1/application?id=3e971f61-3f7f-4530-8c18-b101cf66c691&subscription-key=06b59642a973401097f347da3e7cd20f';

// Get secrets from server environment
var botConnectorOptions = {
    appId: process.env.BOTFRAMEWORK_APPID,
    appSecret: process.env.BOTFRAMEWORK_APPSECRET
};

// Create bot
var bot = new builder.BotConnectorBot(botConnectorOptions);
bot.add('/', function (session) {

    //respond with user's message
    session.send("Luis said " + session.message.text);
});

// Setup Restify Server
var server = restify.createServer();

// Handle Bot Framework messages
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var data = {
  'Array': {
    description: "An array is an ordered collection of objects. An array can contain several types of objects at once, such as integers, floats, strings, even other arrays or more complex objects.",
    snippit: "[0, 4, 3, 'apple', [], 4.5]",
    useCase: "An array is useful when you simply need to store a list of objects, without needing the added complexity of something like a hash."
  },
  'Hash': {
    description: "A hash is a collection of key-value pairs.",
    snippit: "{'a': 'apple', 'b': 'bear', 'c': ['camel', 'cabbage'], 'd': 42}",
    useCase: "A hash is useful when you have a set of data that you want to organize by categories. In that case, you can set the categories as keys, and the data falling into that category can be the value."
  },

  'Function': {
    description: "Is a set of statements that performs a task or calculates a value",
    snippit:"function myFunction(p1,p2) {return p1*p2};",
    //product of p1 and p2}
    useCase:"A function is executed when something invokes it",
  },

  'Operator': {
    	description: 'JavaScript has Operators that perform assignments, arithemtic, comparisons, and much more!',
    	snippet: 'voteable = (age < 18) ? "Too young":"Old enough";',
    	useCase: 'You would use an Operator to do something to your variables.'
  }
}
