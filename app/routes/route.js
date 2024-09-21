var User = require('../models/user');
var path = require('path');

module.exports = function(app, passport){
	app.get("/", isLoggedIn, function(req, res){
		res.render('homepage');
	});
	
	app.get("/login", function(req, res){ 
		res.render('auths/login', {layout: './layouts/auth_layout.ejs'}); 
	});
	
	app.post("/login/process", passport.authenticate('login', {
        successRedirect : '/', 
        failureRedirect : '/login'
    }));
	
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	app.get('/add_user', isLoggedIn, function(req, res) {
		res.render('users/add_user');
	});
	
	app.post('/add_user_process', isLoggedIn, function(req, res) {
		var newUser = new User();
		newUser.name = req.body.name;
		newUser.username = req.body.username;
		newUser.password = newUser.generateHash(req.body.password);
		newUser.save(newUser);
		
		res.redirect('/list_user');
	});  
	
	app.get('/list_user', isLoggedIn, async function(req, res) {
		try {
			const users = await User.find({}).sort({'name': -1});
			res.render( 'users/list_user', {users : users});	
		} catch (error) {
			console.log(error);
		}
	}); 
};

function isLoggedIn(req, res, next) {
    var userTemp = req.user;
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
       return next();   
    }else{
        // if they aren't redirect them to the home page
        res.redirect('/login');
    }
}
