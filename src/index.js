const express = require('express');
const app = express();
const morgan = require('morgan');


app.set('port', process.env.port || 3000)

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/devices', require('./Routes/Devices'));
app.use('/publishers', require('./Routes/Publishers'));
app.use('/subscribers', require('./Routes/Subscribers'));
app.use('/topics', require('./Routes/Topics'));
app.use('/log_devices', require('./Routes/Log_devices'));
app.use('/users', require('./Routes/Users'));
app.use('/rooms', require('./Routes/Rooms'));
app.use('/rules', require('./Routes/Rules'));
app.use('/utils', require('./Routes/Utils'));
app.use('/device_rules', require('./Routes/Device_rules'));
app.use('/floors', require('./Routes/Floors'));

app.listen(3000, () =>{
    console.log(`Server on port ${app.get('port')}`)
});