var connection = require('../dbconfig/db_config');
module.exports.verifycolor = function (req, res) {
    var color = req.body.color;
    //var shape = "cube";
    console.log(color);

    connection.query('SELECT * FROM tbl_colors WHERE color_name = ?', [color], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query, place: verify_color'
            })
        } else {

            if (results.length > 0) {
                    res.json({
                        status: true,
                        message: 'Color exist',
                        result: results[0].color_hex_code
                    })
            }
            else {
                res.json({
                    status: false,
                    message: "Color does not exits"
                });
            }
        }
    });
}