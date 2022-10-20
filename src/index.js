const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./Config/DatabaseConfig');


app.set('port', process.env.port || 3000)

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes


app.listen(3000, () =>{
    console.log(`Server on port ${app.get('port')}`)
});