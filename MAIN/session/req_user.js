let connection = require('../dbconfig/db_config');
module.exports.requser = function (req, res) {
    let user_name = req.body.user_name;

    connection.query('SELECT * FROM tbl_users WHERE user_name = ?', [user_name], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query, place: where user_name'
            })
        } else {

            if (results.length > 0) {
                res.json({
                    status: true,
                    message: 'User exist',
                    user_id: results[0].user_id
                })
            }
            else {
                res.json({
                    status: false,
                    message: "User does not exits"
                });
            }
        }
    });
}