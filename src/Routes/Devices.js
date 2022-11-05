const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Devices';

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
    }else if (results.length > 0) {
      res.json(results);
    } 
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Devices WHERE ID = ${id}`;
    conn.query(sql, (error, result) => {
      if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No devices found');
            return;
          }
          res.statusCode = 500; //meter un status que tenga aqui
          res.send(error.sqlMessage);
          return;
      }else if (result.length > 0) {
        res.json(result);
      }
    });
  });

router.post('/add', (req, res) => {
    const sql = 'INSERT INTO Devices SET ?';
  
    const deviceObj = {
      id: req.body.ID,
      type: req.body.Type
    };
    
    // Aqui poner las verificaciones
    
    conn.query(sql, deviceObj, error => {
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
        res.send('Device created!');
    });
  });

  
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {Type} = req.body;
      const sql = 'UPDATE Devices SET '  +
      `Type='${Type}',` + 
      `WHERE ID='${id}'`;
  
    conn.query(sql, error => {
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
        res.send('Device updated!');
    });
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Devices WHERE ID = ${id}`;
  
    conn.query(sql, error => {
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
        res.send('Delete device');
    });
});
  
module.exports = router;