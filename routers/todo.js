const express = require('express');
const mysql = require('../database/connection')

const router = express.Router()

// router.get('/', (req, res) => {
//     res.send(`
//     <html>
//         <body>
//             <form action="/todo" method="post">
//                 <input name="deskripsi" />
//                 <button>Add</button>
//             </form>
//         </body>
//     </html>`)
// })

router.get('/', (req, res) => {
    mysql.query('SELECT * FROM tbl_deskripsi', (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})

router.post('/', (req, res) => {
    const sql = 'INSERT INTO tbl_deskripsi (deskripsi) VALUES(?)'
    const values = [req.body.deskripsi]
    mysql.query(sql, values, (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})

router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM tbl_deskripsi WHERE id = ?'
    const values = [req.params.id]
    mysql.query(sql, values, (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})

module.exports = router