const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')


dotenv.config()



//connect to DB 
mongoose.connect(process.env.DB_CONNECT,
 { useNewUrlParser: true },
() =>  console.log('db connected'))

//Middleware
app.use(express.json())



//route middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('server is running on 3000'))
