const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Publishers';

    conn.query(sql, (error, results) => {
    if (error){
      res.send(error.sqlMessage);
      return;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(204).send("No publishers");
    }
    });
});

router.get('/:id/:topic', (req, res) => {
    const { id, topic } = req.params;
    const sql = `SELECT * FROM Publishers WHERE ID = ${id} AND Topic = ${topic}`;
    conn.query(sql, (error, result) => {
        if (error){
            res.send(error.sqlMessage);
            return;
        }
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(204).send("No publisher");
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
            res.send(error.sqlMessage);
            return;
        }
        res.send('Delete publisher');
    });
});
  
module.exports = router;