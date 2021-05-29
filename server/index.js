const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const cors = require('cors')

dotenv.config()
app.use(cors())
app.use(express.json())


const db = 'mongodb+srv://admin:pass@cluster0.nrfor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//connect to DB 
mongoose.connect(db,{ useUnifiedTopology : true, useNewUrlParser: true},
() =>  console.log('connected'))

//Middleware

//route middlewares
app.use('/api/', authRoute);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`server is running on ${PORT}`))
