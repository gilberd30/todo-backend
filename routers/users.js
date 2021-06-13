const express = require('express');
const mysql = require('../database/connection')
const app = express();

const router = express.Router()


router.get('', (req, res) => {
    mysql.query('SELECT * FROM tbl_user', (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})

router.post('/', (req, res) => {
    const sql = 'INSERT INTO tbl_user (id,username,password) VALUES(?,?,?)'
    const values = [null,req.body.username,req.body.password]
    mysql.query(sql, values, (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})

router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM tbl_deskripsi WHERE tbl_user id = ?'
    const values = [req.params.id]
    mysql.query(sql, values, (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})



module.exports = router