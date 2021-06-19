const express = require('express');
const connection = require('../database/connection');
const auth = require('../middleware/auth');

const router = express.Router()

router.get('', auth, (req, res) => {
    connection.query('SELECT * FROM tbl_user', (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})

router.post('/', (req, res) => {
    connection.query('SELECT COUNT(*) as jumlah_user FROM tbl_user', (err, results, fields) => {
        if (results.jumlah_user > 0) {
            auth(req, res, next)
        } else {
            next()
        }
    })
}, (req, res) => {
    const sql = 'INSERT INTO tbl_user (id,username,password) VALUES(?,?,?)'
    const values = [null, req.body.username, req.body.password]
    connection.query(sql, values, (err, results, fields) => {
        if (err) {
            res.end(500)
            return
        }
        res.json({ values })
    })
})
router.delete('/:id', auth, (req, res) => {
    const values = [req.params.id]

    connection.query('SELECT COUNT(*) as jumlah_user FROM tbl_user', (err, results, fields) => {
        if (results.jumlah_user > 1) {
            const sql = 'DELETE FROM tbl_deskripsi WHERE tbl_user id = ?'
            connection.query(sql, values, (err, results, fields) => {
                if (err) throw err
                res.json(results)
            })
        } else {
            console.log("Tidak Bisa Di hapus")
            res.send(404);
        }
    })
})

module.exports = router