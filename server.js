const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "database_todolist"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("DataBase Terhubung");
});


//TODO
app.get('/', (req, res) => {
    res.send(`
    <html>
        <body>
            <form action="/todo" method="post">
                <input name="deskripsi" />
                <button>Add</button>
            </form>
        </body>
    </html>`)
})

app.post('/todo', (req, res) => {
    let deskripsi = req.body.deskripsi
    connection.query('INSERT INTO tbl_deskripsi (deskripsi) VALUES(?)', [deskripsi], function (error, rows, fileds) {
        if (error) {
            console.log(error);
        } else {
            console.log("berhasil menambahkan data")
        }
        res.end()
    });
})

app.delete('/todo/:id', (req, res) => {
    let id = req.params.id
    connection.query('DELETE FROM tbl_deskripsi WHERE id=?', [id], function (error, rows, fileds) {
        if (error) {
            console.log(error);
        } else {
            console.log("berhasil menghapus data data")
        }
        res.end()
    });
})

app.get('/todo', (req, res) => {
    connection.query('SELECT * FROM tbl_deskripsi', function (error, rows, fileds) {
        if (error) {
            console.log(error);
        } else {
            res.json(rows)
        }
        res.end()
    });
})

// USER

app.get('/user', (req, res) => {
    connection.query('SELECT * FROM tbl_user', function (error, rows, fileds) {
        if (error) {
            console.log(error);
        } else {
            res.json(rows)
        }
        res.end()
    });
})

app.post('/user', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    connection.query('INSERT INTO tbl_user (username,password) VALUES(?,?)', [username,password], function (error, rows, fileds) {
        if (error) {
            console.log(error);
        } else {
            console.log("berhasil menambahkan data")
        }
        res.end()
    });
})


app.listen(3031, function () {
    console.log("Server Berjalan...")
})