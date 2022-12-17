const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Habitaciones';

    conn.query(sql, (error, results) => {
    if (error){
      if(error.errno == 1054) {
        res.statusCode = 202; 
        res.send('No hab found');
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
    const sql = 'INSERT INTO Habitaciones SET ?';
  
    const habObj = {
      ID: req.body.id,
      Device: req.body.device
    };
    // Aqui poner las verificaciones
    
    conn.query(sql, habObj, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No hab found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Hab created!');
    });
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Habitaciones WHERE ID = "${id}"`;
  
    conn.query(sql, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No hab found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Hab deleted!');
    });
});

module.exports = router;