const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Floors';
    conn.query(sql, (error, results) => {
    if (error){
      if(error.errno == 1054) {
        res.statusCode = 202; 
        res.send('No floors found');
        return;
      }
      res.statusCode = 500; //meter un status que tenga aqui
      res.send(error.sqlMessage);
      return;
    }
    if (results.length > 0) {
      res.json(results);
    }else{
      res.statusCode = 202;
      res.send('No floors found')
      return;
    }
    });
});

router.post('/add', (req, res) => {
    const sql = 'INSERT INTO Floors SET ?';
  
    const floorObj = {
      ID: req.body.id
    };
    // Aqui poner las verificaciones
    conn.query(sql, floorObj, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No floor found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Floor created!');
    });
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Floors WHERE ID = "${id}"`;
  
    conn.query(sql, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No floor found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Floor deleted!');
    });
});

module.exports = router;