const AuthController = require('../controllers/auth_controller');
const HomeController = require('../controllers/home_controller');
const UserController = require('../controllers/user_controller');
const AuthMiddleware = require('../middlewares/auth_middleware');

module.exports = function(app, passport){
	app.get("/", AuthMiddleware.isLoggedIn, HomeController.loadHomePage);

	app.get("/login", AuthController.loadLoginPage);
	app.post("/login/process", passport.authenticate('login', {
		successRedirect : '/', 
		failureRedirect : '/login'
	}));
	app.get('/logout', AuthController.logoutAuth);
	
	app.get('/add_user', AuthMiddleware.isLoggedIn, UserController.loadAddUserPage);
	app.post('/add_user_process', AuthMiddleware.isLoggedIn, UserController.storeUser);
	app.get('/list_user', AuthMiddleware.isLoggedIn, UserController.loadIndexUserPage); 
};
