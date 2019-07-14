var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDK9n3wDhr9s3dvYcL0BADpnggdl51cPfs",
    authDomain: "albumz-250898.firebaseapp.com",
    databaseURL: "https://albumz-250898.firebaseio.com",
    projectId: "albumz-250898",
    storageBucket: "albumz-250898.appspot.com",
    messagingSenderId: "726276432069"
};
firebase.initializeApp(config);

//Route files
var routes = require('./routes/index');
var albums = require('./routes/albums');
var genres = require('./routes/genres');
var users = require('./routes/users');

var app = express();

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());


// Express Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

//connect flash
app.use(flash());

// Global Variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', routes);
app.use('/albums', albums);
app.use('/genres', genres);
app.use('/users', users);


app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
