let connection = require('../dbconfig/db_config');
const request = require('request')

module.exports.saveproject = function (req, res) {
    let user_name = req.body.user_name;
    let project_name = req.body.project_name;
    let arrayobjs = req.body.arrayobjs;
    let user_id = req.body.user_id; 
    let project_id;
    let cont = 0;

    //POST TO GET THE USER_ID
    //request.post('htttp://localhost:3000/session/req_user', {
    //    json: {
    //        user_name: user_name
    //    }
    //}, (error, res, body) => {
    //        if (error) {
    //            console.error(error)
    //        }
    //        else {
    //            user_id = body.user_id;
    //            console.log(user_id);
    //        }
    //    console.log(body)
    //})


    
    //QUERY TO GET THE PROJECT ID
    var values = [
        [project_name, user_id]
    ];
    connection.query('INSERT INTO tbl_projects (project_name, user_id) VALUES ?', [values], function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            project_id = results.insertId;
            console.log("saved project, id: " + project_id);
        }
    });


    //for (cont = 0; cont < arrayobjs.length; cont++) {
    //    let piece_name = arrayobjs[cont][1] + arrayobjs[cont][0];
    //    let colorId = arrayobjs[cont][2];
    //    let shapeId = arrayobjs[cont][3];
    //    connection.query('INSERT INTO tbl_pieces (piece_name, color_id, shape_id, project_id) VALUES ?', [piece_name, colorId, shapeId, project_id], function (error, results, fields) {
    //        if (error) {
    //            console.log(error);
    //        }
    //        else {
    //            console.log("Save objs" + cont);
    //        }
    //    });
    //}
    

}