const User = require('../models/user');

module.exports = {
    async loadIndexUserPage(req, res) {
        try {
			const users = await User.find({}).sort({'name': -1});
			res.render( 'users/list_user', {users : users});	
		} catch (error) {
			console.log(error);
            res.send(500);
		}
    },

    loadAddUserPage(req, res) {
        res.render('users/add_user');
    },

    storeUser(req, res) {
        try {
            let newUser = new User();
            newUser.name = req.body.name;
            newUser.username = req.body.username;
            newUser.password = newUser.generateHash(req.body.password);
            newUser.save(newUser);

            res.redirect('/list_user');
        } catch (error) {
            console.log(error);
            res.send(500);
        }
	}
}