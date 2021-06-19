const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const auth = require('./middleware/auth')
const todoRoutes = require('./routers/todo')
const userRoutes = require('./routers/users')


app.use('/todo', auth, todoRoutes) 
app.use('/user',  userRoutes)

app.listen(3031, function () {
    console.log("Server Berjalan...")
})