const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Subscribers';

    conn.query(sql, (error, results) => {
    if (error){
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.statusCode = 202; 
      res.send('No subscribers found');
      return;
    }
    });
});

router.get('/:device/:topic', (req, res) => {
    const { device, topic } = req.params;
    const sql = `SELECT * FROM Subscribers WHERE Device = ${device} AND Topic = ${topic}`;
    conn.query(sql, (error, result) => {
        if (error){
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
      if (result.length > 0) {
        res.json(result);
      } else {
        res.statusCode = 202; 
        res.send('No subscriber found');
        return;
      }
    });
  });

router.post('/add', (req, res) => {
    const sql = 'INSERT INTO Subscribers SET ?';
  
    const SubscriberObj = {
      device: req.body.Device,
      topic: req.body.Topic
    };
    
    // Aqui poner las verificaciones
    
    conn.query(sql, SubscriberObj, error => {
        if (error){
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Subscriber created!');
    });
  });


router.delete('/delete/:device/:topic', (req, res) => {
    const { device, topic } = req.params;
    const sql = `DELETE FROM Subscribers WHERE Device = ${device} AND Topic = ${topic}`;
  
    conn.query(sql, error => {
        if (error){
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Subscriber deleted!');
    });
});
  
module.exports = router;