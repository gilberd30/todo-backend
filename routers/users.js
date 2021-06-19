const express = require('express');
const connection = require('../database/connection');
const auth = require('../middleware/auth');

const router = express.Router()

router.get('',auth, (req, res) => {
    connection.query('SELECT * FROM tbl_user', (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})

router.post('/', (req, res) => {
    const sql = 'INSERT INTO tbl_user (id,username,password) VALUES(?,?,?)'
    const values = [null,req.body.username,req.body.password]
    connection.query(sql, values, (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})

router.delete('/:id', auth, (req, res) => {
    const sql = 'DELETE FROM tbl_deskripsi WHERE tbl_user id = ?'
    const values = [req.params.id]
    connection.query(sql, values, (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})

module.exports = router