const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Devices';

    conn.query(sql, (error, results) => {
    if (error){
      res.send(error.sqlMessage);
      return;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(204).send("No devices");
    }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Devices WHERE ID = ${id}`;
    conn.query(sql, (error, result) => {
        if (error){
            res.send(error.sqlMessage);
            return;
        }
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(204).send("No devices");
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
            res.send(error.sqlMessage);
            return;
        }
        res.send('Delete device');
    });
});
  
module.exports = router;