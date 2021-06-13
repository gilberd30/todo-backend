const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const todoRoutes = require('./routers/todo')
const userRoutes = require('./routers/users')

app.use('/',todoRoutes) 
app.use('/user',userRoutes)

app.listen(3031, function () {
    console.log("Server Berjalan...")
})