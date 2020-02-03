const express = require('express');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')


const app = express();
const PORT = process.env.PORT || 8080

const routes = require('./routes/api');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/mern_youtube', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!')
})

// Data parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// HTTP request logger
app.use(morgan('tiny'))

// HTTP routes
app.use('/api', routes)


app.listen(PORT);

console.log('App is listening on port ' + PORT);