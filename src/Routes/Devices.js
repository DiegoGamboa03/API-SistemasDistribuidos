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
    }else{
      res.statusCode = 202;
      res.send('No devices found')
      return;
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
        res.json(result[0]);
        console.log(result)
      }else{
        res.statusCode = 202;
        res.send('No devices found')
        return;
      }
    });
  });

router.post('/add', (req, res) => {
    const sql = 'INSERT INTO Devices SET ?';
  
    const deviceObj = {
      ID: req.body.id,
      Type: req.body.type,
      Status: req.body.status,
      Room: req.body.room
    };
    
    // Aqui poner las verificaciones
    
    conn.query(sql, deviceObj, error => {
        if (error){
            if(error.errno == 1054) {
              res.statusCode = 202; 
              res.send('No devices found');
              return;
            }
            if(error.errno == 1062){
              res.statusCode = 409;
              res.send('Device duplicated')
            }
            res.statusCode = 500; //meter un status que tenga aqui
            res.send(error.sqlMessage);
            return;
        }
        res.send('Device created!');
    });
  });

//Actualizar status (on/off)
router.put('/updateStatus/:id', (req, res) => {
    const { id } = req.params;
    const Status = req.body.status;
      const sql = 'UPDATE Devices SET '  +
      `Status='${Status}'` +
      `WHERE ID='${id}'`;
      console.log(sql);
  
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

//Actualizar value (on/off)
router.put('/updateValue/:id', (req, res) => {
  const { id } = req.params;
  const Value = req.body.value;
    const sql = 'UPDATE Devices SET '  +
    `Value='${Value}'` +
    `WHERE ID='${id}'`;
    console.log(sql);

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