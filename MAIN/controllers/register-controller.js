var Cryptr = require('cryptr');
var express = require("express");
var connection = require('../dbconfig/db_config');
cryptr = new Cryptr('myTotalySecretKey');

module.exports.register = function (req, res) {
    var encryptedString = cryptr.encrypt(req.body.password);
    var users = {
        "user_name": req.body.name,
        "email": req.body.email,
        "password": encryptedString
    }
    connection.query('INSERT INTO tbl_users SET ?', users, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'user registered sucessfully'
            })
        }
    });
}
