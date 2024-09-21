module.exports = {
    isLoggedIn(req, res, next) {
        // let userTemp = req.user;
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()){
           return next();   
        }else{
            // if they aren't redirect them to the home page
            res.redirect('/login');
        }
    }
}