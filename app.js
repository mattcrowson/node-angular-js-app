var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var config         = require('./app/config/config.json')[app.get('env')];
var cookieParser   = require('cookie-parser');
var expressSession = require('express-session');
var mongoose       = require('mongoose');
var morgan         = require('morgan');
var passport       = require('passport');

// defaults to pool size of 5
mongoose.connect(config.dbURL);

mongoose.set('debug', config.debug);

require('./app/config/passport')(passport);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
//app.use(cookieParser);
//app.use(expressSession({secret: config.sessionToken}));
app.use(bodyParser());

require('./app/routes')(app, passport);

// Start the server
app.listen(config.port);

console.log(config.title + ' on port ' + config.port);
