const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Rooms';

    conn.query(sql, (error, results) => {
    if (error){
      if(error.errno == 1054) {
        res.statusCode = 202; 
        res.send('No room found');
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
    const sql = 'INSERT INTO Rooms SET ?';
  
    const habObj = {
      ID: req.body.id
    };
    // Aqui poner las verificaciones
    
    conn.query(sql, habObj, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No room found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Room created!');
    });
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Rooms WHERE ID = "${id}"`;
  
    conn.query(sql, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No room found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Room deleted!');
    });
});

module.exports = router;