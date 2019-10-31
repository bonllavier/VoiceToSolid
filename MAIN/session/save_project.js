let connection = require('../dbconfig/db_config');
const request = require('request')

module.exports.saveproject = function (req, res) {
    let user_name = req.body.user_name;
    let project_name = req.body.project_name;
    let arrayobjs = req.body.array_objs;
    let user_id = req.body.user_id; 
    let project_id;
    let cont = 0;

	console.log(arrayobjs);
	console.log("size array: " + arrayobjs.length);
    //QUERY TO GET THE PROJECT ID
    let values = [
        [project_name, user_id]
    ];
    connection.query('INSERT INTO tbl_projects (project_name, user_id) VALUES ?', [values], function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            project_id = results.insertId;
            console.log("Saved project, id: " + project_id);
			
			// SAVING THE ARRAY OF OBJECTS one by one.
			    for (cont = 0; cont < arrayobjs.length; cont++) {
				let piece_name = arrayobjs[cont][0];
				let colorId = arrayobjs[cont][2];
				let shapeId = arrayobjs[cont][3];
				let values2 = [
					[piece_name, colorId, shapeId, project_id]
				];
				connection.query('INSERT INTO tbl_pieces (piece_name, color_id, shape_id, project_id) VALUES ?', [values2], function (error, results, fields) {
					if (error) {
						console.log(error);
					}
					else {
						console.log("Save objs" + cont);
					}
				});
			}
        }
    });
}