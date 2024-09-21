module.exports = {
    loadLoginPage(req, res) {
        res.render('auths/login', {layout: './layouts/auth_layout.ejs'});
    },

    logoutAuth(req, res) {
        req.logout();
		res.redirect('/');
    }
}