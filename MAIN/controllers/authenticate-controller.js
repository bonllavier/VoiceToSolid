var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('../dbconfig/db_config');
module.exports.authenticate = function (req, res) {
    var username = req.body.name;
    var password = req.body.password;

    connection.query('SELECT * FROM tbl_users WHERE user_name = ?', [username], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {

            if (results.length > 0) {
                decryptedString = cryptr.decrypt(results[0].password);
                if (password == decryptedString) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/home');
                    //res.json({
                    //    status: true,
                    //    message: 'successfully authenticated'
                    //})
                } else {
                    res.json({
                        status: false,
                        message: "Username and password does not match"
                    });
                }

            }
            else {
                res.json({
                    status: false,
                    message: "Username does not exits"
                });
            }
        }
    });
}
