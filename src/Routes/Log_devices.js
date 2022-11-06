const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Log_devices';

    conn.query(sql, (error, results) => {
    if (error){
      if(error.errno == 1054) {
        res.statusCode = 202; 
        res.send('No devices found');
        return;
      }
      res.statusCode = 500; //meter un status que tenga aqui
      res.send(error.sqlMessage);
      return;
    }
    if (results.length > 0) {
      res.json(results);
    }
    });
});

router.post('/add', (req, res) => {
    const sql = 'INSERT INTO Log_devices SET ?';
  
    const LogObj = {
      Device: req.body.ID,
      Action_done: req.body.Action_done,
      Topic: req.body.Topic,
      Date_time: req.body.Date_time,
    };
    
    // Aqui poner las verificaciones
    
    conn.query(sql, LogObj, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No entry found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Entry Log created!');
    });
});

router.delete('/delete/:device/:action_done/:date_time', (req, res) => {
    const { device, action_done, date_time } = req.params;
    const sql = `DELETE FROM Log_devices WHERE Device = "${device}" AND Action_done = "${action_done}" 
                AND Date_time = "${date_time}"`;
  
    conn.query(sql, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No entry found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Delete entry log');
    });
});

module.exports = router;