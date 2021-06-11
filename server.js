const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.listen(3031, function () {
    console.log("aman lur")
})