const mysql = require('../database/connection')

module.exports = function (req, res, next) {
    const username = req.header.username
    const password = req.header.password

    const sql = '"SELECT * FROM tbl_user WHERE username=? AND password=?"'
    const values = [username, password]

    mysql.query(sql, values, (err, results, fields) => {
        if (!err) {
            next()
        } else {
            res.send(401);
        }
    })


}

