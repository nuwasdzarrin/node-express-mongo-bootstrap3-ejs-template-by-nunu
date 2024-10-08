require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const http = require('http');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
// const bodyParser   = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'app/views/layouts/main_layout.ejs'))
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());

app.use(session({ secret: 'mySecret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// mongoose.connect('mongodb://localhost/express_mongo_bt_db');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./app/configs/passport')(passport);
require('./app/routes/route')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//Insert first user
let User = require('./app/models/user');
User.findOne({username : "admin"}, function (err, user) {
	if (!user) {
		let newUser = new User();
		newUser.name = "nome";
		newUser.username = "admin";
		newUser.password = newUser.generateHash("123456");
		newUser.save(function (err) {
			if (err) {
				console.log(err)
			} else {
				console.log("Success create first user")
			}
		});
	}
});	


