const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Topics';

    conn.query(sql, (error, results) => {
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
    if (results.length > 0) {
      res.json(results);
    }else{
      res.statusCode = 202;
      res.send('No topics found')
      return;
    }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Topics WHERE ID = "${id}"`;
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
        console.log(result)
      }else{
        res.statusCode = 202;
        res.send('No topics found')
        return;
      }
    });
  });

router.post('/add', (req, res) => {
    const sql = 'INSERT INTO Topics SET ?';
  
    const topicObj = {
      id: req.body.id
    };
    
    // Aqui poner las verificaciones
    
    conn.query(sql, topicObj, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No devices found');
            return;
          }
          if(error.errno == 1062){
            res.statusCode = 409;
            res.send('Topic duplicated')
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          console.log(error.sqlMessage)
          return;
        }
        res.send('Topic created!');
    });
  });


router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Topics WHERE ID = "${id}"`;
  
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
        res.send('Topic deleted!');
    });
});
  
module.exports = router; 