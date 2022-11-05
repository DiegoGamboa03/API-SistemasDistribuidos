const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Publishers';

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

router.get('/:id/:topic', (req, res) => {
    const { id, topic } = req.params;
    const sql = `SELECT * FROM Publishers WHERE ID = ${id} AND Topic = ${topic}`;
    conn.query(sql, (error, result) => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No devices found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
      if (result.length > 0) {
        res.json(result);
      } 
    });
  });

router.post('/add', (req, res) => {
    const sql = 'INSERT INTO Publishers SET ?';
  
    const PublisherObj = {
      id: req.body.ID,
      topic: req.body.Topic
    };
    
    // Aqui poner las verificaciones
    
    conn.query(sql, PublisherObj, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No devices found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Publisher created!');
    });
  });


router.delete('/delete/:id/:topic', (req, res) => {
    const { id, topic } = req.params;
    const sql = `DELETE FROM Publishers WHERE ID = ${id} AND Topic = ${topic}`;
  
    conn.query(sql, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No devices found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Delete publisher');
    });
});
  
module.exports = router;