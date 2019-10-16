var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'web_storage',
    password: '1234',
    database: 'voicetosolid'
});
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});
module.exports = connection;