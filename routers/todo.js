const express = require('express');
const connection = require('../database/connection')

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
    connection.query('SELECT * FROM tbl_deskripsi', (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})

router.post('/', (req, res) => {
    const sql = 'INSERT INTO tbl_deskripsi (deskripsi) VALUES(?)'
    const values = [req.body.deskripsi]
    connection.query(sql, values, (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})

router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM tbl_deskripsi WHERE id = ?'
    const values = [req.params.id]
    connection.query(sql, values, (err, results, fields) => {
        if (err) throw err
        res.json(results)
    })
})

module.exports = router