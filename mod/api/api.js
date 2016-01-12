'use strict'

var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true
}));
app.use(bodyParser.json({limit: '5mb'}));

var router = express.Router();
app.use('/', router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.set('port', 3000);

// Start the server
var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});

module.exports = function(options, imports, register) {
	register(null, {
		api: {
			on: function(options) {
				switch(options.method) {
					case 'GET':
						router.get(options.path, options.handler);
						break;
					case 'POST':
						router.post(options.path, options.handler);
						break;
					default:
						router.get(options.path, options.handler);
				}
			}
		}
	});
};